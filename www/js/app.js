// developed by Nicolas Turner-Moore
// Ionic App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ipaper', ['ionic']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

// handle iframe url
app.filter('iframeUrl', function($sce) {
    return function(iframeId) {
        return $sce.trustAsResourceUrl('http://www.publications.issworld.com/ISS/' + iframeId + '?HideStandardUI=true');
    };
});

// routes
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // config for back button - no text title, icon, no text
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon('icon-circle-left');
    $ionicConfigProvider.backButton.text('');

    $stateProvider
    // home
        .state('index', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        // monthly briefing
        .state('monthly-briefing', {
            url: '/monthly-briefing',
            templateUrl: 'views/monthly-briefing-list.html',
            controller: 'MainController'
        })
        // monthly briefing iframe
        .state('monthly-briefing-iframe', {
            url: '/monthly-briefing-iframe/:id',
            templateUrl: 'views/monthly-briefing-iframe.html',
            controller: 'MainController'
        })
        // white papers
        .state('white-papers', {
            url: '/white-papers',
            templateUrl: 'views/white-paper-list.html',
            controller: 'MainController'
        })
        // white paper iframe
        .state('white-paper-iframe', {
            url: '/white-paper-iframe/:id',
            templateUrl: 'views/white-paper-iframe.html',
            controller: 'MainController'
        })
        // our services
        .state('our-services', {
            url: '/our-services',
            templateUrl: 'views/our-services-list.html',
            controller: 'MainController'
        })
        // our services iframe
        .state('our-services-iframe', {
            url: '/our-services-iframe/:id',
            templateUrl: 'views/our-services-iframe.html',
            controller: 'MainController'
        })
        // together magazine
        .state('together-magazine', {
            url: '/together-magazine',
            templateUrl: 'views/together-magazine-list.html',
            controller: 'MainController'
        })
        // together magazine iframe
        .state('together-magazine-iframe', {
            url: '/together-magazine-iframe/:id',
            templateUrl: 'views/together-magazine-iframe.html',
            controller: 'MainController'
        });
    $urlRouterProvider.otherwise('/');
});

// create cache service
app.factory('dataCache', function($cacheFactory) {
    return $cacheFactory('ipaperData');
});

// main controller
app.controller('MainController', ['$scope', '$http', '$state', '$window', 'dataCache',
    function($scope, $http, $state, $window, dataCache) {

        var cache = dataCache.get('ipaperData');
        // if we have cached data
         if (cache) {
            // landing buttons data
            $scope.buttons_data = cache.landing_buttons;
            // monthly brifing data
            $scope.mb_data = cache.monthly_briefing;
            $scope.mb_datadetail = $state.params.id;
            // white papers data
            $scope.wp_data = cache.white_papers;
            $scope.wp_datadetail = $state.params.id;
            // our services data
            $scope.os_data = cache.our_services;
            $scope.os_datadetail = $state.params.id;
            // together magazine data
            $scope.tm_data = cache.together_magazine;
            $scope.tm_datadetail = $state.params.id;
        } else {
            // if we don't have cached data, go get it
            $http.get('js/ipaper-data.json').success(function(data) {
                dataCache.put('ipaperData', data);
                // landing buttons data
                $scope.buttons_data = data.landing_buttons;
                // monthly brifing data
                $scope.mb_data = data.monthly_briefing;
                $scope.mb_datadetail = $state.params.id;
                // white papers data
                $scope.wp_data = data.white_papers;
                $scope.wp_datadetail = $state.params.id;
                // our services data
                $scope.os_data = data.our_services;
                $scope.os_datadetail = $state.params.id;
                // together magazine data
                $scope.tm_data = data.together_magazine;
                $scope.tm_datadetail = $state.params.id;
            });
        }
        // handle iframe height
        $scope.device_height = $window.innerHeight - 80;
        // show/hide search bar
        $scope.searchBar = false;
        $scope.toggleSearch = function() {
            $scope.searchBar = !$scope.searchBar;
        };
    }
]);