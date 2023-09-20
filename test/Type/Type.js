import assert from 'assertthat';

import Type from '../../src/Type/Type.js';

describe('Type proto tests', () => {
  describe('Constructor tests', () => {
    it('Must throw an error if no validations were passed to the constructor', () => {
      assert.that(() => {
        const validation = Type();
      }).is.throwing('No validations passed to constructor');
    });


    it('Must throw an error if passed validations is not an object', () => {
      assert.that(() => {
        const type = Type(() => {});
      }).is.throwing('Passed validations must be an object');

      assert.that(() => {
        const type = Type([])
      }).is.throwing('Passed validations must be an object');

      assert.that(() => {
        const type = Type('foo');
      }).is.throwing('Passed validations must be an object');

      assert.that(() => {
        const type = Type(42);
      }).is.throwing('Passed validations must be an object');
    });


    it('Must throw an error if no type provider was passed to the constructor', () => {
      assert.that(() => {
        const type = Type({});
      }).is.throwing('No type provider passed to Type');

      assert.that(() => {
        const type = Type({}, null);
      }).is.throwing('No type provider passed to Type');
    });


    it('Must throw an error if passed type provider is not an object', () => {
      assert.that(() => {
        const type = Type({}, () => {})
      }).is.throwing('Passed type provider must be an object');

      assert.that(() => {
        const type = Type({}, 'test');
      }).is.throwing('Passed type provider must be an object');

      assert.that(() => {
        const type = Type({}, 42);
      }).is.throwing('Passed type provider must be an object');

      assert.that(() => {
        const type = Type({}, []);
      }).is.throwing('Passed type provider must be an object');
    });

    it('Must throw an error if no validation provider was passed to the constructor', () => {
      assert.that(() => {
        const type = Type({}, {});
      }).is.throwing('No validation provider passed to Type');

      assert.that(() => {
        const type = Type({}, {}, null);
      }).is.throwing('No validation provider passed to Type');
    });

    it('Must throw an error if passed validation provider is not an object', () => {
      assert.that(() => {
        const type = Type({}, {}, () => {})
      }).is.throwing('Passed validation provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, 'test');
      }).is.throwing('Passed validation provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, 42);
      }).is.throwing('Passed validation provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, []);
      }).is.throwing('Passed validation provider must be an object');
    });

    it('Must throw an error if no message provider was passed to the constructor', () => {
      assert.that(() => {
        const type = Type({}, {}, {});
      }).is.throwing('No message provider passed to Type');

      assert.that(() => {
        const type = Type({}, {}, {}, null);
      }).is.throwing('No message provider passed to Type');
    });

    it('Must throw an error if passed message provider is not an object', () => {
      assert.that(() => {
        const type = Type({}, {}, {}, () => {})
      }).is.throwing('Passed message provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, {}, 'test');
      }).is.throwing('Passed message provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, {}, 42);
      }).is.throwing('Passed message provider must be an object');

      assert.that(() => {
        const type = Type({}, {}, {}, []);
      }).is.throwing('Passed message provider must be an object');
    });

  });

  describe('Test validate method', () => {
    it('Must throw an error that validate method must be implemented by each validation', () => {
      assert.that(() => {
        const type = Type({}, {}, {}, {});
        type.validate();
      }).is.throwing('Each validator must implement a validate method');
    });
  });
});
