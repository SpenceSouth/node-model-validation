const {validate} = require('../src/modelValidator')

describe('modelValidator', () => {
    it('should pass basic validation', () => {
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
            }
        }
        
        const goodModel = {
            firstName: 'John',
            lastName: 'Smith',
            age: 27
        }

        const result = validate(goodModel, referenceModel)
        expect(result.errors).toBe(undefined)
        expect(result.model).toEqual(goodModel)
    })

    it('should fail Number type validation', () => {
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
            }
        }
        
        const badModel = {
            firstName: 'John',
            lastName: 'Smith',
            age: 'Twenty seven'
        }

        const expectedErr = [ 
            { 
                property: 'age',
                type: 'number',
                message: 'Property age was of type string. Expected: number',
                isRequired: true 
            } 
        ]

        const result = validate(badModel, referenceModel)
        expect(result.errors).toEqual(expectedErr)
        expect(result.model).toEqual(badModel)
    })

    it('should allow non-required property to pass on a model missing the property', () => {
        const goodModel = {
            firstName: 'John',
            lastName: 'Smith'
        }

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
                isRequired: false
            }
        }

        const result = validate(goodModel, referenceModel)
        expect(result.errors).toBe(undefined)
        expect(result.model).toBe(goodModel)
    })

    it('should catch missing required property', () => {
        const badModel = {
            firstName: 'John',
            lastName: 'Smith'
        }

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
            }
        }

        const expectedErr = [ 
            { 
                property: 'age',
                type: 'number',
                message: 'Missing required property \'age\' of type number',
                isRequired: true 
            } 
        ]

        const result = validate(badModel, referenceModel)
        expect(result.errors).toEqual(expectedErr)
    })
    
    it('should error out because of an undefined model', () => {
        const badModel = undefined

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
            }
        }

        const expectedErr = [
            {
                property: 'all',
                type: null,
                message: 'No model to validate'
            }   
        ]

        const result = validate(badModel, referenceModel)
        expect(result.errors).toEqual(expectedErr)
    })

    it('should successfully strip out properties not defined in the reference model', () => {
        const goodModel = {
            firstName: 'John',
            lastName: 'Smith',
            favoriteFood: 'steak'
        }

        const expectedModel = {
            firstName: 'John',
            lastName: 'Smith'
        }

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
                isRequired: false
            }
        }

        const result = validate(goodModel, referenceModel)
        expect(result.model).toEqual(expectedModel)
    })

    it('should call callback function', done => {

        expect.assertions(2)

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
            favoriteFood: {
                type: String,
                isRequired: true
            }
        }
        
        const goodModel = {
            firstName: 'John',
            lastName: 'Smith',
            age: 27
        }

        const result = validate(goodModel, referenceModel, (err) => {
            expect(err).toBeTruthy()
            done()
        })

        expect(result.model).toEqual(goodModel)
    })

    it('should fail because prop is not instance of array', () => {
        const referenceModel = {
            list: {
                type: [],
                isRequired: true
            }
        }

        const badModel = {
            list: {}
        }

        const expectedErr = [ 
            { 
                property: 'list',
                type: 'Array',
                message: 'Property list was of type object. Expected: Array',
                isRequired: true 
            } 
        ]

        const result = validate(badModel, referenceModel)
        expect(result.errors).toEqual(expectedErr)
    })
    
    it('should pass because prop is an instance of array', () => {
        const referenceModel = {
            list: {
                type: [],
                isRequired: true
            }
        }

        const goodModel = {
            list: []
        }

        const result = validate(goodModel, referenceModel)
        expect(result.errors).toBe(undefined)
    })
    
    it('should fail because prop is an instance of array and model supplies String', () => {
        const referenceModel = {
            list: {
                type: [],
                isRequired: true
            }
        }

        const badModel = {
            list: 'yes'
        }

        const result = validate(badModel, referenceModel)
        expect(result.errors).toBeTruthy()
    })
    
    it('should pass because instance of array is not required', () => {
        const referenceModel = {
            firstName: {
                type: String,
                isRequired: true
            },
            list: {
                type: [],
                isRequired: false
            }
        }

        const goodModel = {
            firstName: 'John'
        }

        const result = validate(goodModel, referenceModel)
        expect(result.errors).toBe(undefined)
    })
})