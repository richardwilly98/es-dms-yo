/* exported esDmsSiteApp */
'use strict';

var esDmsSiteApp = angular.module('esDmsSiteApp', ['ngResource', 'authentication', 'ui.state', 'http-auth-interceptor', 'ui.bootstrap']);

esDmsSiteApp.config(function ($routeProvider, $stateProvider) {

  $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'views/main.html'
    })
    .state('index.search', {
      url: '/index.search',
      templateUrl: 'views/documents.search.html'
    })
    .state('index.admin-users', {
      url: '/index.admin-users',
      templateUrl: 'views/admin.users.html'
    })
    .state('index.admin-roles', {
      url: '/index.admin-roles',
      templateUrl: 'views/roles/search-roles.html'
    });
});
