import assert from 'assertthat';

import ValidationProvider from '../src/ValidationProvider.js';

describe('Validation tests', () => {
  describe('Test constructor', () => {
    it('Must throw an error if parent argument is provided but not an object', () => {
      assert.that(() => ValidationProvider([])).is.throwing('Passed parent must be an object, array given!');
      assert.that(() => ValidationProvider(() => {})).is.throwing('Passed parent must be an object, function given!');
      assert.that(() => ValidationProvider('foo')).is.throwing('Passed parent must be an object, string given!');
      assert.that(() => ValidationProvider(0)).is.throwing('Passed parent must be an object, number given!');
    });
  });

  describe('Test checkIdentifierArgument method', () => {
    it('Must throw an error if passed identifier is undefined or null', () => {
      const provider = ValidationProvider();
      assert.that(() => provider.checkIdentifierArgument()).is.throwing('Passed identifier must not be undefined or null!');
      assert.that(() => provider.checkIdentifierArgument(null).is.throwing('Passed identifier must not be undefined or null!'));
    });

    it('Must throw an error if passed identifier is not a string o number', () => {
      const provider = ValidationProvider();
      assert.that(() => provider.checkIdentifierArgument({})).is.throwing('Passed identifier must be of type string or number!');
      assert.that(() => provider.checkIdentifierArgument([])).is.throwing('Passed identifier must be of type string or number!');
      assert.that(() => provider.checkIdentifierArgument(() => {})).is.throwing('Passed identifier must be of type string or number!');
    });

    it('Must accept stings and numbers as identifier', () => {
      const provider = ValidationProvider();
      assert.that(provider.checkIdentifierArgument('foo')).is.true();
      assert.that(provider.checkIdentifierArgument(0)).is.true();
    });
  });

  describe('Test checkValidationArgument method', () => {
    it('Must throw an error if passed validation is undefined or null', () => {
      const provider = ValidationProvider();
      assert.that(() => provider.checkValidationArgument()).is.throwing('Passed validation must not be undefined or null!');
      assert.that(() => provider.checkValidationArgument(null)).is.throwing('Passed validation must not be undefined or null!');
    });

    it('Must throw an error if passed validation is not a function', () => {
      const provider = ValidationProvider();
      assert.that(() => provider.checkValidationArgument({})).is.throwing('Passed validation must be a function!');
      assert.that(() => provider.checkValidationArgument([])).is.throwing('Passed validation must be a function!');
      assert.that(() => provider.checkValidationArgument('test')).is.throwing('Passed validation must be a function!');
      assert.that(() => provider.checkValidationArgument(0)).is.throwing('Passed validation must be a function!');
    });

    it('Must accept a function as validation', () => {
      const provider = ValidationProvider();
      assert.that(provider.checkValidationArgument(() => {})).is.true();
    });
  });

  describe('Test add method', () => {
    it('Must throw an error if there is already a validation method with the given identifier', () => {
      const provider = ValidationProvider();
      provider.addValidation('foo', () => {});
      assert.that(() => provider.addValidation('foo', () => {})).is.throwing('Validation with identifier foo already registered!');
    });

    it('Must throw an error if there is no validation registered with the given identifier but passed fallback has a matching method', () => {
      const provider = ValidationProvider({ foo: () => {} });
      assert.that(() => provider.addValidation('foo', () => {})).is.throwing();
    });

    it('Must add the validation to validations', () => {
      const provider = ValidationProvider();
      const foo = () => {};
      provider.addValidation('foo', foo);
      assert.that(provider.getValidation('foo')).is.equalTo(foo);
    });

    it('Must return the same instance of ValidationProvider', () => {
      const provider = ValidationProvider();
      assert.that(provider.addValidation('foo', () => {})).is.equalTo(provider);
    });

  });

  describe('Test remove method', () => {
    it('Must return the same instance of ValidationProvider', () => {
      const provider = ValidationProvider();
      provider.removeValidation('foo');
      assert.that(provider.removeValidation('foo', () => {})).is.equalTo(provider);
    });

    it('Must remove the validation for the given identifier', () => {
      const provider = ValidationProvider();
      const foo = () => {};
      provider.addValidation('foo', foo);
      assert.that(provider.getValidation('foo')).is.equalTo(foo);
      provider.removeValidation('foo');
      assert.that(provider.getValidation('foo')).is.undefined();
    });
  });

  describe('Test has method', () => {
    it ('Must return false if no validation with the given identifier is registered', () => {
      const provider = ValidationProvider();
      assert.that(provider.hasValidation('foo')).is.false();
    });

    it ('Must return true if a validation with the given identifier is registered', () => {
      const provider = ValidationProvider();
      provider.addValidation('foo', () => {});
      assert.that(provider.hasValidation('foo')).is.true();
    });

    it('Must return false if no validation with the given identifier is registered and fallback has no matching method', () => {
      const provider = ValidationProvider();
      assert.that(provider.hasValidation('foo')).is.false();
    });

    it('Must return true if no validation with the given identifier is registered but fallback has a matching method', () => {
      const parent = ValidationProvider();
      parent.addValidation('foo', () => {});
      const provider = ValidationProvider(parent);
      assert.that(provider.hasValidation('foo')).is.true();
    });
  });

  describe('Test get method', () => {
    it('Must return undefined if no validation with the given identifier is registered', () => {
      const provider = ValidationProvider();
      assert.that(provider.getValidation('foo')).is.undefined();
    });

    it('Must return undefined if no validation with the given identifier is registered and fallback has no matching method', () => {
      const parent = ValidationProvider();
      const provider = ValidationProvider(parent);
      assert.that(provider.getValidation('foo')).is.undefined();
    });

    it('Must return the fallback if the there is no validation registered with the given identifier but fallback has a matching methode', () => {
      //const fallback = { foo: (baz) => {} }
      const parent = ValidationProvider();
      parent.addValidation('foo', () => {});
      const provider = ValidationProvider(parent);
      assert.that(provider.getValidation('foo')).is.equalTo(parent.getValidation('foo'));
    });

    it('Must return the validation for the given identifier', () => {
      const provider = ValidationProvider();
      const foo = () => {};
      provider.addValidation('foo', foo);
      assert.that(provider.getValidation('foo')).is.equalTo(foo);
    });
  });

  describe('Test replace method', () => {
    it('Must add the validation even if there is no validation with the given identifier is registered', () => {
      const provider = ValidationProvider({ foo: () => {} });
      const foo = () => {};
      provider.replaceValidation('foo', foo);
      assert.that(provider.getValidation('foo')).is.equalTo(foo);
    });

    it ('Must replace the given validation', () => {
      const provider = ValidationProvider();
      const foo = () => {};
      const bar = (baz) => {};
      provider.addValidation('foo', foo);
      assert.that(provider.getValidation('foo')).is.equalTo(foo);
      provider.replaceValidation('foo', bar);
      assert.that(provider.getValidation('foo')).is.equalTo(bar);
    });

    it('Must add a local validation but must not replace the fallback', () => {
      const foo = () => {}
      const bar = (baz) => {};

      const parent = ValidationProvider();
      parent.addValidation('foo', () => {});

      const provider = ValidationProvider(parent);
      provider.replaceValidation('foo', bar);
      assert.that(provider.getValidation('foo')).is.equalTo(bar);
      assert.that(parent.getValidation('foo')).is.equalTo(foo);
    });

    it('Must return the same instance of ValidationProvider', () => {
      const provider = ValidationProvider();
      assert.that(provider.replaceValidation('foo', () => {})).is.equalTo(provider);
    });
  });


});
