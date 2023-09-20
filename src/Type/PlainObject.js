import _ from 'lodash';

import Type from './Type.js';

/**
 * Type Array
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function TypePlainObject(validations, typeProvider, validationProvider, messageProvider) {
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
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type object, array given` };
    else if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type object, function given` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type object, null given` };
    else if (!_.isObject(value)) result.type = { valid: false, value, message: `Value must be of type object, ${typeof value} given` };

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

export default TypePlainObject;
