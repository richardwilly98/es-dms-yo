'use strict';

esDmsSiteApp.controller('NavbarCtrl', function ($scope, authenticationService) {
	$scope.showLogout = true;
	$scope.$on('handleBroadcast', function() {
    //$scope.showLogout = sharedService.message.logout;
  });
	
	$scope.tabs = [
		{ 'view': '/search', title: 'Search' }/*,
		{ 'view': '/my-documents-view', title: 'My documents' },
		{ 'view': '/edit-view', title: 'Edit' },
    { 'view': '/view1', title: 'View #1' },
    { 'view': '/view2', title: 'View #2' },
    { 'view': '/view3', title: 'Test View'},
    { 'view': '/view4', title: 'View #4' }*/
  ];
	
	$scope.adminTabs = [
		{ 'view': '/admin.users', title: 'Users' },
		{ 'view': '/admin.roles', title: 'Roles' }
	];
	
	$scope.logout = function() {
		authenticationService.logout();
	};
});
