const TestModel = {
  firstName: {
    type: String,
    isRequired: true
  },
  lastName: {
    type: String,
    isRequired: true
  },
  email: {
    type: String,
    isRequired: true
  },
  randomInteger: {
    type: Number,
    isRequired: true
  },
  notRequiredField: {
    type: Number,
    isRequired: false
  },
  requiredArray: {
    type: Array,
    isRequired: true
  }
}

module.exports = TestModel