const assert = require('assertthat');
const util = require('util');

const TypeArray = require('../../src/Type/Array');
const ValidationProvider = require('../../src/ValidationProvider');
const TypeProvider = require('../../src/TypeProvider');
const MessageProvider = require('../../src/MessageProvider');

const validationProvider = ValidationProvider();
const typeProvider = TypeProvider();
const messageProvider = MessageProvider();


validationProvider.addValidation('foo', value => true);
validationProvider.addValidation('contains', (value, c) => value.includes(c));

describe('Type array tests', () => {
  describe('Test validate method', () => {
    it('Must return an error if not an array was passed to validate', () => {
      const type = TypeArray({}, typeProvider, validationProvider, messageProvider);
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, value: null, message: 'Value must be of type array, null given' });

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type array, undefined given', value: undefined});

      result = type.validate('test');
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type array, string given', value: 'test'});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type array, number given', value: 42});

      result = type.validate({});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type array, object given', value: {}});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type array, function given', value: () => {}});
    });

    it('Type property must be undefined if an array was passed to validate and no additional validations are defined', () => {
      const type = TypeArray({}, typeProvider, validationProvider, messageProvider);
      const result = type.validate([]);
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if an array was passed to validate and no additional validations are defined', () => {
      const type = TypeArray({}, typeProvider, validationProvider, messageProvider);
      const result = type.validate([]);
      assert.that(result).is.equalTo({});
    });

    it('Must validate validate each element in array', () => {
      const type = TypeArray({ contains: ['foo'] }, typeProvider, validationProvider, messageProvider);
      const result = type.validate(['foo', 'bar', 'foobar']);

      const expected = {
        '1': {
          contains: {
            valid: false,
            item: 'bar',
            args: ['foo'],
            message: 'The provided value is not valid!'
          }
        }
      };

      assert.that(result).is.equalTo(expected);
    });

    it('Must validate sub objects', () => {
      const definition = {
        foo: {
          type: 'string',
          validations: {
            contains: 'foo'
          }
        },
        bar: {
          type: 'string',
          validations: {
            contains: 'foo'
          }
        }
      };

      const data = [{
        foo: 'foo',
        bar: 'foo'
      }, {
        foo: 'foo',
        bar: 'bar'
      }];

      const type = TypeArray(definition, typeProvider, validationProvider, messageProvider);
      const result = type.validate(data);

      const expected = {
        '1': {
          bar: {
            contains: {
              valid: false,
               value: 'bar',
               args: 'foo',
               message: 'The provided value is not valid!'
             }
           }
         }
       };

      assert.that(result).is.equalTo(expected);
    });
  });
});
