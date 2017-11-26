import {createAction} from 'redux-actions'


export const RESET_FORM = 'FORM/reset'
export const CHANGE_VALUE = 'FORM/change_value'
export const SET_ERRORS = 'FORM/set_errors'
export const SET_SUBMITTING = 'FORM/set_submitting'

export const changeFormValue = createAction(
    CHANGE_VALUE,
    (formName, path, value) => ({
        formName,
        path: Array.isArray(path) ? path : [path],
        value,
    })
)

export const resetForm = createAction(
    RESET_FORM,
    (formName, values = null, setPristine = true) => ({
        formName,
        values,
        setPristine,
    })
)

export const setFormErrors = createAction(
    SET_ERRORS,
    (formName, errors, setInvalid = false) => ({
        formName,
        errors,
    })
)

export const setSubmitting = createAction(
    SET_SUBMITTING,
    (formName, submitting = true) => ({
        formName,
        submitting,
    })
)

/**
 * @param {string} formName
 * @param {string[]} fields
 *
 * @return Object
 */
export function generateSimpleFormActions(formName, fields = [], dispatch) {
    const actions = {
        resetForm: (values = null, setPristine = true) => resetForm(formName, values, setPristine),
        setFormErrors: (errors, setInvalid = false) => setFormErrors(errors, setInvalid),
        handleSubmit: (promise) => {
            promise.then(
                (result) => {
                    dispatch(setSubmitting(formName, false))
                    return result
                },
                (error) => {
                    dispatch(setSubmitting(formName, false))
                    throw error
                }
            )

            return setSubmitting(formName, true)
        }
    }
    fields.forEach((field) => {
        const setterName = 'set' + field.charAt(0).toUpperCase() + field.slice(1)
        actions[setterName] = (value) => {
            const val = value.hasOwnProperty('stopPropogation') ? value.target.value : value
            return changeFormValue(formName, [field], val)
        }
    })

    return actions
}
