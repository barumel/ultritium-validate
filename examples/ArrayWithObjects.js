const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();
validationProvider.addValidation('contains', (value, c) => value.includes(c));

const validator = Validator(validationProvider);

const definition = {
  validations: {
    sub: {
      type: 'array',
      validations: {
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
      }
    },
    sub2: {
      type: 'object',
      validations: {
        subarr: {
          type: 'array',
          validations: {
            baz: {
              type: 'string',
              validations: {
                contains: 'foo'
              }
            },
            ban: {
              type: 'string',
              validations: {
                contains: 'foo'
              }
            }
          }
        }
      }
    }
  }
};

const data = {
  sub: [{
    foo: 'foo',
    bar: 'foo'
  }, {
    foo: 'foo',
    bar: 'bar'
  }],
  sub2: {
    subarr: [{
      baz: 'foo',
      ban: 'foo'
    }, {
      baz: 'foo',
      ban: 'ban'
    }]
  }
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
