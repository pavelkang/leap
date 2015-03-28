var leapApp = angular.module("homeApp", ["ngMaterial", "ngRoute"]);
// Routing
leapApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'AppCtrl'
        })
        .when('/upload', {
            templateUrl : 'upload.html',
            controller  : 'UpCtrl'
        })
        .when('/watch', {
            templateUrl : 'watch.html',
            controller : 'WatchCtrl'
        });
});
// Theming
leapApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('pink',{
            'default': '200'
        });

});
// Upload page controller
leapApp.controller("UpCtrl", function($scope, $http){
    console.log("Hi");
});

leapApp.controller("WatchCtrl", function($scope, $http, $location){
    $scope.id = $location.search()["id"];
});

// Home page controller
leapApp.controller("AppCtrl", function($scope, $http){
    $scope.query = "";
    $scope.todos = [];
    $http.get('data/list.json').success(function(data) {
        $scope.todos = data;
    });
    $scope.click = function(item) {
        window.location.href = "#/watch?id="+item.id;
    };
    $scope.upload = function() {
        window.location.href = "#/upload";
    };
});
