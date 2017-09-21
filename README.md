
# Node Model Validation - Simplified Model Validator

[![npm package](https://nodei.co/npm/node-model-validation.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-model-validation/)

## Installation
```
npm install node-model-validation --save
```

## Usage

node-model-validation makes it super easy and simple to validate any javascript model and requires no additional dependencies.

```js
const {validate} = require('node-model-validation')

const referenceModel = {
  firstName: {
    type: String,
    isRequired: true
  },
  lastName: {
    type: String,
    isRequired: true
  },
  age: {
    type: Number,
    isRequired: true
  },
  favoriteFoods: {
    type: [],
    isRequired: true
  },
}

const sampleModel = {
  firstName: 'John',
  lastName: 'Smith',
  age: 27,
  favoriteFoods: [],
  misc: 'random'
}

let result = validate(sampleModel, referenceModel)

```

`validate` returns an object with two properties `model` and `errors`.  Example:

```js
console.log(result)
```

The model validation above outputs:
```js
{
  model: {
    firstName: 'John',
    lastName: 'Smith',
    age: 27,
    favoriteFoods: []
  }
}
```

The sample model validates without any errors and the misc field has been removed from the returned model.  Since `misc` was not defined in the referenceModel it is deemed erroneous and unneeded and can simply be removed from the model undergoing valdation without any errors.

## Error output

If we can change the sampleModel in the first example to:

```js
const sampleModel = {
  firstName: 'John',
  lastName: 'Smith',
  age: 'twenty seven',
  favoriteFoods: []
}
```

We now have a condition where we were expecting a number for the age value, but instead we have a String value.  When this validates it will return the result below:

```js

{ 
  model: 
  { 
      firstName: 'John'
      lastName: 'Smith',
      age: 'twenty seven',
      favoriteFoods: [] 
  },
  errors: 
  [ 
    { 
      property: 'age',
      type: 'number',
      message: 'Property age was of type string. Expected: number',
      isRequired: true 
    } 
  ] 
}
```

The property that offends the referenceModel is referenced in the errors array with the appropriate property attributes and a concise validation error message.

## Supported types

* String
* Number
* Boolean
* {}
* []
