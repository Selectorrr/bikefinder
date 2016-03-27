package ru.bikefinder.service;

import org.elasticsearch.action.search.SearchResponse;
import org.json.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.FacetedPage;
import org.springframework.data.elasticsearch.core.SearchResultMapper;
import org.springframework.data.elasticsearch.core.query.StringQuery;
import org.springframework.stereotype.Service;
import ru.bikefinder.domain.User;

import javax.inject.Inject;

/**
 * Created by Selector on 27.03.2016.
 */
@Service
public class SearchKitService {
    @Inject
    private ElasticsearchTemplate elasticsearchTemplate;

    public String search(QueryWrapper queryWrapper) {
        final String[] result = {null};
        if (queryWrapper.size == 0) {
            queryWrapper.size = 1;
        }
        PageRequest pageable = new PageRequest(0, queryWrapper.size); //todo: implement page number
        String query = null;
        if (queryWrapper.query != null) {
            query = queryWrapper.query.toString();
        } else {
            query = "{ \"match_all\": {} }";
        }
        elasticsearchTemplate.queryForPage(new StringQuery(query, pageable), User.class,
            new SearchResultMapper() {
                @Override
                public <T> FacetedPage<T> mapResults(SearchResponse response, Class<T> clazz, Pageable pageable) {
                    result[0] = response.toString();
                    return null;
                }
            });
        return result[0];
    }

    public static class QueryWrapper {
        public JSONObject query;
        public int size;
    }
}
