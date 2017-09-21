const TestModel = require('../models/testModel')
const {validate} = require('../../src/modelValidator')

const badModel = {
    firstName: 'Gary',
    lastName: 'Frasier',
    email: 'no@email.com'
}

const result = validate(badModel, TestModel)
console.log(result)

{ 
    model: 
    { 
        firstName: 'John',
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