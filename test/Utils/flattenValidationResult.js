const assert = require('assertthat');
const flattenValidationResult = require('../../src/Utils/flattenValidationResult.js');

describe('Test validation utils', () => {
  describe('Test flattenValidationResult function', () => {
    it('Must return an array of all messages', () => {
      const validations = {
        foo: {
          valid: false,
          value: 'foo',
          message: 'nope',
          args: []
        },
        bar: {
          valid: false,
          value: 'bar',
          message: 'nok',
          args: []
        }
      };

      assert.that(flattenValidationResult(validations)).is.equalTo([
        { key: 'foo', valid: false, "message": "nope", "value": "foo", args: [] },
        { key: 'bar', valid: false, "message": "nok", "value": "bar", args: [] }
      ]);
    });

    it('Must return an array of all messages and messages from nested objects', () => {
      const validations = {
        account: {
          isNull: {
            valid: false,
            value: 'foo',
            message: 'isNull',
            args: []
          },
          isFloat: {
            valid: false,
            value: 'foo',
            message: 'isFloat',
            args: [],
            isNumber: {
              valid: false,
              value: 'foo',
              message: 'isNumber',
              args: []
            }
          }
        },
        isSuper: {
          valid: false,
          value: 'bar',
          message: 'isSuper',
          args: []
        }
      };

      assert.that(flattenValidationResult(validations)).is.equalTo([
        { key: 'isNull', valid: false, message: 'isNull', value: 'foo', args: [] },
        { key: 'isFloat', valid: false, message: 'isFloat', value: 'foo', args: [] },
        { key: 'isNumber', valid: false, message: 'isNumber', value: 'foo', args: [] },
        { key: 'isSuper', valid: false, message: 'isSuper', value: 'bar', args: [] }
      ]);
    });
  });
});
