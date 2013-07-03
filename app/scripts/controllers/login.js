'use strict';

esDmsSiteApp.controller('LoginCtrl', function ($log, $scope, authenticationService, authService, sharedService, dialog) {

  $scope.login = function() {
		$log.log('loginController - login');
		authenticationService.login($scope.username, $scope.password, $scope.rememberMe, function(data) {
			$log.log('data: ' + data);
			if (data.status === 'AUTHENTICATED') {
				authService.loginConfirmed();
				var token = data.token;
				$log.log('Authentication token: ' + token);
				sharedService.prepForBroadcast({logout: true});
				sharedService.prepForBroadcast({user: $scope.username});
        dialog.close();
			}
		});
  };

  $scope.close = function () {
    dialog.close();
  };
});
