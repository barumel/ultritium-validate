const assert = require('assertthat');

const MessageProvider = require('../src/MessageProvider');

describe('MessageProvider tests', () => {
  describe('Constructor tests', () => {

  });

  describe('Test default messages', () => {
    const provider = MessageProvider();
    it('Must return the defult message', () => {
      assert.that(provider.getDefaultMessage()).is.equalTo('The provided value is not valid!');
    });

    it('Must return the overwritten default message', () => {
      provider.setDefaultMessage('FOO');
      assert.that(provider.getDefaultMessage()).is.equalTo('FOO');
    });
  });

  describe('Test checkIdentifierArgument method', () => {
    it('Must throw an error if no identifier (or null) was passed to add method', () => {
      const provider = MessageProvider();
      assert.that(() => provider.checkIdentifierArgument()).is.throwing('No validation identifier passed to add!');
      assert.that(() => provider.checkIdentifierArgument(null)).is.throwing('No validation identifier passed to add!');
    });

    it('Must throw an error if passed identifier is not a string or number', () => {
      const provider = MessageProvider();
      assert.that(() => provider.checkIdentifierArgument([])).is.throwing('Passed identifier must be of type string or number!');
      assert.that(() => provider.checkIdentifierArgument({})).is.throwing('Passed identifier must be of type string or number!');
      assert.that(() => provider.checkIdentifierArgument(() => {})).is.throwing('Passed identifier must be of type string or number!');
    });

    it('Must accept numbers and strings as identifier', () => {
      const provider = MessageProvider();
      assert.that(() => provider.addMessage('foo', 'bar'));
      assert.that(() => provider.addMessage(1, 'bar'));
    });
  });

  describe('Test checkMessageArgument method', () => {
    it('Must throw an error if no message was passed to add method', () => {
      const provider = MessageProvider();
      assert.that(() => provider.addMessage('test')).is.throwing('No validation message passed to add!');
      assert.that(() => provider.addMessage('test', null)).is.throwing('No validation message passed to add!');
    });

    it ('Must throw an error if passed message is not a string', () => {
      const provider = MessageProvider();
      assert.that(() => provider.addMessage('test', [])).is.throwing('Passed message must be of type string, number or function!');
      assert.that(() => provider.addMessage('test', {})).is.throwing('Passed message must be of type string, number or function!');
    });

    it('Must throw an error if passed message is empty', () => {
      const provider = MessageProvider();
      assert.that(() => provider.addMessage('test', '')).is.throwing('Passed message must not be empty!');
    });

    it('Must accept numbers, strings and functions as message', () => {
      const provider = MessageProvider();
      assert.that(provider.addMessage('foo', 'bar')).is.equalTo(provider);
      assert.that(provider.addMessage('bar', 42)).is.equalTo(provider);
      assert.that(provider.addMessage('baz', () => {} )).is.equalTo(provider);
    });
  });

  describe('Test add method', () => {
    it('Must throw an error if passed identifier is already registered', () => {
      const provider = MessageProvider();
      provider.addMessage('foo', 'bar');
      assert.that(() => provider.addMessage('foo', 'baz')).is.throwing('Message for identifier foo already registered! Use replace instead...');
    });
  });

  describe('Test has method', () => {
    it('Must return false if no message for the given identifier is registered', () => {
      const provider = MessageProvider();
      assert.that(provider.hasMessage('test')).is.false();
    });

    it('Must restur true if a message is registered for the given identifier', () => {
      const provider = MessageProvider();
      provider.addMessage('foo', 'bar');
      assert.that(provider.hasMessage('foo')).is.true();
    });
  });

  describe('Test get method', () => {
    it('Must return the correct message if message is a string', () => {
      const provider = MessageProvider();
      provider.addMessage('foo', 'bar');
      assert.that(provider.getMessage('foo')).is.equalTo('bar');
    });

    it('Must return the correct message if message is a function', () => {
      const provider = MessageProvider();
      const func = (params) => `Field ${params.field} is not ${params.value}`;
      provider.addMessage('foo', func);
      assert.that(provider.getMessage('foo', { field: 'bar', value: 'baz' })).is.equalTo('Field bar is not baz')
    });
  });

  describe('Test replace method', () => {
    it('', () => {
      const provider = MessageProvider();
    });

    it('Must add the message even there is no registered message for this identifier', () => {
      const provider = MessageProvider();
      provider.replaceMessage('foo', 'bar');
      assert.that(provider.getMessage('foo')).is.equalTo('bar');
    });

    it('Must replace the message for the given identifier', () => {
      const provider = MessageProvider();
      provider.addMessage('foo', 'bar');
      provider.replaceMessage('foo', 'baz');
      assert.that(provider.getMessage('foo')).is.equalTo('baz');
    });
  });

  describe('Test remove method', () => {
    it('Must remove the message for the given identifier', () => {
      const provider = MessageProvider();
      provider.addMessage('foo', 'bar');
      assert.that(provider.hasMessage('foo')).is.true();

      provider.removeMessage('foo');
      assert.that(provider.hasMessage('foo')).is.false();
    });
  });
});
