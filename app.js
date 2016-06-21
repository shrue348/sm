"use strict";

var movieSearchApp = angular.module('movieSearchApp', ['ngRoute']);

movieSearchApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/list.html',
      controller: 'movieListCtrl'
    }).
    when('/:countryName', {
      templateUrl: 'views/detail.html',
      controller: 'movieDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});

movieSearchApp.factory('rootScope', function (){
  return {}
});

movieSearchApp.controller('movieListCtrl', function ($scope, $http, rootScope){
  $scope.list;
  $scope.query;
  
  $scope.thumb = 'http://image.tmdb.org/t/p/w500';
  $scope.dummy = '/dummy.png';
  $scope.root = rootScope;
  $scope.current_page;
  $scope.total_pages;

  $scope.search = function(query){
    var apiKey = '72b56103e43843412a992a8d64bf96e9',
        getUrl = 'https://api.themoviedb.org/3/search/movie';

    
    $scope.root.query = query || $scope.root.query;
    $scope.movies;
    $scope.query = query || $scope.root.query;
    $scope.currentPage =  $scope.root.currentPage || 1;

    $http.get(getUrl +'?api_key='+ apiKey +'&query='+ $scope.query +'&page='+ $scope.currentPage)
      .success(function(data, status, headers, config) {
        $scope.movies = data;
        $scope.list = data.results;
        $scope.total_pages = data.total_pages;
        console.log($scope.total_pages)
      });
  };

  $scope.pageForward = function() {
    $scope.currentPage = $scope.currentPage + 1;
    $scope.root.currentPage = $scope.currentPage;
    $scope.search()
  }
  $scope.pageBack = function() {
    $scope.currentPage = $scope.currentPage - 1;
    $scope.root.currentPage = $scope.currentPage;
    $scope.search()
  }
  $scope.firstPage = function() {
    return $scope.currentPage == 1;
  }

  $scope.lastPage = function() {
    return $scope.currentPage == $scope.total_pages;
  }

  $scope.search();
});

movieSearchApp.controller('movieDetailCtrl', function ($scope, $routeParams, $http, rootScope){
    $scope.apiKey = '72b56103e43843412a992a8d64bf96e9';
    $scope.thumb = 'http://image.tmdb.org/t/p/w500';
    $scope.root = rootScope;
    $scope.data = {};

    $scope.detail = function(query){ 
      $scope.query =   $routeParams.countryName;

      $http.get('https://api.themoviedb.org/3/movie/'+ $scope.query +'?api_key='+ $scope.apiKey)
        .success(function(data, status, headers, config) {
          $scope.data = data;
        }); 
    }

    $scope.detail();
});