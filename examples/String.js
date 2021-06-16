const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();

const validator = Validator(validationProvider);

const definition = {
  validations: {
    name: {
      type: 'string',
      required: true,
      validations: {
        isLength: [{ min: 0, max: 20 }]
      }
    }
  }
};

const data = {
  name: 'Mr. To long name that should result in an error'
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
