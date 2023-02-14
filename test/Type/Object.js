const assert = require('assertthat');

const TypeObject = require('../../src/Type/Object');
const TypeProvider = require('../../src/TypeProvider');

const provider = TypeProvider();

const flat = {
    name: {
      type: 'string',
      validations: {}
    },
    age: {
      type: 'number',
      validations: {}
    }
};


const nested = {
  name: {
    type: 'string',
    validations: {}
  },
  age: {
    type: 'number',
    validations: {}
  },
  address: {
    type: 'object',
    validations: {
      street: {
        type: 'string',
        validations: {}
      },
      number: {
        type: 'number',
        validations: {}
      }
    }
  }
};

describe('Type object tests', () => {
  describe('Test basic validate method', () => {
    it('Must return an error if not an object was passed to validate', () => {
      const type = TypeObject({}, {}, {}, {});
      let result = {};

      result = type.validate(null);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, null given', value: null});

      result = type.validate(undefined);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, undefined given', value: undefined});

      result = type.validate('test');
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, string given', value: 'test'});

      result = type.validate(42);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, number given', value: 42});

      result = type.validate([]);
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, array given', value: []});

      result = type.validate(() => {});
      assert.that(result.type).is.equalTo({ valid: false, message: 'Value must be of type object, function given', value: () => {}});
    });

    it('Type property must be undefined if an object was passed to validate and no additional validations are defined', () => {
      const type = TypeObject({}, {}, {}, {});
      const result = type.validate({});
      assert.that(result.type).is.undefined();
    });

    it('Must return an empty object if an object was passed to validate and no additional validations are defined', () => {
      const type = TypeObject({}, {}, {}, {});
      const result = type.validate({});
      assert.that(result).is.equalTo({});
    });

    it('Must return an empty object if no validations where passed', () => {
      const type = TypeObject({}, provider, {}, {});
      const result = type.validate({});

      assert.that(result).is.equalTo({});
    });

    it('Must retrun an empty object if value was passed but no validations are defined', () => {
      const type = TypeObject({}, provider, {}, {});
      const result = type.validate({ foo: 'bar' });

      assert.that(result).is.equalTo({});
    });
  });

  describe('Test flat object validation (flat) whitout required', () => {
    it('Must return an empty object if validations are definied but no value was passed', () => {
      const type = TypeObject(flat, provider, {}, {});
      const result = type.validate({});

      assert.that(result).is.equalTo({});
    });

    it('Must return an error if validations are defined and passed value is invalid', () => {
      const expected = {
        valid: false,
        value: 42,
        message: 'Value must be of type string, number given'
      }

      const type = TypeObject(flat, provider, {}, {});
      const result = type.validate({ name: 42 });

      assert.that(result.name.type).is.equalTo(expected);
    });

    it('Must return an empty object if multiple types are defined and one of them is valid', () => {
      const definition = {
        name: {
          type: ['string', 'number'],
          validations: {}
        }
      };
      const type = TypeObject(definition, provider, {}, {});
      const result = type.validate({ name: 'Peter' });

      assert.that(result).is.equalTo({});
    });

    it('Must return an error if multiple types are defined and none of them is valid', () => {
      const definition = {
        name: {
          type: ['string', 'number'],
          validations: {}
        }
      };

      const expected = {
        valid: false,
        value: true,
        message: 'Value must be of type number, boolean given OR Value must be of type number, boolean given'
      }

      const type = TypeObject(definition, provider, {}, {});
      const result = type.validate({ name: true });

      assert.that(result.name.type).is.equalTo(expected);
    });
  });
});
