const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();

const validator = Validator(validationProvider);

const definition = {
  validations: {
    age: {
      type: 'number',
      required: true,
      validations: {
        isFloat: [{ min: 0, max: 20 }]
      }
    }
  }
};

const data = {
  age: 24
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
