import validations from 'validator';
import _ from 'lodash';

import ValidationProvider from './ValidationProvider.js';
import Validator from './Validator.js';

function ParentValidatonProvider() {
  const provider = ValidationProvider();

  function hasValidation(identifier) {
    const func = validations[identifier];

    return _.isFunction(func);
  }

  function getValidation(identifier) {
    return validations[identifier];
  }

  function validate(value, identifier, args) {
    const func = validations[identifier];
    if (!_.isFunction(func)) throw new Error(`No validation method "${identifier}" registered!`);

    console.log('VALIDATOR: CALL PARENT VALIDATOR FOR', identifier, value, ...args);


    return func.apply(validations, [value + '', ...args]);
  }

  return Object.freeze({
    ...provider,
    hasValidation,
    getValidation,
    validate
  });
}

export default function DefaultValidator() {
  const validationProvider = ValidationProvider(ParentValidatonProvider());

  return Validator(validationProvider);
}
