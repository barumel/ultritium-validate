const _ = require('lodash');
const Type = require('./Type');

/**
 * Type Number
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function TypeNumber(validations, typeProvider, validationProvider, messageProvider) {
  const type = Type(validations, typeProvider, validationProvider, messageProvider);

  /**
   * Validate the given value and make sure it is a number
   *
   * @param  {Number} value Data to validate
   *
   * @return {}
   */
  function validate(value) {
    const result = {};

    // Type check... array, function and null are of type "object".
    // Because of this, these types get checked explicitly
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type number, array given.` };
    else if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type number, function given.` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type number, null given.` };
    else if (!_.isNumber(value)) result.type = { valid: false, value, message: `Value must be of type number, ${typeof value} given.` };

    _.forEach(validations, (args, name) => {
      const valid = validationProvider.validate(value, name, args);
      if (!valid) result[name] = {
        valid,
        value,
        args,
        message: messageProvider.getMessage(name, { value, args })
      };
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeNumber;
