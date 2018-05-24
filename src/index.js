const _ = require('lodash');
const validations = require('validator');

const Validator = require('./Validator');
const TypeProvider = require('./TypeProvider');
const ValidationProvider = require('./ValidationProvider');
const MessageProvider = require('./MessageProvider');
const Type = require('./Type/Type');
const TypeArray = require('./Type/Array');
const TypeNumber = require('./Type/Array')
const TypeObject = require('./Type/Object');
const TypeString = require('./Type/String');

function ParentValidatonProvider() {
  const provider = ValidationProvider();

  function validate(value, identifier, args) {
    const func = validations[identifier];
    if (!_.isFunction(func)) throw new Error(`No validation method "${identifier}" registered!`);

    return func.apply(validations, [ value.toString(), ...args ])
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
  Validator,
  DefaultValidator,
  TypeProvider,
  ValidationProvider,
  MessageProvider,
  Type,
  TypeArray,
  TypeNumber,
  TypeObject,
  TypeString
}
