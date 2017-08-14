var app = angular.module('myApp', ['ngRoute', 'controllers']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html'
        })
        .when('/list', {
            templateUrl: '../views/list.html'
        }).when('/single/:id', {
            templateUrl: '../views/single.html'
        }).when('/category/:className', {
            templateUrl: '../views/class.html'
        });

    }]);
    
var controlApp = angular.module('controllers', []);
controlApp.controller('listReq', function($scope, $http, $location, $routeParams) {
    $scope.goToSingle = function(id){
        $location.path("/single/" + id);           
    } 
    $http.get('/api/list')
    .then(function (response) {
        $scope.toonList = response.data;
    }); 
});    
  

controlApp.controller("singleController", function($scope, $routeParams, $http, $location){
    var myId = $routeParams.id;    
    $http.get("/api/single/" + myId)
       .then(function (response) {
            $scope.singleToon = response.data;
    });
}); 

    
controlApp.controller("singleCategory", function($scope, $http, $routeParams, $location){
    $scope.goToSingle = function(id){
        $location.path("/api/single/" + id);           
    }  
    $http.get('/api/category/' + $routeParams.className)
       .then(function (response) {
            $scope.oneCategory = response.data;
            console.log($scope.oneCategory)
        });  
});


