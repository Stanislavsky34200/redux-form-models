export default class BaseFormInput {
    constructor(validators = [], chidlren = {}, options = {}) {
        this.validators = validators
        this.options = options
        this.children = chidlren
    }

    validate(value) {
        const basicErrors = this.validateBasic(value)
        if (basicErrors) {
            return basicErrors
        }

        for (let i = 0; i < this.validators.length; i++) {
            const error = this.validators[i](value)
            if (error) {
                return error
            }
        }

        return null
    }

    getNewValue(previousValue, action) {
        return action.payload.value
    }

    validateBasic(value) {
        return null
    }
}
