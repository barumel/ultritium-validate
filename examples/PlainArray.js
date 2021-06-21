const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();
validationProvider.addValidation('minArrayLength', (value, min) => _.get(value, 'length', 0) >= min);

const validator = Validator(validationProvider);

const definition = {
  validations: {
    names: {
      type: 'plainArray',
      required: true,
      validations: {
        minArrayLength: [3]
      }
    }
  }
};

const data = {
  names: [
    'Peter',
    'Joe'
  ]
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
