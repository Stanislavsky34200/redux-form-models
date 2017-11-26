import BaseFormInput from './BaseFormInput'


export default class FloatFormInput extends BaseFormInput {

    getNewValue(previousValue, action) {
        if (action.payload.value === null || action.payload.value === undefined) {
            return null
        }

        return !!action.payload.value
    }

    validateBasic(value) {
        if (value === null || typeof value === 'boolean') {
            return null
        }

        return 'Value should be a boolean'
    }
}
