Ultritium Validate
=========================
[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]


[build-badge]: https://img.shields.io/travis/barumel/ultritium-validate/master.png?style=flat-square
[build]: https://travis-ci.org/barumel/ultritium-validate

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/@ultritium/validate

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/barumel/ultritium-validate

Validation library for complex objects.

WARNING: This is still an early version. Bugs are included for free...


## Installation
### NPM
```
npm install --save @ultritium/validate
```

### YARN
```
yarn add @ultritium/validate
```

## Basic usage
### DefaultValidator
The easiest way to get started is to use the DefaultValidator provided by this package.

It uses [`validator.js`](https://github.com/chriso/validator.js) behind the scenes, so you can use all validations provided by this lib.

```
import { DefaultValidator } from '@ultritium/validate';

const validator = DefaultValidator();
```

### Validation definition
The validation definition is an object containing a set of validations to be applied to the given data.

A simple validation definition can look like this:
```
const validationDefinition = {
  validations: {
    street: {
      type: 'number',
      required: true
    },
    number: {
      type: 'number',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    zip: {
      type: 'number',
      required: true,
      validations: {
        isLength: [{ min: 4 }]
      }
    }
  }
};

validator.validate(validationDefinition, myData);
```

### Complex data structure
The validator can also validate nested object. Simply pass in the definition as validations.
```
const validationDefinition = {
  validations: {
    address: {
      type: 'object',
      required: true,
      validations: {
        street: {
          type: 'number',
          required: true
        },
        number: {
          type: 'number',
          required: true
        },
        city: {
          type: 'string',
          required: true
        },
        zip: {
          type: 'number',
          required: true,
          validations: {
            isLength: [{ min: 4 }]
          }
        }
      }
    }
  }
}

validator.validate(validationDefinition, myData);
```

#### Required fields
If a property is required ```required: true``` the validator will return an error if the property is not set.

If the property is not required but a value was passed and validations are defined, the validations will be applied as well.

### Custom validations
You can add your own validations to the validator or overwrite the default validation from validator.js.
```
validator.getProvider('validation')
  .addValidation('min', (value, min) => value > min);
```

Note that you will have to use ```replaceValidation``` function to overwrite a previously added validation.

If you try to add a validation that was already added, the validation provider will throw an error.

This is to make sure, that you don't overwrite existing validations by accident.

```
validator.getProvider('validation')
  .replaceValidation('min', (value, min) => value > min);
```

### Error Messages
The default message for a failed validation is "The provided value is not valid!".

You can overwrite the default message with your own default message.
```
validator.getProvider('message')
  .setDefaultMessage('Something is wrong...');
```

Or if you need the current params...
```
validator.getProvider('message')
  .setDefaultMessage('isLength', (params) => `${params.value} is not valid`);
```

#### Per validation
In most cases you want to set custom messages for each validation.

To add you custom error messages, get the message provider from validator and add a message.

The first param is the validation, the second the message to be returned.
```
validator.getProvider('message')
  .addMessage('isLength', 'Min length is 2');
```

In most applications, you want to translate the returned message.

The library does not translate any string, it's on you to do so.

The easiest way is to set the translation identifier as message and translate it in your view.
```
validator.getProvider('message')
  .addMessage('isLength', 'Errors.MinLength');
```

You can also pass in a function as message argument that will be called with the current params.
```
validator.getProvider('message')
  .addMessage('isLength', (params) => `${params.value} is not valid`);
```
