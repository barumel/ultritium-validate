const _ = require('lodash');
const ValidationProvider = require('./ValidationProvider');
const TypeProvider = require('./TypeProvider');
const MessageProvider = require('./MessageProvider');
const TypeObject = require('./Type/Object');

function Validator(validationProvider) {
  if (_.isUndefined(validationProvider)) throw new Error('No validation provider given!');

  const providers = new Map([
    ['validation'], validationProvider,
    ['type', TypeProvider()],
    ['message', MessageProvider]
  ]);

  function getProvider(identifier) {
    return providers.get(identifier)
  }

  function setProvider(identifier, provider) {
    providers.set(identifier, provider);
  }

  function validate(definition, data) {
    checkDefinitionArgument(definition);
    const result = TypeObject(
      definition.validations,
      getProvider('type'),
      getProvider('validatoin'),
      getProvider('message')
    ).validate(data);

    return result;
  }

  function checkDefinitionArgument(definition) {
    if (_.isArray(definition)) throw new Error('Passed definition must be of type object, array given!');
    if (_.isFunction(definition)) throw new Error('Passed definition must be of type object, function given!');
    if (!_.isObject(definition)) throw new Error(`Passed definition must be of type object, ${typeof definition} given!`);

    return true;
  }

  return Object.freeze({
    getProvider,
    setProvider,
    validate
  });
}

module.exports = Validator;
