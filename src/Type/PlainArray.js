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
function TypePlainArray(validations, typeProvider, validationProvider, messageProvider) {
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
    if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type array, function given.` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type array, null given.` };
    else if (!_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type array, ${typeof value} given.` };

    _.forEach(validations, (args, name) => {
      const valid = validationProvider.validate(value, name, args);

      if (!valid) {
        result[name] = {
          valid,
          value,
          args,
          message: messageProvider.getMessage(name, { value, args })
        };
      }
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypePlainArray;
