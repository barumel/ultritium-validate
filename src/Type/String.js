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
    if (_.isArray(value)) result.type = { message: `Value must be of type string, array given.`, value };
    else if (_.isFunction(value)) result.type = { message: `Value must be of type string, function given.`, value };
    else if (_.isNull(value)) result.type = { message: `Value must be of type string, null given.`, value };
    else if (!_.isString(value)) result.type = { message: `Value must be of type string, ${typeof value} given.`, value };

    _.forEach(validations, (args, name) => {
      result[identifier] = validationProvider.validate(value, name, args);
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeString;
