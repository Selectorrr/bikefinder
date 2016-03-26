/**
 * Created by Selector on 26.03.2016.
 */
var BikeSearchComponent = React.createClass({
    render: function () {
        return <span>Hello</span>;
    }
});
angular.module('bikefinderApp')
    .directive('bikeSearchComponent', function (reactDirective) {
        return reactDirective(BikeSearchComponent);
    });
