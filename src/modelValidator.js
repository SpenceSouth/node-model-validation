const validate = (model, referenceModel, onError) => {

    let errors = []

    let result = {
        model: model
    }
    
    if (!model) {
        result.errors = [
            {
                property: 'all',
                type: null,
                message: 'No model to validate'
            }   
        ]
        return result
    }

    for (let key in referenceModel) {
        const prop = referenceModel[key]
        if (prop.isRequired && !model.hasOwnProperty(key)) {
            let err = {
                property: key,
                type: typeof prop.type(),
                message: `Missing required property '${key}' of type ${typeof prop.type()}`,
                isRequired: prop.isRequired
            }
            errors.push(err)
        } else if (prop.type instanceof Array && !(model[key] instanceof Array) && model.hasOwnProperty(key)) {
            let err = {
                property: key,
                type: 'Array',
                message: `Property ${key} was of type ${typeof model[key]}. Expected: Array`,
                isRequired: prop.isRequired
            }
            errors.push(err)
        } else if(prop.type instanceof Array) {
        } else if (typeof prop.type() !== typeof model[key] && model.hasOwnProperty(key)) {
            let err = {
                property: key,
                type: typeof prop.type(),
                message: `Property ${key} was of type ${typeof model[key]}. Expected: ${typeof prop.type()}`,
                isRequired: prop.isRequired
            }
            errors.push(err)
        }
    }

    for (let key in model) {
        if (!referenceModel.hasOwnProperty(key)){
            delete result.model[key]
        }
    }

    if (errors.length !== 0) {
        result.errors = errors

        if (onError) {
            onError(errors)
        }
    }

    return result
}

module.exports = {validate}