import Form from './formInput/Form'
import {CHANGE_VALUE, SET_ERRORS, SET_SUBMITTING, RESET_FORM} from './actions/formActions'


function handleSetErrors(state, errors) {
    return {
        ...state,
        errors,
        valid: false,
    }
}

function handleChange(state, action, form) {
    const values = form.getNewValue(state.values, action)
    const errors = form.validate(values)

    return {
        ...state,
        values,
        errors: errors ? errors : {},
        valid: !errors,
        pristine: false,
    }
}

function handleReset(state, initialValues, form) {
    const values = initialValues ? initialValues : state.initialValues
    const errors = form.validate(values)

    return {
        initialValues: values,
        values,
        errors: errors ? errors : {},
        valid: !errors,
        submitting: false,
        pristine: true,
    }
}

function handleSetSubmitting(state, submitting) {
    return {
        ...state,
        submitting,
    }
}

/**
 * @param {string} formName
 * @param {Form} form
 * @param {Object} initialValues
 */
export function createFormReducer(formName, form, initialValues = {}) {
    /**
     * @param {Object} state
     * @param {boolean} state.valid
     * @param {boolean} state.pristine
     * @param {boolean} state.submitting
     * @param {Object} state.values
     * @param {Object} state.errors
     *
     * @param {Object} action
     * @param {string} action.type
     * @param {string} action.payload.formName
     */
    return (state, action) => {
        if (action.payload && action.payload.formName === formName) {
            switch (action.type) {
                case CHANGE_VALUE:
                    return handleChange(state, action, form)
                case SET_SUBMITTING:
                    return handleSetSubmitting(state, action.payload.submitting)
                case SET_ERRORS:
                    return handleSetErrors(state, action.payload.errors)
                case RESET_FORM:
                    return handleReset(state, action.payload.values, form)
            }
        }

        if (state) {
            return state
        } else {
            const errors = form.validate(initialValues)

            return {
                initialValues,
                values: initialValues,
                valid: !errors,
                errors: errors ? errors : {},
                submitting: false,
                pristine: true,
            }
        }

    }
}
