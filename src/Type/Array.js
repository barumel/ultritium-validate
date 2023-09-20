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
    if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type array, function given` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type array, null given` };
    else if (!_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type array, ${typeof value} given` };

    _.forEach(validations, (args, name) => {
      if (_.isPlainObject(args) && _.has(args, 'validations')) {
        const type = typeProvider.create('object', validationProvider, messageProvider, validations);
        _.forEach(value, (item, index) => {
          const valid = type.validate(item);
          if (!_.isEmpty(valid)) {
            result[index] = valid;
          }
        });
      } else {
        value.forEach((item, index) => {
          const valid = validationProvider.validate(item, name, args);
          if (!valid) {
            result[index] = result[index] || {};
            result[index][name] = {
              valid,
              item,
              args,
              message: messageProvider.getMessage(name, { item, args })
            };
          }
        });
      }
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

export default TypeArray;
