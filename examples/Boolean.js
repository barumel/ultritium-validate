const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();
validationProvider.addValidation('isTrue', (value) => value === true);

const validator = Validator(validationProvider);

const definition = {
  validations: {
    isFunny: {
      type: 'number',
      required: true,
      validations: {
        isTrue: []
      }
    }
  }
};

const data = {
  isFunny: false
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
