const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();

const validator = Validator(validationProvider);

const definition = {
  validations: {
    address: {
      type: 'object',
      required: true,
      validations: {
        street: {
          type: 'string',
          required: true,
          validations: {
            isLength: [{ min: 0, max: 20 }]
          }
        },
        number: {
          type: 'number',
          required: true,
          validations: {
            isFloat: [{ min: 0, max: 100 }]
          }
        }
      }
    }
  }
};

const data = {
  address: {
    street: 12345,
    number: 'Foo'
  }
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
