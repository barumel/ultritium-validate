const _ = require('lodash');

function MessageProvider(initialMessages = {}) {
  const messages = new Map(_.map(initialMessages, (message, key) => [key, message]));
  let defaultMessage = 'The provided value is not valid!';

  /**
   * Is there a message for the given identifier
   *
   * @param  {Mixed}  identifier Identifier (string/number)
   *
   * @return {Boolean}            [description]
   */
  function hasMessage(identifier) {
    checkIdentifierArgument(identifier);

    return messages.has(identifier);
  }

  /**
   * Get the message for the given identifier
   *
   * @param  {[type]} identifier [description]
   * @return {[type]}            [description]
   */
  function getMessage(identifier, params = {}) {
    checkIdentifierArgument(identifier);
    let message = this.getDefaultMessage();
    if (hasMessage(identifier)) message = messages.get(identifier);
    if (_.isFunction(message)) message = message(params);

    return message;
  }

  /**
   * Add a new message.
   * Throws an error if a message with the given identifier is already registered.
   * Use replace if you want to replace an existing message.
   *
   * @param {Mixed} identifier Message identifier
   * @param {Mixed} message    Message string/numer or function
   */
  function addMessage(identifier, message) {
    checkIdentifierArgument(identifier);
    checkMessageArgument(message);

    if (messages.has(identifier)) throw new Error(`Message for identifier ${identifier} already registered! Use replace instead...`);
    messages.set(identifier, message);

    return this;
  }

  /**
   * Replace or add the message for the given identifier
   *
   * @param {Mixed} identifier Message identifier
   * @param {Mixed} message    Message string/numer or function
   *
   * @return {[type]}            [description]
   */
  function replaceMessage(identifier, message) {
    checkIdentifierArgument(identifier);
    checkMessageArgument(message);

    messages.set(identifier, message);

    return this;
  }

  function removeMessage(identifier) {
    checkIdentifierArgument(identifier);
    messages.delete(identifier);

    return this;
  }

  /**
   * Get the default message for the given identifier even it was overwritten
   *
   * @return {[type]}            [description]
   */
  function getDefaultMessage() {
    return defaultMessage;
  }

  /**
   * Overwrite the default message
   *
   * @param {[type]} message [description]
   */
  function setDefaultMessage(message) {
    defaultMessage = message;

    return this;
  }

  /**
   * Check the given identifier.
   * It must be a number or string
   *
   * @param  {Mixed} identifier Message identifier
   *
   * @return {[type]}            [description]
   */
  function checkIdentifierArgument(identifier) {
    if (_.isUndefined(identifier) || _.isNull(identifier)) throw new Error('No validation identifier passed to add!');
    if (!_.isString(identifier) && !_.isNumber(identifier)) throw new Error('Passed identifier must be of type string or number!');

    return this;
  }

  /**
   * Check the given message.
   * It must be of type string, number or function which will be called with the following arguments:
   *
   * @param  {Mixed} message Message string/number or functions that returns the message
   *
   * @return {[type]}         [description]
   */
  function checkMessageArgument(message) {
    if (_.isUndefined(message) || _.isNull(message)) throw new Error('No validation message passed to add!');
    if (!_.isString(message) && !_.isFunction(message) && !_.isNumber(message)) throw new Error('Passed message must be of type string, number or function!');
    if (_.isString(message) && _.isEmpty(message)) throw new Error('Passed message must not be empty!');

    return this;
  }

  return Object.freeze({
    hasMessage,
    getMessage,
    addMessage,
    replaceMessage,
    removeMessage,
    getDefaultMessage,
    setDefaultMessage,
    checkIdentifierArgument,
    checkMessageArgument
  });
}


class MessageProvidero {
  constructor(messages = {}) {
    this.messages = messages;
    // Dummy translator that simply returns the given message
    this.translator = {
      translate: (message, language) => message
    };


  }

  getDefaultMessage() {

  }

  add(identifier, message) {
    this.checkIdentifierArgument(identifier);
    this.checkMessageArgument(message);
    if (this.has(identifier)) throw new Error(`Message for identifier ${identifier} already registered!`);

    this.messages[identifier] = message;

    return this;
  }

  has(identifier) {
    const { messages } = this;

    return !_.isUndefined(messages[identifier]);
  }

  get(identifier, field, value) {
    const { messages } = this;
    let message = messages[identifier];
    if (_.isFunction(message)) message = message(field, value);

    return message;
  }

  replace(identifier, message) {
    this.checkIdentifierArgument(identifier);
    this.checkMessageArgument(message);

    this.messages[identifier] = message;

    return this;
  }

  remove(identifier) {
    this.checkIdentifierArgument(identifier);
    delete this.messages[identifier];

    return this;
  }

  setTranslator(translator) {
    if (_.isUndefined(translator) || _.isNull(translator)) throw new Error('No translator passed to setTranslator!');
    if (!_.isObject() || !_.isFunction(translator.translate)) throw new Error('A translator must at least have a translate method!');
    this.translator = translator;

    return this;
  }

  checkIdentifierArgument(identifier) {
    if (_.isUndefined(identifier) || _.isNull(identifier)) throw new Error('No validation identifier passed to add!');
    if (!_.isString(identifier)) throw new Error('Passed identifier must be of type string or number!');

    return this;
  }

  checkMessageArgument(message) {
    if (_.isUndefined(message) || _.isNull(message)) throw new Error('No validation message passed to add!');
    if (!_.isString(message) && !_.isFunction(message) && !_.isNumber(message)) throw new Error('Passed message must be of type string, number or function!');
    if (_.isString(message) && _.isEmpty(message)) throw new Error('Passed message must not be empty!');

    return this;
  }
}

module.exports = MessageProvider;
