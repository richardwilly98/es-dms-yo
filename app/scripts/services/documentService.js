/* global _:false */
'use strict';

esDmsSiteApp
  .service('documentService', function documentService($log, $resource, $http) {
  var documentResource = $resource('api/documents/:id/:action/:parameter' , {id:'@id'}, {
      checkout: {method:'POST', params: {action: 'checkout'}},
      checkin: {method:'POST', params: {action: 'checkin'}},
      preview: {method:'GET', params: {action: 'preview'}},
      metadata: {method:'GET', params: {action: 'metadata'}},
      update: {method:'PUT', params: {}}
    });

  return {
    find: function(first, pageSize, criteria, callback) {
      $log.log('Document search ' + first + ' - ' + pageSize + ' - ' + criteria);
      $http.get('api/documents/search/' + criteria + '?fi=' + first + '&ps=' + pageSize).success(function (data/*, status*/) {
        callback(data);
      });
    },
    edit: function(id) {
      $log.log('edit document: ' + id);
    },
    checkout: function(id) {
      $log.log('checkout document: ' + id);
      var doc = new documentResource.get({'id': id});
      doc.$checkout({'id': id});
    },
    checkin: function(id) {
      $log.log('checkin document: ' + id);
      var doc = new documentResource.get({'id': id});
      doc.$checkin({'id': id});
    },
    addTag: function(id, tag, callback) {
      $log.log('addTag document: ' + id + ' - tag: ' + tag);
      var document = new documentResource.metadata({'id': id}, function() {
        $log.log('get document: ' + JSON.stringify(document));
        if (document.tags === undefined) {
          document.tags = [];
        }
        document.tags.push(tag);
        $log.log('save document: ' + JSON.stringify(document));
        document.$update();
        callback(document);
      });
    },
    removeTag: function(id, tag, callback) {
      $log.log('removeTag document: ' + id + ' - tag: ' + tag);
      var document = new documentResource.metadata({'id': id}, function() {
        $log.log('get document: ' + JSON.stringify(document));
        if (document.tags === undefined) {
          document.tags = [];
        }
        //document.tags.splice(tag, 1);
        document.tags = _.without(document.tags, tag);
        $log.log('save document: ' + JSON.stringify(document));
        document.$update();
        callback(document);
      });
    },
    delete: function(id) {
      $log.log('delete document: ' + id);
      var doc = new documentResource.get({'id': id});
      doc.$delete({'id': id});
    },
    preview: function(id, criteria, callback) {
      $log.log('preview document: ' + id + ' - criteria: ' + criteria);
      var response = documentResource.preview({'id': id, 'cr': criteria/*, 'fs': 100*/}, function () {
        callback(response.content);
      });
    },
	};
});
