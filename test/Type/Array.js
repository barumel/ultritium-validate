const assert = require('assertthat');

const TypeArray = require('../../src/Type/Array');
const ValidationProvider = require('../../src/ValidationProvider');
const TypeProvider = require('../../src/TypeProvider');
const MessageProvider = require('../../src/MessageProvider');

const validationProvider = ValidationProvider();
const typeProvider = TypeProvider();
const messageProvider = MessageProvider();


validationProvider.addValidation('foo', value => true);

describe('Type array tests', () => {
  describe('Test validate method', () => {
    it('Must throw an error if not an array was passed to validate', () => {
      const type = TypeArray({}, typeProvider, validationProvider, messageProvider);
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, null given.', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, undefined given.', value: undefined});

      result = type.validate('test');
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, string given.', value: 'test'});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, number given.', value: 42});

      result = type.validate({});
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, object given.', value: {}});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ message: 'Value must be of type array, function given.', value: () => {}});
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
  });
});
