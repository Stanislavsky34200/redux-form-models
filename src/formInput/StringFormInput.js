import BaseFormInput from './BaseFormInput'


export default class StringFormInput extends BaseFormInput {
    getNewValue(previousValue, action) {
        return action.payload.value ? action.payload.value.toString() : action.payload.value
    }
}
