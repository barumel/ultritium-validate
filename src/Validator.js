const _ = require('lodash');
const ValidationProvider = require('./ValidationProvider');
const TypeProvider = require('./TypeProvider');
const MessageProvider = require('./MessageProvider');

function Validator(validationProvider) {
  if (_.isUndefined(validationProvider)) throw new Error('No validation provider given!');

  let TypeProvider = TypeProvider();
  let MessageProvider = MessageProvider();


  function getValidationProvider() {

  }

  function setValidationProvider() {

  }

  function getTypeProvider() {

  }

  function setTypeProvider() {

  }

  function getMessageProvider() {

  }

  function setMessageProvider() {

  }

  function validate(definition, data) {
    checkDefinitionArgument(definition);
  }

  function checkDefinitionArgument(definition) {
    if (_.isArray(definition)) throw new Error('Passed definition must be of type object, array given!');
    if (_.isFunction(definition)) throw new Error('Passed definition must be of type object, function given!');
    if (!_.isObject(definition)) throw new Error(`Passed definition must be of type object, ${typeof definition} given!`);

    return true;
  }

  return Object.freeze({

  });
}

module.exports = Validator;
