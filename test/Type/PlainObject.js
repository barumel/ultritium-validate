const assert = require('assertthat');

const TypePlainObject = require('../../src/Type/PlainObject');

describe('Type plainObject tests', () => {
  describe('Test validate method', () => {
    it('Must return an error if not an object was passed to validate', () => {
      const type = TypePlainObject({}, {}, {}, {});
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, null given', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, undefined given', value: undefined});

      result = type.validate('test');
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, string given', value: 'test'});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, number given', value: 42 });

      result = type.validate([]);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, array given', value: []});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, function given', value: () => {}});
    });

    it('Type property must be undefined if an object was passed to validate and no additional validations are defined', () => {
      const type = TypePlainObject({}, {}, {}, {});
      const result = type.validate({});
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if an object was passed to validate and no additional validations are defined', () => {
      const type = TypePlainObject({}, {}, {}, {});
      const result = type.validate({});
      assert.that(result).is.equalTo({});
    });
  });
});
