/* exported esDmsSiteApp */
'use strict';

var esDmsSiteApp = angular.module('esDmsSiteApp', ['ngResource', 'authentication', 'ui.state', 'http-auth-interceptor', 'ui.bootstrap']);
/*
esDmsSiteApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/search-view', {
      templateUrl: 'views/search-view.html',
      controller: 'SearchViewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
*/

esDmsSiteApp.config(function ($routeProvider, $stateProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/search', {
      templateUrl: 'views/documents.search.html'
    })
    .when('/admin.users', {
      templateUrl: 'views/admin.users.html'
    })
    .when('/admin.roles', {
      templateUrl: 'views/admin.roles.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $stateProvider
    .state('/', {
      url: '',
      views: {
        'app': {
          templateUrl: 'views/main.html'
        },
        'main': {
          templateUrl: 'views/documents.search.html'
        }
      }
    });
/*
  $stateProvider
    .state('/', {
      url: '',
      views: {
        'app': {
          templateUrl: 'views/main.html'
        },
        'main': {
          templateUrl: 'views/search-view.html'
        }
      }
    })
    .state('route1', {
      url: '/search-view',
      views: {
        'app': {
          templateUrl: 'views/main.html'
        },
        'main': {
          templateUrl: 'route1.viewB.html'
        }
      }
    })
    .state('route2', {
      url: '/route2',
      views: {
        'app': {
          templateUrl: 'views/main.html'
        },
        'main': {
          templateUrl: 'route2.viewB.html'
        }
      }
    });
*/
});
/*
*/