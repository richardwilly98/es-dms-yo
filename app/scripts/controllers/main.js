'use strict';

angular.module('esDmsSiteApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	var food = {
		'fruits': ['apple'],
		'vegetables': ['beet']
	};

	var otherFood = {
		'fruits': ['banana'],
	'vegetables': ['carrot']
	};

	// Concatenate arrays, instead of overwriting the indices.
	$scope.food = _.merge(food, otherFood, function (left, right) {
		return _.isArray(left) ? left.concat(right) : undefined;
	});
  });
