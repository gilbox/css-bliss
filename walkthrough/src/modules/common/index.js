'use strict';

module.exports =
  angular.module('fsg.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);
