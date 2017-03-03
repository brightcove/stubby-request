'use strict';

/**
 * This module holds common code used for stubbing request methods and tracking calls that were made.
 */
const
  expect = require('chai').expect,
  request = require('request'),
  requestCalls =
    {
      put: [],
      post: [],
      get: [],
      delete: []
    };

const
  resetRequestCalls = function() {
    requestCalls.get.length = 0;
    requestCalls.put.length = 0;
    requestCalls.post.length = 0;
    requestCalls.delete.length = 0;
  },

  /**
   * Stub the specified request function.  The specified objects will be returned and the request
   * params will be added to the requestCalls object.
   *
   * @param sandbox A sinon sandbox
   * @param method One of: get, post, put, delete
   * @param err An error that you want the request call to return.  Defaults to undefined.
   * @param response A response object that you want the request call to return.  Defaults to { statusCode: 200 }
   * @param body The body that you want returned from a request call.  Defaults to undefined.
   */
  stubRequestCalls = function(sandbox, method, err, response, body) {
    if (!response) {
      response = { statusCode: 200 };
    }
    sandbox.stub(request, method.toLowerCase(), function(params, callback) {

      requestCalls[method].push(params);
      callback(err, response, body);
    });
  },

  /**
   * Expect to find the text/json content type header.
   * @param response The response object returned from a request() call
   */
  expectJsonHeader = function(response) {
    expect(response.headers).to.exist;
    expect(response.headers.length).gte(1);
    expect(response.headers).to.contain('content-type:text/json');
  },

  /**
   * Expect the json param of the response to match the expectedBody that you pass.
   * @param response The response object returned from a request() call
   * @param expectedBody The expected JSON object/
   */
  expectJsonBody = function(response, expectedBody) {
    expect(response.json).to.exist;
    expect(response.json).to.deep.equal(expectedBody);
  };

module.exports = {
  requestCalls: requestCalls,
  resetRequestCalls: resetRequestCalls,
  stubRequestCalls: stubRequestCalls,
  expectJsonBody: expectJsonBody,
  expectJsonHeader: expectJsonHeader
};
