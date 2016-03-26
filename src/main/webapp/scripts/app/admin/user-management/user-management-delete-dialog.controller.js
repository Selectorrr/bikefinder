'use strict';

angular.module('bikefinderApp')
	.controller('user-managementDeleteController', function($scope, $uibModalInstance, entity, User) {

        $scope.user = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (login) {
            User.delete({login: login},
                function () {
                    $uibModalInstance.close(true);
                });
        };
        var test = {
            "query": {
                "bool": {
                    "should": [{
                        "simple_query_string": {
                            "query": "123",
                            "fields": ["_all"]
                        }
                    }, {
                        "multi_match": {
                            "query": "123",
                            "type": "phrase_prefix",
                            "fields": ["actors^1", "type^2", "languages", "title^10"]
                        }
                    }]
                }
            }, "size": 6
        }
    });
