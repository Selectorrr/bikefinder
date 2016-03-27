package ru.bikefinder.service;

import org.elasticsearch.index.query.QueryBuilders;
import org.json.JSONObject;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

/**
 * Created by Selector on 27.03.2016.
 */
@Service
public class SearchKitService {
    @Inject
    private ElasticsearchTemplate elasticsearchTemplate;

    public String search(QueryWrapper queryWrapper) {

        if (queryWrapper.size == 0) {
            queryWrapper.size = 1;
        }
        String query;
        if (queryWrapper.query != null) {
            query = queryWrapper.query.toString();
        } else {
            query = "{ \"match_all\": {} }";
        }
        NativeSearchQuery searchQuery = new NativeSearchQuery(QueryBuilders.wrapperQuery(query));
        return elasticsearchTemplate.query(searchQuery, response -> response).toString();
    }

    public static class QueryWrapper {
        public JSONObject query;
        public int size;
    }
}
