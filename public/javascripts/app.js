angular.module("homeApp", ["ngMaterial", "ngRoute"])
    .controller("AppCtrl", function($scope){
        $scope.query = "";
        $scope.todos = [
            {
                face : '/images/60.jpeg',
                title: 'Guitar Strum',
                who: 'Hongyu Li',
                when: '3:08PM',
                notes: "A tutorial on how to strum the guitar"
            },
            {
                face : '/images/60.jpeg',
                title: 'Flip The Pan',
                who: 'Kai Kang',
                when: '3:08PM',
                notes: " Flip the pan while stir-frying to add more flavor to your dishes"
            },
            {
                face : '/images/60.jpeg',
                title: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : '/images/60.jpeg',
                title: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face : '/images/60.jpeg',
                title: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
        ];
    });
