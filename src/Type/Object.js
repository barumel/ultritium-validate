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
function TypeObject(validations, typeProvider, validationProvider, messageProvider) {
  const type = Type(validations, typeProvider, validationProvider, messageProvider);

  /**
   * Validate the given value and make sure it is an object
   *
   * @param  {Object} value Data to validate
   *
   * @return {}
   */
  function validate(value) {
    const result = {};

    // Dirty type check... array, function and null are of type "object".
    // Because of this, these types get checked explicitly
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type object, array given.` };
    else if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type object, function given.` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type object, null given.` };
    else if (!_.isObject(value)) result.type = { valid: false, value, message: `Value must be of type object, ${typeof value} given.` };

    _.forEach(validations, (validation, key) => {
      // If value is not set but required, add required message and continue with next value.
      // No need to run all validations in this case
      if (_.isUndefined(value[key]) && validation.required) {
        result[key] = { required: { valid: false, value: value[key], message: messageProvider.getMessage('required')} };
        return;
      }

      // If value is defined we always have to validate...
      const type = typeProvider.create(validation.type, validationProvider, messageProvider, validation.validations);
      if (!_.isUndefined(value[key])) {
        const valid = type.validate(value[key]);
        if (!_.isEmpty(valid)) result[key] = valid;
      }
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeObject;
