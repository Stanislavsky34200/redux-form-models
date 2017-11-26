import BaseFormInput from './BaseFormInput'


export default class FloatFormInput extends BaseFormInput {

    getNewValue(previousValue, action) {
        const value = action.payload.value
        if (value === null || value === undefined || value === '') {
            return null
        }

        const val = parseFloat(action.payload.value)
        if (isNaN(val)) {
            return value
        }

        return value
    }

    validateBasic(value) {
        if (value === null || value === undefined || value === '') {
            return null
        }

        if (typeof value === 'number') {
            return null
        }

        return 'Value should be a number'
    }
}
