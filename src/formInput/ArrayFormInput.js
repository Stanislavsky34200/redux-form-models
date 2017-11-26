import BaseFormInput from './BaseFormInput'
import {ArrayOperations} from '../actions/arrayActions'


export default class FloatFormInput extends BaseFormInput {

    getNewValue(previousValue, action) {
        const array = (Array.isArray(previousValue) ? previousValue : []).slice()
        const operation = action.payload.operation
        const path = action.payload.path.slice()
        const index = path.shift()

        if (index === undefined) {
            switch (operation) {
                case ArrayOperations.Add:
                    array.push(action.payload.value)

                    return array
                case ArrayOperations.Move:
                    const {aIndex, bIndex} = action.payload
                    const element = array.splice(aIndex, 1).shift()
                    array.splice(bIndex - 1, 0, element)

                    return array
                case ArrayOperations.Swap:
                    const temp = array[action.payload.aIndex]
                    array[action.payload.aIndex] = array[action.payload.bIndex]
                    array[action.payload.bIndex] = temp

                    return array
                case ArrayOperations.Remove:
                    array.splice(action.payload.index, 1)

                    return array
                default:
                    return action.payload.value
            }
        } else {
            const field = path.shift()
            array[index] = {
                ...array[index],
                [field]: this.children[field].getNewValue(array[index][field], {
                    ...action,
                    payload: {
                        ...action.payload,
                        path,
                    },
                }),
            }

            return array
        }
    }

    validateBasic(value) {
        if (value === null || value === undefined) {
            return null
        }

        if (!Array.isArray(value)) {
            return 'Value should be an array'
        }

        const fields = Object.keys(this.children)
        if (fields) {
            const errors = {}
            let errorsCount = 0
            value.forEach((val, index) => {
                fields.forEach((field) => {
                    const fieldVal = val ? val[field] : null
                    const error = this.children[field].validate(fieldVal)

                    if (error) {
                        if (!errors[index]) {
                            errors[index] = {}
                        }
                        errors[index][field] = error
                        errorsCount++
                    }
                })
            })

            if (errorsCount) {
                return errors
            }
        }

        return null
    }
}
