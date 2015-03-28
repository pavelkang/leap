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
        })
        .when('/test', {
            templateUrl: 'test.html',
            controller: 'TestCtrl'
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
leapApp.controller("TestCtrl", function($scope, $http) {
    console.log("CTrl");
});
// Upload page controller
leapApp.controller("UpCtrl", function($scope, $http){
    $scope.back = function() {
        window.location.href = "/";
    };
});

leapApp.controller("WatchCtrl", function($scope, $http, $location){
    // Leap Motion
     var controller = new Leap.Controller();
     var overlayController = new Leap.Controller();
     controller.use('playback',
                    {
                        recording: 'recorder/recordings/pinch-57fps.json.lz',
                        requiredProtocolVersion: 6,
                        pauseOnHand: false,
                        loop: true,
                        timeBetweenLoops: 1000
                    })
               .use('riggedHand',{materialOptions:{wireframe:true}});
     overlayController.use('riggedHand');
     overlayController.connect();
     controller.plugins.playback.player.overlay = overlayController;
     window.controller = controller;
     setTimeout(function(){
         var can = document.querySelector("canvas");
         can.style.position = "relative";
         var win = document.getElementById("watchWindow");
         win.insertBefore(can, win.childNodes[0]);
         var a = document.body.childNodes;
         var cl = document.getElementById("connect-leap");
         win.insertBefore(cl, win.childNodes[1]);
         for (var i = 0; i < a.length; i++) {
             if (a[i].tagName === "CANVAS") { // audience hands
                 a[i].border = "solid";
                 a[i].style.position = "absolute";
                 a[i].style.width = can.offsetWidth + "px";
                 a[i].style.height = can.offsetHeight + "px";
                 a[i].style.top = can.offsetTop;
                 a[i].style.left = can.offsetLeft;
                 win.insertBefore(a[i], win.childNodes[1]);
             }
         }
     }, 1000);
    // Rest
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
                document.getElementById("tup").style.color = "black";
            } else if ($scope.voted == -1){
                $scope.ups += 1;
                $scope.voted = 0;
                document.getElementById("tup").style.color = "indigo";
            }
        } else { // down
            if ($scope.voted == 1) {
                $scope.downs -= 1;
                $scope.voted = -1;
                document.getElementById("tdown").style.color = "black";
            } else if ($scope.voted == -1){
                $scope.downs += 1;
                $scope.voted = 1;
                document.getElementById("tdown").style.color = "red";
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
