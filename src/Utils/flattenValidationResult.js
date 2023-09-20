import _ from 'lodash';

function flattenValidationResult(validations) {
  let messages = [];

  _.forEach(validations, (validation, key) => {
    messages = [ ...messages, ...flattenValidation(validation, key) ];
  });

  return _.flattenDeep(messages);
}

/**
 * Flatten the given validation
 *
 * @param  {[type]} validation [description]
 * @return {[type]}            [description]
 */
function flattenValidation(validation, key) {
  const { valid, message, value, args } = validation
  let messages = [];

  if (_.has(validation, 'message')) messages.push({ key, valid, message, value, args });

  _.forEach(validation, (v, k) => {
    if (_.isObject(v)) messages = [ ...messages, ...flattenValidation(v, k)];
  });

  return _.flattenDeep(messages);
}


export default flattenValidationResult;
