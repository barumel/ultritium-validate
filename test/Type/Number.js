const assert = require('assertthat');

const TypeNumber = require('../../src/Type/Number');

describe('Type number tests', () => {
  describe('Test validate method', () => {
    it('Must return an error if not a number was passed to validate', () => {
      const type = TypeNumber({}, {}, {}, {});
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, null given.', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, undefined given.', value: undefined});

      result = type.validate('test');
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, string given.', value: 'test'});

      result = type.validate({});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, object given.', value: {}});

      result = type.validate([]);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, array given.', value: []});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type number, function given.', value: () => {}});
    });

    it('Type property must be undefined if a number was passed to validate and no additional validations are defined', () => {
      const type = TypeNumber({}, {}, {}, {});
      const result = type.validate(42);
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if a number was passed to validate and no additional validations are defined', () => {
      const type = TypeNumber({}, {}, {}, {});
      const result = type.validate(42);
      assert.that(result).is.equalTo({});
    });
  });
});
