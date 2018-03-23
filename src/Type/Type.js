const _ = require('lodash');

/**
 * Base type
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function Type(validations, typeProvider, validationProvider, messageProvider) {
  if (!validations || _.isUndefined(validations)) throw new Error(`No validations passed to constructor`);
  if (!_.isObject(validations) || _.isFunction(validations) || _.isArray(validations)) throw new Error(`Passed validations must be an object`);
  if (!typeProvider || _.isUndefined(typeProvider)) throw new Error(`No type provider passed to Type`);
  if (!_.isObject(typeProvider) || _.isFunction(typeProvider) || _.isArray(typeProvider)) throw new Error(`Passed type provider must be an object`);
  if (!validationProvider || _.isUndefined(validationProvider)) throw new Error(`No validation provider passed to Type`);
  if (!_.isObject(validationProvider) || _.isFunction(validationProvider) || _.isArray(validationProvider)) throw new Error(`Passed validation provider must be an object`);
  if (!messageProvider || _.isUndefined(messageProvider)) throw new Error(`No message provider passed to Type`);
  if (!_.isObject(messageProvider) || _.isFunction(messageProvider) || _.isArray(messageProvider)) throw new Error(`Passed message provider must be an object`);

  /**
   * Validate method.
   * Must be implemented by each type
   *
   * @param  {Mixed} value Data to validate
   *
   * @return {}
   */
  function validate() {
    throw new Error('Each validator must implement a validate method');
  }

  return Object.freeze({
    validate
  });
}

module.exports = Type;
