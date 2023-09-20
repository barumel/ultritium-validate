import _ from 'lodash';

import ValidationProvider from './ValidationProvider.js';
import TypeProvider from './TypeProvider.js';
import MessageProvider from './MessageProvider.js';
import TypeObject from './Type/Object.js';

function Validator(validationProvider) {
  if (_.isUndefined(validationProvider)) throw new Error('No validation provider given!');

  const providers = new Map([
    ['validation', validationProvider],
    ['type', TypeProvider()],
    ['message', MessageProvider()]
  ]);

  function getProvider(identifier) {
    return providers.get(identifier);
  }

  function setProvider(identifier, provider) {
    providers.set(identifier, provider);
  }

  function validate(definition, data = {}) {
    checkDefinitionArgument(definition);
    const result = TypeObject(
      definition.validations,
      getProvider('type'),
      getProvider('validation'),
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

export default Validator;
