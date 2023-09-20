import _ from 'lodash';

import Type from './Type.js';

/**
 * Type string
 *
 * @param {Object} validations Validation deinition
 * @param {Object} types       Type factory
 *
 * @return {Object}
 */
function TypeFunction(validations, typeProvider, validationProvider, messageProvider) {
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
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type string, array given` };
    else if (_.isString(value)) result.type = { valid: false, value, message: `Value must be of type function, string given` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type string, null given` };
    else if (!_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type string, ${typeof value} given` };

    // Nothing to do here as we cannot validate functions

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

export default TypeFunction;
