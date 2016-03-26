/**
 * Created by Selector on 26.03.2016.
 */
const host = "http://demo.searchkit.co/api/movies";
const sk = new Searchkit.SearchkitManager(host, {});
const SearchkitProvider = Searchkit.SearchkitProvider;
const Searchbox = Searchkit.SearchBox;

const Hits = Searchkit.Hits;

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
            <div className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))} key={result._id}>
                <a href={url} target="_blank">
                    <img className={this.props.bemBlocks.item("poster")} src={result._source.poster} width="100"
                         height="140"/>
                    <div className={this.props.bemBlocks.item("title")}>{result._source.title}</div>
                </a>
            </div>
        )
    }

}
var BikeSearchComponent = React.createClass({
    render: function () {
        return (
            <SearchkitProvider searchkit={sk}>
                <div className="sk-layout">
                    <div className="sk-layout__top-bar sk-top-bar">
                        <div className="sk-top-bar__content">
                            <Searchbox searchOnChange={true}
                                       prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
                        </div>
                    </div>
                    <div className="sk-layout__body">
                        <div className="sk-layout__results sk-results-list">
                            <div className="sk-results-list__action-bar sk-action-bar">
                            </div>
                            <Hits hitsPerPage={6} itemComponent={MovieHit}/></div>
                    </div>
                </div>
            </SearchkitProvider>);
    }
});
angular.module('bikefinderApp')
    .directive('bikeSearchComponent', function (reactDirective) {
        return reactDirective(BikeSearchComponent);
    });
