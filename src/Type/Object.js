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
    if (_.isArray(value)) result.type = { valid: false, value, message: `Value must be of type object, array given` };
    else if (_.isFunction(value)) result.type = { valid: false, value, message: `Value must be of type object, function given` };
    else if (_.isNull(value)) result.type = { valid: false, value, message: `Value must be of type object, null given` };
    else if (!_.isObject(value)) result.type = { valid: false, value, message: `Value must be of type object, ${typeof value} given` };

    _.forEach(validations, (validation, key) => {
      // If value is not set but required, add required message and continue with next value.
      // No need to run all validations in this case
      const required = _.isFunction(validation.required)
        ? validation.required({ key, value: value[key], parent: value })
        : validation.required;

      if (_.isUndefined(value[key]) && required) {
        result[key] = { required: { valid: false, value: value[key], message: messageProvider.getMessage('required')} };
        return;
      }

      // If value is defined we always have to validate...
      if (!_.isUndefined(value[key])) {
        // Check the type argument
        // If its a function call it with current key, value and parent object
        const types = _.isFunction(validation.type)
          ? validation.type({ key, value: value[key], parent: value })
          // If its an array, keep it, else create an array with a single type
          : _.isArray(validation.type)
            ? validation.type
            : [validation.type];

        // Validate value for each type
        const results = types.map((t) => {
          const type = typeProvider.create(t, validationProvider, messageProvider, validation.validations);

          return type.validate(value[key]);
        });

        // If at one of the type validations is empty, the value is valid
        const valid = _.some(results, (r) => _.isEmpty(r));

        // If not, merge validation results and concat the validation message
        if (!valid) {
          result[key] = _.merge(...results);

          if (_.has(result[key], 'type')) {
            const message = _.compact(results.map((r) => _.get(r, 'type.message', ''))).join(' OR ');
            _.set(result, `${key}.type.message`, message);
          }

        }
      }

      /*
      const type = typeProvider.create(t, validationProvider, messageProvider, validation.validations);
      if (!_.isUndefined(value[key])) {
        const valid = type.validate(value[key]);
        if (!_.isEmpty(valid)) result[key] = valid;
      }
      */
    });

    return result;
  }

  return Object.freeze({
    ...type,
    validate
  });
}

module.exports = TypeObject;
