'use strict';

module.exports =
  angular.module('bliss.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);
