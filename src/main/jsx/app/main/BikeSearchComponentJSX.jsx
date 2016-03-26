/**
 * Created by Selector on 26.03.2016.
 */
const host = "http://demo.searchkit.co/api/movies";
const sk = new Searchkit.SearchkitManager(host, {});
const SearchkitProvider = Searchkit.SearchkitProvider;
const Searchbox = Searchkit.SearchBox;

const Hits = Searchkit.Hits;

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

        return (<div>

            <SearchkitProvider searchkit={sk}>
                <div className="search">
                    <div className="search__query">
                        <Searchbox searchOnChange={true}
                                   prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
                    </div>
                    <div className="search__results">
                        <Hits hitsPerPage={6} itemComponent={MovieHit}/>
                    </div>
                </div>
            </SearchkitProvider>

        </div>);
    }
});
angular.module('bikefinderApp')
    .directive('bikeSearchComponent', function (reactDirective) {
        return reactDirective(BikeSearchComponent);
    });
