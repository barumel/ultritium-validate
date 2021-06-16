const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();
validationProvider.addValidation('isString', (value) => _.isString(value));

const validator = Validator(validationProvider);

const definition = {
  validations: {
    names: {
      type: 'array',
      required: true,
      validations: {
        isString: [],
        isLength: [{ min: 0, max: 20 }]
      }
    }
  }
};

const data = {
  names: [
    'Peter',
    'Joe',
    777,
    'Mr. To long name that should result in an error'
  ]
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
