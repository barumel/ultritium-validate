const assert = require('assertthat');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const TypeProvider = require('../src//TypeProvider');
const MessageProvider = require('../src//MessageProvider');

const validationProvider = ValidationProvider();
const typeProvider = TypeProvider();
const messageProvider = MessageProvider();


validationProvider.addValidation('foo', () => true);
validationProvider.addValidation('bar', () => true);
validationProvider.addValidation('nope', () => false);

const flat = {
    validations: {
      name: {
        type: 'string',
        validations: {
          foo: []
        }
      },
      age: {
        type: 'number',
        validations: {
          bar: []
        }
      }
    }
};

const falseFlat = {
    validations: {
      name: {
        type: 'string',
        validations: {
          foo: []
        }
      },
      age: {
        type: 'number',
        validations: {
          nope: []
        }
      }
    }
};


const nested = {
  validations: {
    name: {
      type: 'string',
      validations: {
        foo: []
      }
    },
    age: {
      type: 'number',
      validations: {
        bar: []
      }
    },
    address: {
      type: 'object',
      validations: {
        street: {
          type: 'string',
          validations: {
            bar: []
          }
        },
        number: {
          type: 'number',
          validations: {
            foo: []
          }
        }
      }
    }
  }
};

const falseNested = {
  validations: {
    name: {
      type: 'string',
      validations: {
        nope: []
      }
    },
    age: {
      type: 'number',
      validations: {
        foo: []
      }
    },
    address: {
      type: 'object',
      validations: {
        street: {
          type: 'string',
          validations: {
            bar: []
          }
        },
        number: {
          type: 'number',
          validations: {
            nope: []
          }
        }
      }
    }
  }
};

describe('Validator tests', () => {
  describe('Constructor tests', () => {
    it('Must throw an error if no validation provider was passed', () => {
      assert.that(() => {
        const validator = Validator();
      }).is.throwing('No validation provider given!');
    });
  });

  describe('Test validate method', () => {
    describe('Flat object tests', () => {
      const validator = Validator(validationProvider);

      it('Must return an empty object if everything is valid', () => {
        assert.that(validator.validate(flat, { name: 'Foo', age: 12 })).is.equalTo({});
      });

      it('Must contain errors', () => {
        const data = { age: 7 };
        const expected = {
          age: {
            nope: {
              valid: false,
              value: 7,
              message: 'The provided value is not valid!'
            }
          }
        }

        assert.that(validator.validate(falseFlat, data)).is.equalTo(expected);
      });
    });

    describe('Nested object tests', () => {
      const validator = Validator(validationProvider);

      it('Must return an empty object if everything is valid', () => {
        assert.that(validator.validate(nested, { name: 'Foo', address: { number: 12 } })).is.equalTo({});
      });

      it('Must containt errors', () => {
        const data = {
          name: 'foo',
          age: 23,
          address: {
            number: 12
          }
        };

        const expected = {
          name: {
            nope: {
              valid: false,
              value: 'foo',
              message: 'The provided value is not valid!'
            }
          },
          address: {
            number: {
              nope: {
                valid: false,
                value: 12,
                message: 'The provided value is not valid!'
              }
            }
          }
        }

        assert.that(validator.validate(falseNested, data)).is.equalTo(expected);
      });
    });
  });
});
