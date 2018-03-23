const assert = require('assertthat');
const Validator = require('../src/Validator');
const ValidationProvider = require('./ValidationProvider');
const TypeProvider = require('./TypeProvider');
const MessageProvider = require('./MessageProvider');

const flat = {
    name: {
      type: 'string',
      validations: {}
    },
    age: {
      type: 'number',
      validations: {}
    }
};


const nested = {
  name: {
    type: 'string',
    validations: {}
  },
  age: {
    type: 'number',
    validations: {}
  },
  address: {
    type: 'object',
    validations: {
      street: {
        type: 'string',
        validations: {}
      },
      number: {
        type: 'number',
        validations: {}
      }
    }
  }
};

describe('Validator tests', () => {
  describe('Constructor tests', () => {
    it('Must throw an error if no validation provider was passed', () => {
      assert.that(() => {
        const validator = Validator();
      }).is.throwing('No validation provider given!');
    });
  });

  describe('Test validate method', () => {

  });
});
