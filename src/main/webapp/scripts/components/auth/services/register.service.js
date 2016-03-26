'use strict';

angular.module('bikefinderApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


