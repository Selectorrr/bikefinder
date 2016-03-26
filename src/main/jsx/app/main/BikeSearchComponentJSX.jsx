/**
 * Created by Selector on 26.03.2016.
 */
const host = "http://demo.searchkit.co/api/movies";
// const host = "api/users";
const sk = new Searchkit.SearchkitManager(host, {});

sk.translateFunction = (key) => {
    let translations = {
        "searchbox.placeholder": "Поиск"
    };
    return translations[key]
};

class MovieHit extends React.Component {

    render() {
        const result = this.props.result;
        let url = "http://www.imdb.com/title/" + result._source.imdbId;
        return (
            <div>
                <div className="example-hits-hit example-hits__item">
                    <a href={url} target="_blank">
                        <img className="example-hits-hit__poster"
                             src={result._source.poster}
                             width="180" height="270"/>
                    </a>
                    <a href={url} target="_blank">
                        <div className="example-hits-hit__title">{result._source.title}</div>
                    </a>
                </div>
            </div>
        )
    }

}
var BikeSearchComponent = React.createClass({
    render: function () {
        return (
            <Searchkit.SearchkitProvider searchkit={sk}>
                <div className="sk-layout example-search-site">

                    <div className="sk-layout__top-bar sk-top-bar">
                        <div className="sk-top-bar__content">
                            <Searchkit.SearchBox searchOnChange={true}
                                                 prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
                        </div>
                    </div>

                    <div className="sk-layout__body">

                        <div className="sk-layout__filters">
                            <Searchkit.RangeFilter field="metaScore" id="metascore" min={0} max={100}
                                                   showHistogram={true} title="MetaScore"/>
                            <Searchkit.HierarchicalMenuFilter
                                fields={["categories_lvl1", "categories_lvl2", "categories_lvl3"]} title="Categories"
                                id="categories"/>
                            <Searchkit.RefinementListFilter id="actors" title="Actors" field="actors.raw"
                                                            operator="AND"/>
                        </div>

                        <div className="sk-layout__results sk-results-list">

                            <div className="sk-results-list__action-bar sk-action-bar">
                                <div className="sk-action-bar__info">
                                    <Searchkit.HitsStats />
                                    <Searchkit.ViewSwitcherToggle/>

                                </div>

                                <div className="sk-action-bar__filters">

                                    <Searchkit.SelectedFilters/>
                                    <Searchkit.ResetFilters/>
                                </div>

                            </div>
                            <div className="example-search-site__results">
                                <Searchkit.Hits hitsPerPage={20} itemComponent={MovieHit} className="example-hits"/>
                                <Searchkit.NoHits/>
                                <Searchkit.Pagination />
                            </div>

                        </div>
                    </div>
                </div>
            </Searchkit.SearchkitProvider>);
    }
});
angular.module('bikefinderApp')
    .directive('bikeSearchComponent', function (reactDirective) {
        return reactDirective(BikeSearchComponent);
    });
