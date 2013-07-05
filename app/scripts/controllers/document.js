'use strict';

esDmsSiteApp.controller('DocumentCtrl', function ($log, $scope, documentService, searchService) {
  $scope.alerts = [];
  $scope.documents = [];
  $scope.facet = null;
  $scope.facets = [];
  $scope.totalHits = 0;
  $scope.elapsedTime = 0;
  $scope.maxPages = 10;
  $scope.totalPages = 0;
  $scope.currentPage = 1;
  $scope.pageSize = 12;
  $scope.pageSizeList = [12, 24, 48, 96];
  $scope.newtag = {};
  $scope.terms = [];

  var currentDocument = null;

  function init() {
  }

  init();

  $scope.mySearch = function() {
		$log.log('mySearch');
		if ($scope.criteria === '' || $scope.criteria === '*') {
			$scope.alerts.push({ msg: 'Empty or wildcard not allowed' });
			$scope.documents = [];
		} else {
			find(0,  'document.attributes.author: "' + $scope.criteria + '"', true);
		}
	};
    
  $scope.search = function(/*term*/) {
		$log.log('search');
		if ($scope.criteria === '' || $scope.criteria === '*') {
			$scope.alerts.push({ msg: 'Empty or wildcard not allowed' });
			$scope.documents = [];
		} else {
			$scope.facet = 'tags';
			find(0, $scope.criteria, /*term,*/ true);
		}
  };

  function find(first, criteria, /*term,*/ updatePagination) {
		$log.log('find - terms: ' + $scope.terms);
		var filters = getFilter(/*term*/);
		searchService.facetedSearch(first, $scope.pageSize, criteria, $scope.facet, filters, function(result) {
			if (updatePagination) {
				setPagination(result);
			}
			$scope.documents = result.items;
			$scope.totalHits = result.totalHits;
			$scope.elapsedTime = result.elapsedTime;
			$scope.facets = result.facets[$scope.facet];
			/*for (var i in $scope.facets[$scope.facet].terms) {
				
			}*/
		});
  }
    
  function getFilter() {
		if ($scope.facet === undefined || $scope.terms === [] || $scope.terms.length === 0) {
			return null;
		}
		var filter = {};
		filter[$scope.facet] = $scope.terms;
		return filter;
  }

  function setPagination(result) {
		var pageSize = result.pageSize;
		var totalHits = result.totalHits;
		var firstIndex = result.firstIndex;
		$scope.totalPages = Math.ceil(totalHits / pageSize);
		$scope.currentPage = 1 + (firstIndex / pageSize);
		$log.log('totalPages: ' + $scope.totalPages + ' - currentPage: ' + $scope.currentPage);
  }
    
	function getDocument(id) {
		var documents = $scope.documents;
		for (var i in documents) {
			if (documents[i].id === id) {
				return documents[i];
			}
		}
	}
  
	function getIndexOf(id) {
		for (var i in $scope.documents) {
			if ($scope.documents[i].id === id) {
				return i;
			}
		}
	}
    
  $scope.setPage = function () {
		$log.log('setPage');
		if ($scope.criteria === undefined ) {
			return;
		}
    find( ($scope.currentPage - 1) * $scope.pageSize, $scope.criteria );
  };
      
  $scope.$watch('currentPage', $scope.setPage );
      
  $scope.$on('document:addtag', function(evt, args) {
		if (args.id === undefined || args.tag === undefined) {
			return;
		}
		$log.log('*** addTag: ' + args.id + ' - ' + args.tag);
		var id = args.id;
		var tag = args.tag;
		//var document = getDocument(id);
		documentService.addTag(id, tag, function(doc) {
			var index = getIndexOf(id);
			$scope.documents[index] = doc;
		});
  });

  $scope.$on('document:removetag', function(evt, args) {
		if (args.id === undefined || args.tag === undefined) {
			return;
		}
		$log.log('*** removetag: ' + args.id + ' - ' + args.tag);
		var id = args.id;
		var tag = args.tag;
		//var document = getDocument(id);
		documentService.removeTag(id, tag, function(doc) {
			var index = getIndexOf(id);
			$scope.documents[index] = doc;
		});
  });
    
  $scope.$on('search:applyfacet', function(evt, args) {
		if (args.term === undefined || args.selected === undefined) {
			return;
		}
		$log.log('*** applyfacet: ' + args.term + ' - ' + args.selected);
		if (args.selected) {
			$scope.terms.push(args.term);
		} else {
			for (var i in $scope.terms) {
				if ($scope.terms[i] === args.term) {
					$scope.terms.splice(i, 1);
					break;
				}
			}
		}
		find(0, $scope.criteria, /*term,*/ true);
  });

  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.edit = function(id) {
    documentService.edit(id);
  };

  $scope.checkout = function(id) {
		documentService.checkout(id);
		var document = getDocument(id);
		if (document) {
			document.attributes.status = 'L';
		}
  };

  $scope.checkin = function(id) {
		documentService.checkin(id);
		var document = getDocument(id);
		if (document) {
			document.attributes.status = 'A';
		}
  };

  $scope.remove = function(id) {
		documentService.remove(id);
		var index = getIndexOf(id);
		if (index) {
			$scope.documents.splice(index, 1);
		}
  };
    
  $scope.preview = function(id) {
		var document = getDocument(id);
		if (currentDocument !== document) {
			documentService.preview(id, $scope.criteria, function(response) {
				$log.log('Preview document - ' + document.id);
        document.preview = response;
			});
		} else {
			$log.log('Do not fetch preview again!');
		}
		currentDocument = document;
  };
});
