const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');
const util = require('util');

const validationProvider = ValidationProvider();
validationProvider.addValidation('hasNoUndefinedValues', (value) => _.every(Object.values(value), (value) => !_.isUndefined(value)));
validationProvider.addValidation('hasRequiredValues', (value) => _.every(Object.values(value), (value) => !_.isUndefined(value)));

const validator = Validator(validationProvider);

const definition = {
  validations: {
    unstructured: {
      type: 'plainObject',
      required: true,
      validations: {
        hasNoUndefinedValues: [],
        hasRequiredValues: [['name', 'lastName']]
      }
    }
  }
};

const data = {
  unstructured: {
    foo: undefined,
    name: 'Foo'
  }
}


const result = validator.validate(definition, data);

console.log(util.inspect(result, false, null, true /* enable colors */))
