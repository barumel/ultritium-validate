// The default validator uses https://www.npmjs.com/package/validator
// You can use the function names as the key in validations


const _ = require('lodash');
const { DefaultValidator: Validator } = require('../src/index.js');
const validator = Validator();
validator.getProvider('validation').addValidation('min', (value, min) => value > min)
.addValidation('max', (value, min) => value < min);

const definition = {
    validations: {
      name: {
        type: 'string',
        validations: {
          isEmpty: [],
          isLength: [5]
        }
      },
      age: {
        type: 'number',
        validations: {
          isNumeric: [],
          min: [1],
          max: [150]
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
