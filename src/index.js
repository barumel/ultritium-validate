const _ = require('lodash');
const validations = require('validator');

const MessageProvider = require('./MessageProvider');
const Type = require('./Type/Type');
const TypeArray = require('./Type/Array');
const TypeNumber = require('./Type/Array');
const TypeObject = require('./Type/Object');
const TypeProvider = require('./TypeProvider');
const TypeString = require('./Type/String');
const ValidationProvider = require('./ValidationProvider');
const Validator = require('./Validator');

const flattenValidationResult = require('./Utils/flattenValidationResult');

function ParentValidatonProvider() {
  const provider = ValidationProvider();

  function validate(value, identifier, args) {
    const func = validations[identifier];
    if (!_.isFunction(func)) throw new Error(`No validation method "${identifier}" registered!`);

    return func.apply(validations, [ value + '', ...args ])
  }

  return Object.freeze({
    ...provider,
    validate
  });
}

function DefaultValidator() {
  const validationProvider = ValidationProvider(ParentValidatonProvider());

  return Validator(validationProvider);
}

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
