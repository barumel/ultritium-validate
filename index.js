const _ = require('lodash');
const validations = require('validator');

const Validator = require('./src/Validator');
const TypeProvider = require('./src/TypeProvider');
const ValidationProvider = require('./src/ValidationProvider');
const MessageProvider = require('./src/MessageProvider');
const Type = require('./src/Type/Type');
const TypeArray = require('./src/Type/Array');
const TypeNumber = require('./src/Type/Array')
const TypeObject = require('./src/Type/Object');
const TypeString = require('./src/Type/String');

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
