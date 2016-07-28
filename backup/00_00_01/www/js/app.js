// Ionic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ipaper', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// handle iframe url
.filter('iframeUrl', function ($sce) {
    return function(iframeId) {
      return $sce.trustAsResourceUrl('http://www.publications.issworld.com/ISS/' + iframeId + '?HideStandardUI=true');
    };
})

// routes
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	// config for back button - no text title, icon, no text
	$ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.icon('ion-arrow-left-c');
	$ionicConfigProvider.backButton.text('');
	
  $stateProvider
  // home
  .state('index', {
    url: '/',
    templateUrl: 'views/home.html',
	controller: 'indexController'
  })
  // monthly briefing
  .state('monthly-briefing', {
    url: '/monthly-briefing',
    templateUrl: 'views/monthly-briefing-list.html',
	controller: 'mbController'
  })
  // monthly briefing iframe
   .state('monthly-briefing-iframe', {
      url: '/monthly-briefing-iframe/:id',
      templateUrl: 'views/monthly-briefing-iframe.html',
      controller: 'mbController'
    })
	// white papers
	 .state('white-papers', {
    url: '/white-papers',
    templateUrl: 'views/white-paper-list.html',
	controller: 'wpController'
  })
  // white paper iframe
   .state('white-paper-iframe', {
      url: '/white-paper-iframe/:id',
      templateUrl: 'views/white-paper-iframe.html',
      controller: 'wpController'
    })
	// our services
	 .state('our-services', {
    url: '/our-services',
    templateUrl: 'views/our-services-list.html',
	controller: 'osController'
  })
  // our services iframe
   .state('our-services-iframe', {
      url: '/our-services-iframe/:id',
      templateUrl: 'views/our-services-iframe.html',
      controller: 'osController'
    })
	// together magazine
	 .state('together-magazine', {
    url: '/together-magazine',
    templateUrl: 'views/together-magazine-list.html',
	controller: 'tmController'
  })
  // together magazine iframe
   .state('together-magazine-iframe', {
      url: '/together-magazine-iframe/:id',
      templateUrl: 'views/together-magazine-iframe.html',
      controller: 'tmController'
    });
  $urlRouterProvider.otherwise('/');
})

// index controller
.controller('indexController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
   $http.get('js/ipaper-data.json').success(function(data) {
      $scope.data = data.landing_buttons;
    });
}])

// monthly briefing controller
.controller('mbController', ['$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
   $http.get('js/ipaper-data.json').success(function(data) {
      $scope.data = data.monthly_briefing;
      $scope.datadetail = $state.params.id;
    });
	// handle iframe height
	$scope.device_height = $window.innerHeight -80;
	// show/hide search bar
	$scope.searchBar = false;
        $scope.toggleSearch = function() {
            $scope.searchBar = ! $scope.searchBar;
        };
}])

// white paper controller
.controller('wpController', ['$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
   $http.get('js/ipaper-data.json').success(function(data) {
      $scope.data = data.white_papers;
      $scope.datadetail = $state.params.id;
    });
	// handle iframe height
	$scope.device_height = $window.innerHeight -80;
	// show/hide search bar
	$scope.searchBar = false;
        $scope.toggleSearch = function() {
            $scope.searchBar = ! $scope.searchBar;
        };
}])

// our services controller
.controller('osController', ['$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
   $http.get('js/ipaper-data.json').success(function(data) {
      $scope.data = data.our_services;
      $scope.datadetail = $state.params.id;
    });
	// handle iframe height
	$scope.device_height = $window.innerHeight -80;
	// show/hide search bar
	$scope.searchBar = false;
        $scope.toggleSearch = function() {
            $scope.searchBar = ! $scope.searchBar;
        };
}])

// together magazine controller
.controller('tmController', ['$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
   $http.get('js/ipaper-data.json').success(function(data) {
      $scope.data = data.together_magazine;
      $scope.datadetail = $state.params.id;
    });
	// handle iframe height
	$scope.device_height = $window.innerHeight -80;
	// show/hide search bar
	$scope.searchBar = false;
        $scope.toggleSearch = function() {
            $scope.searchBar = ! $scope.searchBar;
        };
	
}]);