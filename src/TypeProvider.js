const _ = require('lodash');
const TypeString = require('./Type/String');
const TypeNumber = require('./Type/Number');
const TypeArray = require('./Type/Array');
const TypeObject = require('./Type/Object');
const TypeBoolean = require('./Type/Boolean');
const TypePlainObject = require('./Type/PlainObject');
const TypePlainArray = require('./Type/PlainArray');

/**
 * Type factory
 *
 * @constructor
 */
function TypeProvider() {
  // Default types
  const types = new Map([
    ['string', TypeString],
    ['number', TypeNumber],
    ['array', TypeArray],
    ['object', TypeObject],
    ['boolean', TypeBoolean],
    ['plainObject', TypePlainObject],
    ['plainArray', TypePlainArray]
  ]);

  /**
   * Is there a factory function for the given identifier
   *
   * @param  {Mixed} identifier Type identifier
   *
   * @return {Boolean}
   */
  function hasFactory(identifier) {
    return types.has(identifier);
  }

  /**
   * Get the constructor function for the given identifier
   *
   * @param  {Mixed} identifier Type identifier
   *
   * @return {Mixed} type factory function for this type or undefined
   */
  function getFactory(identifier) {
    return types.get(identifier);
  }

  /**
   * Add a new factory function for the given identifier.
   * Throws an error if there is already a factory function in types for the given identifier...
   * Use replace instead
   *
   * @param {Mixed}    identifier Type identifier
   * @param {Function} func       factory function
   *
   * @return {Factory} this This instance
   */
  function addFactory(identifier, func) {
    checkIdentifierArgument(identifier);
    checkFactoryFunctionArgument(func);

    if (types.has(identifier)) throw new Error(`Factory function with identifier ${identifier} already registered`);
    types.set(identifier, func);

    return this;
  }

  /**
   * Replace the registered factory function with the given one.
   * If not already added, add it. Else replace it...
   *
   * @param {Mixed}    identifier Type identifier
   * @param {Function} func       factory function
   *
   * @return {Factory} this This instance
   */
  function replaceFactory(identifier, func) {
    checkIdentifierArgument(identifier)
    checkFactoryFunctionArgument(func);

    types.set(identifier, func);

    return this;
  }

  /**
   * Remove the factory function for the given identifier
   *
   * @param  {[type]} identifier [description]
   *
   * @return {[type]}            [description]
   */
  function removeFactory(identifier) {
    types.delete(identifier);

    return this;
  }

  /**
   * Create a new type instance
   *
   * @param {Mixed}  identifier       Type identifier
   * @param {Object} [validations={}] Validation definition
   *
   * @return {Object} type Type instance
   */
  function create(identifier, validationProvider, messageProvider, validations={}) {
    // Check identifier
    checkIdentifierArgument(identifier);
    if (!hasFactory(identifier)) throw new Error(`No factory function with identifier ${identifier} registered`);

    const func = getFactory(identifier);

    return func(validations, this, validationProvider, messageProvider);
  }

  /**
   * Check whether the given constructor argument is valid or not.
   * Dirty check at the moment... find a bether solution for this
   *
   * @param  {Function} func factory function
   *
   * @return {Factory} this This instance
   */
  function checkFactoryFunctionArgument(func) {
    // Dirty check for factory function...
    if (_.isNull(func)) throw new Error('Passed identifier must not be null');
    if (_.isUndefined(func)) throw new Error('No factory function passed');
    if (!_.isFunction(func)) throw new Error('Passed factory function must be a function');

    return this;
  }

  /**
   * Check whether the given type argument is valid or not
   *
   * @param  {Mixed} type Type (string/number)
   *
   * @return {Factory} this This instance
   */
  function checkIdentifierArgument(identifier) {
    if (_.isUndefined(identifier)) throw new Error('No identifier passed. Identifier must be either a sting or a number');
    if (_.isNull(identifier)) throw new Error('Passed identifier must not be null');
    if (!_.isString(identifier) && !_.isNumber(identifier)) throw new Error('Passed identifier must be either a sting or a number');

    return this;
  }

  return Object.freeze({
    hasFactory,
    getFactory,
    addFactory,
    replaceFactory,
    removeFactory,
    create,
    checkIdentifierArgument,
    checkFactoryFunctionArgument
  });
}

module.exports = TypeProvider;
