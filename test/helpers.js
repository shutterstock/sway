/* eslint-env browser, mocha */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Jeremy Whitlock
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var assert = require('assert');
var helpers = require('../lib/helpers');
var Sway = require('../');

var swaggerDoc = require('./fixtures/swagger');
var swaggerDocValidator = helpers.getJSONSchemaValidator();
var swaggerApi;

function getSwaggerApi(callback) {
  if (swaggerApi) {
    callback(swaggerApi);
  } else {
    Sway.create({
      definition: swaggerDoc
    })
      .then(function (obj) {
        swaggerApi = obj;

        callback(swaggerApi);
      }, function (err) {
        callback(err);
      });
  }
};

function fail (msg) {
  assert.fail(msg);
}

function getSway() {
  return Sway;
};

function shouldHadFailed() {
  fail('The code above should had thrown an error');
};

function shouldNotHadFailed(err) {
  console.error(err.stack);

  fail('The code above should not had thrown an error');
};

module.exports = {
  getSwaggerApi: getSwaggerApi,
  swaggerDoc: swaggerDoc,
  swaggerDocValidator: swaggerDocValidator,
  fail: fail,
  getSway: getSway,
  shouldHadFailed: shouldHadFailed,
  shouldNotHadFailed: shouldNotHadFailed
};

console.log(module.exports)
