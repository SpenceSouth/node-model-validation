const TestModel = require('../models/testModel')
const {validate} = require('../../src/modelValidator')

const badModel = {
    firstName: 'Gary',
    lastName: 'Frasier',
    email: 'no@email.com'
}

const result = validate(badModel, TestModel)
console.log(result)