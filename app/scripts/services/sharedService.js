/* exported sharedService */
'use strict';

esDmsSiteApp.service('sharedService', function sharedService($rootScope) {
  //var message = '';
  var currentUser = {};
  return {
    getCurrentUser: function () {
      return currentUser;
    },
    prepForBroadcast: function(msg) {
      this.message = msg;
      $rootScope.$broadcast('handleBroadcast');
    }
  };
});
