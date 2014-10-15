
  var app = angular.module('wizard', []);

  app.controller('CourseController', function() {

  });

  app.controller('TabController', function() {
    this.tab = 0;

    this.setTab = function(setTab) {
      this.tab = setTab || 0;
    };

    this.isSelected = function(tab) {
      return this.tab === tab;
    };

    this.isDisabled = function(tab) {
      return true;
    }
  });

  app.controller('OutcomeController', function() {
    this.aims = [
      {
        name: 'I\'m your first outcome, yes I am!'
      },
      {
        name: 'I\'m your second outcome, yes I am!'
      },
      {
        name: 'I\'m your third outcome, yes I am!'
      }
    ];

    this.editAim = function() {

    }
    this.destroyAim = function($event) {
    }
  });

  app.directive('courseOutcome', function() {
    return {
      restrict: 'E',
      templateUrl: 'course-outcome.html',
      controller: function () {
        this.outcomes = [];
      },
      controllerAs: 'outcomeCtrl'
    };
  });

  app.filter('firstUpperCase', function() {
    return function(input) {
      input = input || '';

      return input.charAt(0).toUpperCase() + input.substring(1);
    };
  });
