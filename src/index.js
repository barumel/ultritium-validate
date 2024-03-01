import _ from 'lodash';
import validations from 'validator';

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

    return func.apply(validations, [ value + '', ...args ])
  }

  return Object.freeze({
    ...provider,
    hasValidation,
    getValidation,
    validate
  });
}

export function DefaultValidator() {
  const validationProvider = ValidationProvider(ParentValidatonProvider());

  return Validator(validationProvider);
}

export { default as flattenValidationResult } from './Utils/flattenValidationResult.js';
export { default as MessageProvider } from './MessageProvider.js';
export { default as Type } from './Type/Type.js';
export { default as TypeArray } from './Type/Array.js';
export { default as TypeNumber } from './Type/Number.js';
export { default as TypeObject } from './Type/Object.js';
export { default as TypeProvider } from './TypeProvider.js';
export { default as TypeString } from './Type/String.js';
export { default as ValidationProvider } from './ValidationProvider.js';
export { default as Validator } from './Validator.js';

/*
module.exports = {
  DefaultValidator,
  flattenValidationResult,
  MessageProvider,
  Type,
  TypeArray,
  TypeNumber,
  TypeObject,
  TypeProvider,
  TypeString,
  ValidationProvider,
  Validator
};
*/
