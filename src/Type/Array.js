const _ = require('lodash');
const Type = require('./Type');

/**
 * Type Array
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function TypeArray(validations, typeProvider, validationProvider, messageProvider) {
  const type = Type(validations, typeProvider, validationProvider, messageProvider);

  /**
   * Validate the given value and make sure it is an array
   *
   * @param  {Array} value Data to validate
   *
   * @return {}
   */
  function validate(value) {
    const result = {};

    // Type check... array, function and null are of type "object".
    // Because of this, these types get checked explicitly
    if (_.isFunction(value)) result.type = { message: `Value must be of type array, function given.`, value };
    else if (_.isNull(value)) result.type = { message: `Value must be of type array, null given.`, value };
    else if (!_.isArray(value)) result.type = { message: `Value must be of type array, ${typeof value} given.`, value };

    _.forEach(validations, (args, name) => {
      value.forEach(item => result[identifier] = validationProvider.validate(item, name, args));
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeArray;
