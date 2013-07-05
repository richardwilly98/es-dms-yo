/* exported esDmsSiteApp */
'use strict';

var esDmsSiteApp = angular.module('esDmsSiteApp', ['ngResource', 'authentication', 'ui.state', 'http-auth-interceptor', 'ui.bootstrap', /*'blueimp.fileupload',*/ 'ngUpload']);

esDmsSiteApp.config(function ($routeProvider, $stateProvider) {

  $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'views/main.html'
    })
    .state('index.documents-search', {
      url: '/index.documents-search',
      templateUrl: 'views/documents/search.html'
    })
    .state('index.documents-edit', {
      url: '/index.documents-edit',
      templateUrl: 'views/documents/edit.html'
    })
    .state('index.admin-users', {
      url: '/index.admin-users',
      templateUrl: 'views/users/search-users.html'
    })
    .state('index.admin-roles', {
      url: '/index.admin-roles',
      templateUrl: 'views/roles/search-roles.html'
    })
    .state('index.test-accordion', {
      url: '/index.test-accordion',
      templateUrl: 'views/test/accordion.html'
    })
    ;
});
