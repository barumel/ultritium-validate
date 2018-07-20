const _ = require('lodash');
const Type = require('./Type');

/**
 * Type string
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function TypeString(validations, typeProvider, validationProvider, messageProvider) {
  const type = Type(validations, typeProvider, validationProvider, messageProvider);

  /**
   * Validate the given value and make sure it is a string
   *
   * @param  {String} value Data to validate
   *
   * @return {}
   */
  function validate(value) {
    const result = {};

    // Type check... array, function and null are of type "object".
    // Because of this, these types get checked explicitly
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type string, array given.` };
    else if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type string, function given.` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type string, null given.` };
    else if (!_.isString(value)) result.type = { valid: false, value, message: `Value must be of type string, ${typeof value} given.` };

    _.forEach(validations, (args, name) => {
      const valid = validationProvider.validate(value, name, args);
      if (!valid) result[name] = {
        valid,
        value: value,
        message: messageProvider.getMessage(name, { value })
      };
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeString;
