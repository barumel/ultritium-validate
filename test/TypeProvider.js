import assert from 'assertthat';

import {
  TypeProvider,
  Type
} from '../src/index.js';

function TestType(validation, types) {
  const type = Type(validations, type);

  return Object.freeze({
    ...type
  });
}


describe('Default type provider tests', () => {
  describe('Test checkIdentifierArgument method', () => {
    const provider = TypeProvider();

    it('Must throw an error if method was called whitout an argument or undefined', () => {
      assert.that(() => provider.checkIdentifierArgument()).is.throwing('No identifier passed. Identifier must be either a sting or a number');
      assert.that(() => provider.checkIdentifierArgument(undefined)).is.throwing('No identifier passed. Identifier must be either a sting or a number');
    });

    it('Must throw an error if method was called with null', () => {
      assert.that(() => provider.checkIdentifierArgument(null)).is.throwing('Passed identifier must not be null');
    });

    it('Must throw an error if identifier it not a string or number', () => {
      assert.that(() => provider.checkIdentifierArgument([])).is.throwing('Passed identifier must be either a sting or a number');
      assert.that(() => provider.checkIdentifierArgument({})).is.throwing('Passed identifier must be either a sting or a number');
      assert.that(() => provider.checkIdentifierArgument(() => {})).is.throwing('Passed identifier must be either a sting or a number');
    });
  });

  describe('Test checkFactoryFunctionArgument method', () => {
    const provider = TypeProvider();

    it('Must throw an error if method was called without an argument or undefined', () => {
      assert.that(() => provider.checkFactoryFunctionArgument()).is.throwing('No factory function passed');
      assert.that(() => provider.checkFactoryFunctionArgument(undefined)).is.throwing('No factory function passed');
    });

    it('Must throw an error if func is null', () => {
      assert.that(() => provider.checkFactoryFunctionArgument(null)).is.throwing('Passed identifier must not be null');
    })

    it('Must throw an error if func is not a factory function', () => {
      assert.that(() => provider.checkFactoryFunctionArgument('test')).is.throwing();
      assert.that(() => provider.checkFactoryFunctionArgument(42)).is.throwing();
      assert.that(() => provider.checkFactoryFunctionArgument([])).is.throwing();
      assert.that(() => provider.checkFactoryFunctionArgument({})).is.throwing();
    });

    it('Must return own instance if identifier is a valid identifier', () => {
      assert.that(provider.checkIdentifierArgument('test', () => {})).is.equalTo(provider);
      assert.that(provider.checkIdentifierArgument('test', () => {})).is.equalTo(provider);
    });
  });

  describe('Test addFactory method', () => {
    const provider = TypeProvider();

    it('Must throw an error if method gets called with an existing identifier', () => {
      assert.that(() => provider.addFactory('string', () => {})).is.throwing('Factory function with identifier string already registered');
      assert.that(() => provider.addFactory('number', () => {})).is.throwing('Factory function with identifier number already registered');
      assert.that(() => provider.addFactory('object', () => {})).is.throwing('Factory function with identifier object already registered');
      assert.that(() => provider.addFactory('array', () => {})).is.throwing('Factory function with identifier array already registered');
    });

    it('Must add the passed factory function to factories', () => {
      provider.addFactory('test', Type);
      assert.that(provider.hasFactory('test')).is.true();
    });
  });

  describe('Test replace factory function', () => {
    it('Must replace an exsiting factory function', () => {
      const provider = TypeProvider();
      provider.addFactory('test', Type);
      assert.that(provider.getFactory('test')).is.equalTo(Type);

      provider.replaceFactory('test', TestType);
      assert.that(provider.getFactory('test')).is.equalTo(TestType);
    });

    it('Must add a new factory function if it doesn not exist', () => {
      const provider = TypeProvider();
      provider.replaceFactory('test', Type);
      assert.that(provider.getFactory('test')).is.equalTo(Type);
    });
  });

  describe('Test removeFactory method', () => {
    const provider = TypeProvider();

    it('Must remove the given factory function from factories', () => {
      provider.addFactory('test', Type);
      assert.that(provider.hasFactory('test')).is.true();

      provider.removeFactory('test');
      assert.that(provider.hasFactory('test')).is.false();
    });
  });
});
