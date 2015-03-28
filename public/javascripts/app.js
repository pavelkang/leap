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
    $scope.back = function() {
        window.location.href = "/";
    };
});

leapApp.controller("WatchCtrl", function($scope, $http, $location){
    $scope.id = $location.search()["id"];
    $scope.ups = 42;
    $scope.downs = 1;
    $scope.voted = -1;
    $scope.comments = [];
    $scope.comment = "";
    $scope.post = function() {
        if ($scope.comment.length != 0) {
            $scope.comments.push($scope.comment);
            $scope.comment = "";
        }
    };
    $scope.vote = function(v) {
        if (v==0) { // up
            if ($scope.voted == 0) {
                $scope.ups -= 1;
                $scope.voted = -1;
            } else if ($scope.voted == -1){
                $scope.ups += 1;
                $scope.voted = 0;
            }
        } else { // down
            if ($scope.voted == 1) {
                $scope.downs -= 1;
                $scope.voted = -1;
            } else if ($scope.voted == -1){
                $scope.downs += 1;
                $scope.voted = 1;
            }
        }
    };
    $http.get('data/list.json').success(function(data) {
        $scope.allTuts = data;
        var tut = $scope.allTuts[$scope.id];
        $scope.title = tut.title;
        $scope.notes = tut.notes;
        $scope.face = tut.face;
        $scope.author = tut.who;
    });
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
