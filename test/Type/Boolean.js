import assert from 'assertthat';

import TypeBoolean from '../../src/Type/Boolean.js';

describe('Type string tests', () => {
  describe('Test validate method', () => {
    it('Must return an error if not a boolean was passed to validate', () => {
      const type = TypeBoolean({}, {}, {}, {});
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, null given', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, undefined given', value: undefined});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, number given', value: 42});

      result = type.validate({});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, object given', value: {}});

      result = type.validate([]);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, array given', value: []});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type boolean, function given', value: () => {}});
    });

    it('Type property must be undefined if a boolean was passed to validate and no additional validations are defined', () => {
      const type = TypeBoolean({}, {}, {}, {});
      const result = type.validate(true);
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if a boolean was passed to validate and no additional validations are defined', () => {
      const type = TypeBoolean({}, {}, {}, {});
      const result = type.validate(true);
      assert.that(result).is.equalTo({});
    });
  });
});
