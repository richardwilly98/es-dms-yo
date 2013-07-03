'use strict';

var doc = {id: 3, name: "dummy", attributes: {author: "admin"}};
var doc2 = {id: 4, name: "dummy", attributes: {author: "admin"}, tags: ["tag1", "tag2"]};
var documents = [
  { id: 1, name: "Entry 1" }, 
  { id: 2, name: "Entry 2" }
  ];

describe('Service: documentService', function () {

  var resource, $httpBackend;

  // instantiate service
  var documentService;

  // Load required modules
  beforeEach(angular.mock.module("ngResource"));
  
  // Load the service's module
  beforeEach(angular.mock.module("esDmsSiteApp"));

  // Load dependencies
  beforeEach(function() {
    inject(function($injector) {
        resource = $injector.get('$resource');
        $httpBackend = $injector.get('$httpBackend');
        documentService = $injector.get('documentService');
    });
  });

  beforeEach(function(){
    $httpBackend.whenGET('api/documents/search/dummy?fi=0&ps=20').respond(documents);
    $httpBackend.whenGET('api/documents/3').respond(doc);
    $httpBackend.whenPUT('api/documents/3').respond(200, '');
    $httpBackend.whenGET('api/documents/3/metadata').respond(doc);
    $httpBackend.whenPOST('api/documents/3/checkout').respond(204, '');

    $httpBackend.whenGET('api/documents/4').respond(doc2);
    $httpBackend.whenPUT('api/documents/4').respond(200, '');
    $httpBackend.whenGET('api/documents/4/metadata').respond(doc2);
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should call documentService find method', function() {
    $httpBackend.expectGET('api/documents/search/dummy?fi=0&ps=20');
    documentService.find(0, 20, 'dummy', function(data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should call documentService addTag method', function() {
    $httpBackend.expectGET('api/documents/3/metadata');
    $httpBackend.expectPUT('api/documents/3');
    documentService.addTag(3, 'tag1', function(data) {
      expect(data.tags).toContain('tag1');
    });
    $httpBackend.flush();
  });

  it('should call documentService removeTag method', function() {
    $httpBackend.expectGET('api/documents/4/metadata');
    $httpBackend.expectPUT('api/documents/4');
    documentService.removeTag(4, 'tag2', function(data) {
      expect(data.tags).not.toContain('tag2');
      expect(data.tags).toContain('tag1');
    });
    $httpBackend.flush();
  });

  /*
  it('should call documentService checkout method', function() {
    $httpBackend.expectGET('api/documents/3');
    $httpBackend.expectPOST('api/documents/3/checkout');
    spyOn(documentService, 'checkout');
    documentService.checkout(3);
    //$httpBackend.flush();
    expect(documentService.checkout).toHaveBeenCalled();
    $httpBackend.flush();
  });
  */

});
