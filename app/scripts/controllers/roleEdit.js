'use strict';

esDmsSiteApp.controller('RoleEditCtrl', function ($scope, $rootScope, roleService) {
	$scope.role = {};
	$rootScope.$on('role:edit', function() {
		var editRole = roleService.currentRole();
		if (editRole.id) {
			$scope.role = editRole;
			$scope.newRole = false;
		} else {
			$scope.newRole = true;
			$scope.incomplete = true;
			$scope.role = {};
		}
	});
	
	$scope.save = function() {
		roleService.save($scope.role);
	};
});
