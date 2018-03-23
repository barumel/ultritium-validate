const _ = require('lodash');
const Validator = require('../src/Validator');
const ValidationProvider = require('../src/ValidationProvider');

const validationProvider = ValidationProvider();
validationProvider.addValidation('min', (value, min) => value > min);
validationProvider.addValidation('max', (value, max) => value < max);
validationProvider.addValidation('minLength', (value, min) => value.length > min);

const validator = Validator(validationProvider);

const definition = {
    validations: {
      name: {
        type: 'string',
        validations: {
          minLength: [5]
        }
      },
      age: {
        type: 'number',
        validations: {
          min: [0],
          max: [100]
        }
      }
    }
};

const data = {
  name: 'Mr. Foo',
  age: 35
};

const valid = validator.validate(definition, data);
console.log(valid);
// Should be an empty object

const invalid = validator.validate(definition, { name: 'Foo', age: 2000 });
console.log(invalid);
// Should contain the following error:
