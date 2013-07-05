'use strict';

esDmsSiteApp.directive('esdmsUpload', function (uploadService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $(element).fileupload({
        dataType: 'text',
        add: function (e, data) {
          uploadService.add(data);
        },
        progressall: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          uploadService.setProgress(progress);
        },
        done: function (e, data) {
          uploadService.setProgress(0);
        }
      });
    }
  };
});
