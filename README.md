Ultritium Validate
=========================
[![Build Status](https://travis-ci.org/barumel/ultritium-validate.svg?branch=master)](https://travis-ci.org/barumel/ultritium-validate)
[![NPM](https://img.shields.io/npm/v/@ultritium/validate.svg)](https://www.npmjs.org/package/@ultritium/validate)


Validation library for complex objects.

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

#### Parameters
You can pass in additional arguments to the validation function as array. The function will then be called with the value as first argument and

the given params as additional arguments (func.apply).


#### Definition
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

Required can be a function as well. In this case, the funciton gets called with the current key and value as well as the parent object in data structur:
```
required({ key, value, parent })
```

### Available types
Each validation object has a type. There are currently 8 pre-defined types you can use.

You can also add custom types via `getTypeProvider().addFactory(identifier, func)`


**The validation definition differs, depending on the type of the validation.**

In case of primitive types like string, number and boolean (and array of primitives),
the validations object contains the name of the validation function as key and the args to pass to the function as value.


In case of objects / array of objects, the validation definition contains a validation definition for each property of the object or object in array.
Each definition must then have a type and a validations definition for each property of the object to validate.

### Multiple types
The type property can be an array of multiple types.

In case of an array of types, the value will be validated for each type.
If one of the types is valid, the value is considered as valid. If not, the message for the type validation is concatenated.

Be aware that you can not define validations based on value's type. Your validation functions must do this check by itself.

### Dynamic type
The type property can be one of the predefined types from below as well as a function.

In case of a function, the function gets called with the current key, value as well as the parent object from data structure and must return one of the available types.
```
required({ key, value, parent })
```

#### alphanumeric
Checks if the given value is a string or a number and runs each defined validation with the given value

```
const definition = {
  validations: {
    city: {
      type: 'alphanumeric',
      required: true,
      // Object containing validations that should be applied to the given value.
      // Object key is the name of the validation, value the args passed to the validation function
      validations: {
        maxLength: [10]
      }
    }
  }
}
```

#### string
Checks if the given value is a string and runs each defined validation with the given value

```
const definition = {
  validations: {
    city: {
      type: 'string',
      required: true,
      // Object containing validations that should be applied to the given value.
      // Object key is the name of the validation, value the args passed to the validation function
      validations: {
        maxLength: [10]
      }
    }
  }
}
```

#### number
Checks if the given value is a number and runs each defined validation with the given value

```
const definition = {
  validations: {
    city: {
      type: 'number',
      required: true,
      // Object containing validations that should be applied to the given value.
      // Object key is the name of the validation, value the args passed to the validation function
      validations: {
        maxLength: [10]
      }
    }
  }
}
```

#### boolean
Checks if the given value is a boolean and runs each defined validation with the given value

```
const definition = {
  validations: {
    city: {
      type: 'boolean',
      required: true,
      // Object containing validations that should be applied to the given value.
      // Object key is the name of the validation, value the args passed to the validation function
      validations: {
        maxLength: [10]
      }
    }
  }
}
```

#### function
Checks if the given value is a function. As we cannot validate functions, this is a simple type check.

```
const definition = {
  validations: {
    city: {
      type: 'function',
      required: true
    }
  }
}
```

#### object
Type for structured objects. This is actually the entry point for recursion.

Checks if the given value is an object and runs each validation for each defined prop

```
const definition = {
  validations: {
    address: {
      type: 'object',
      required: true,
      // Object containing the structure of the object to validate.
      // Each definition is a validation of another type (can also be object)
      // The definition differs to the definition of primitive types like string, bool etc.
      // as an object containing other validations is expected
      validations: {
        street: {
          type: 'number',
          required: true
        },
        number: {
          type: 'number',
          required: true
        },
      }
    }
  }
}
```

#### plainObject
Checks if the given value is an object and runs each validation with the given value.

This type can be used for unstructured objects. In this case, the whole object is passed to each defined validation.

```
const definition = {
  validations: {
    plain: {
      type: 'plainObject',
      required: true,
      validations: {
        objectValuesMustBeStrings: []
      }
    }
  }
}
```

#### array
Checks if the given value is an array and runs each validation for each value.

This type can validate arrays containing primitive types or object definitions (see examples)

```
const definition = {
  validations: {
    numbers: {
      type: 'array',
      // In this case, the definition follows the same structure as primitives.
      // Each key in "validations" is the name of the validation to apply, value are the args to pass to
      // the validation function
      validations: {
        isNumber: [],
        max: [20]
      }
    },
    objects: {
      type: 'array',
      // In this case, the definition follows the same structure as object.
      // Each key in "validations" is a key in the object to validate.
      // Value is a validation definition for objects
      validations: {
        name: {
          type: 'string',
          required: true,
          validations: {
            minLength: [5]
          }
        },
        age: {
          type: 'number',
          required: true,
          validations: {
            min: [0]
          }
        }
      }
    }
  }
}
```

#### plainArray
Checks if the given value is an array and runs each validation with the given value.

This type can be used for unstructured arrays. In this case, the whole array is passed to each defined validation.

```
const definition = {
  validations: {
    plain: {
      type: 'plainArray',
      required: true,
      validations: {
        minArrayLength: [2]
      }
    }
  }
}
```

### Custom validations
You can add your own validations to the validator or overwrite the default validation from validator.js.
```
validator.getProvider('validation').addValidation('min', (value, min) => value > min);
```

Note that you will have to use ```replaceValidation``` function to overwrite a previously added validation.

If you try to add a validation that was already added, the validation provider will throw an error.

This is to make sure, that you don't overwrite existing validations by accident.

```
validator.getProvider('validation').replaceValidation('min', (value, min) => value > min);
```

### Error Messages
The default message for a failed validation is "The provided value is not valid!".

You can overwrite the default message with your own default message.
```
validator.getProvider('message').setDefaultMessage('Something is wrong...');
```

Or if you need the current params...
```
validator.getProvider('message').setDefaultMessage((params) => `${params.value} is not valid`);
```

#### Per validation
In most cases you want to set custom messages for each validation.

To add you custom error messages, get the message provider from validator and add a message.

The first param is the validation, the second the message to be returned.
```
validator.getProvider('message').addMessage('isLength', 'Min length is 2');
```

In most applications, you want to translate the returned message.

The library does not translate any string, it's on you to do so.

The easiest way is to set the translation identifier as message and translate it in your view.
```
validator.getProvider('message').addMessage('isLength', 'Errors.MinLength');
```

You can also pass in a function as message argument that will be called with the current params.
```
validator.getProvider('message').addMessage('isLength', (params) => `${params.value} is not valid`);
```
