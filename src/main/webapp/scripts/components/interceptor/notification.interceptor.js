 'use strict';

angular.module('bikefinderApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-bikefinderApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-bikefinderApp-params')});
                }
                return response;
            }
        };
    });
