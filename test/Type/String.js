const assert = require('assertthat');

const TypeString = require('../../src/Type/String');

describe('Type string tests', () => {
  describe('Test validate method', () => {
    it('Must return an error if not a string was passed to validate', () => {
      const type = TypeString({}, {}, {}, {});
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, null given', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, undefined given', value: undefined});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, number given', value: 42});

      result = type.validate({});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, object given', value: {}});

      result = type.validate([]);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, array given', value: []});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type string, function given', value: () => {}});
    });

    it('Type property must be undefined if a string was passed to validate and no additional validations are defined', () => {
      const type = TypeString({}, {}, {}, {});
      const result = type.validate('');
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if a string was passed to validate and no additional validations are defined', () => {
      const type = TypeString({}, {}, {}, {});
      const result = type.validate('');
      assert.that(result).is.equalTo({});
    });
  });
});
