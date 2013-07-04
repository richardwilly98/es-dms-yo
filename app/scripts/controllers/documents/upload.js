'use strict';

esDmsSiteApp.controller('DocumentsUploadCtrl', function ($log, $scope, $http, fileUpload) {
	var url = 'api/documents/upload';
	$scope.shouldBeOpen = false;
  $scope.loadingFiles = false;
	$scope.options = {
			url: url
	};
	$http.get(url)
		.then(
      function (response) {
        $scope.loadingFiles = false;
        $scope.queue = response.data.files;
      },
      function () {
        $scope.loadingFiles = false;
      }
  );
	fileUpload.fileuploaddone = function(e, data) {
		$log.log('fileuploaddone - ' + e + ' - ' + data);
  };
  
  $scope.close = function() {
    $scope.shouldBeOpen = false;
  };
  $scope.open = function() {
    $scope.shouldBeOpen = true;
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

});
