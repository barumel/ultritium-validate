const _ = require('lodash');

function ValidationProvider(parent) {
  if (_.isArray(parent)) throw new Error('Passed parent must be an object, array given!');
  if (_.isFunction(parent)) throw new Error('Passed parent must be an object, function given!');
  if (!_.isUndefined(parent) && !_.isObject(parent)) throw new Error(`Passed parent must be an object, ${typeof parent} given!`);

  const validations = new Map();

  /**
   * Is there a validation for the given identifier
   *
   * @param  {Mixed} identifier Validation identifier
   *
   * @return {Boolean}            [description]
   */
  function hasValidation(identifier) {
    checkIdentifierArgument(identifier);

    return (validations.has(identifier) || (!_.isUndefined(parent) && parent.hasValidation(identifier)));
  }

  /**
   * Get the validation function for the given identifier
   *
   * @return {Function} func Validation function
   */
  function getValidation(identifier) {
    checkIdentifierArgument(identifier);

    let validation;
    if (validations.has(identifier)) {
      validation = validations.get(identifier);
    } else if (!_.isUndefined(parent) && parent.hasValidation(identifier)) {
      validation = parent.getValidation(identifier);
    }

    return validation;
  }

  /**
   * Add a new validation function.
   * Throws an error if there is already a validation for the given identifier;
   *
   * @param {Mixed}    identifier Identifier (string or number)
   * @param {Function} func       Validation function
   *
   * @return {ValidationProvider} this This instance
   */
  function addValidation(identifier, func) {
    checkIdentifierArgument(identifier);
    checkValidationArgument(func);

    if (validations.has(identifier) || (!_.isUndefined(parent) && parent.hasValidation(identifier))) {
      throw new Error(`Validation with identifier ${identifier} already registered!`);
    }

    validations.set(identifier, func);

    return this;
  }

  /**
   * Replacea  validation function even the parent has a validation function for the given identifier
   *
   * @param {Mixed}    identifier Identifier (string or number)
   * @param {Function} func       Validation function
   *
   * @return {ValidationProvider} this This instance
   */
  function replaceValidation(identifier, func) {
    checkIdentifierArgument(identifier);
    checkValidationArgument(func);

    validations.set(identifier, func);

    return this;
  }

  function removeValidation(identifier) {
    checkIdentifierArgument(identifier);
    validations.delete(identifier);

    return this;
  }

  function validate(value, identifier, args) {
    if (!hasValidation(identifier) && !_.isUndefined(parent)) return parent.validate(value, identifier, args);
    const func = getValidation(identifier);
    if (_.isUndefined(func)) throw new Error(`No validation method "${identifier}" registered!`);

    return func.apply(this, [ value, ...args ]);
  }

  /**
   * [checkIdentifierArgument description]
   * @param  {[type]} identifier [description]
   * @return {[type]}            [description]
   */
  function checkIdentifierArgument(identifier) {
    if (_.isUndefined(identifier) || _.isNull(identifier)) throw new Error('Passed identifier must not be undefined or null!');
    if (!_.isString(identifier) && !_.isNumber(identifier)) throw new Error('Passed identifier must be of type string or number!');

    return true;
  }

  /**
   * [checkValidationArgument description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  function checkValidationArgument(func) {
    if (_.isUndefined(func) || _.isNull(func)) throw new Error('Passed validation must not be undefined or null!');
    if (!_.isFunction(func)) throw new Error('Passed validation must be a function!');

    return true;
  }

  return Object.freeze({
    hasValidation,
    getValidation,
    addValidation,
    replaceValidation,
    removeValidation,
    checkIdentifierArgument,
    checkValidationArgument,
    validate
  });
}

module.exports = ValidationProvider;
