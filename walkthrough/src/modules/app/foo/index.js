'use strict';

module.exports =
  angular.module('futuristic sass guide.foo', [
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/foo/layout.html',
      controller: 'fooController'
    });
  })
  .controller('fooController', require('./fooController'));
