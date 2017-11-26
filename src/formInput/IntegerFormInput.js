import BaseFormInput from './BaseFormInput'


export default class IntegerFormInput extends BaseFormInput {

    getNewValue(previousValue, action) {
        const value = action.payload.value
        if (value === null || value === undefined || value === '') {
            return null
        }

        const val = parseInt(action.payload.value, 10)
        if (isNaN(val)) {
            return value
        }

        return val
    }

    validateBasic(value) {
        if (value === null || value === undefined || value === '') {
            return null
        }

        if ((typeof value === 'number') && (value % 1 === 0)) {
            return null
        }

        return 'Value should be an integer number'
    }
}
