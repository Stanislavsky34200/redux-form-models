import BaseFormInput from './BaseFormInput'


export default class Form extends BaseFormInput {
    getNewValue(previousValue, action) {
        const newAction = {...action}
        const {path, value} = newAction.payload
        const field = path.shift()

        return field
            ? {
                ...previousValue,
                [field]: this.children[field].getNewValue(previousValue ? previousValue[field] : null, newAction),
            }
            : value
    }

    validateBasic(value) {
        const val = value ? value : {}
        const errors = {}
        let errorsCount = 0

        Object.keys(this.children).forEach(field => {
            if (this.children[field]) {
                const error = this.children[field].validate(val[field])
                if (error) {
                    errorsCount++;
                    errors[field] = error;
                }
            }
        })

        return errorsCount ? errors : null;
    }
}
