import {
    CHANGE_VALUE,
    RESET_FORM,
    SET_ERRORS,
    SET_SUBMITTING,
    changeFormValue,
    setFormErrors,
    setSubmitting,
    resetForm,
} from 'actions/formActions'


describe('Form standart action creators', () => {
    it('should create change action', () => {
        assert.shallowDeepEqual(changeFormValue('someForm', 'input', 'value'), {
            type: CHANGE_VALUE,
            payload: {
                formName: 'someForm',
                path: ['input'],
                value: 'value',
            }
        })

        assert.shallowDeepEqual(changeFormValue('someForm', ['input', 0], 'value'), {
            type: CHANGE_VALUE,
            payload: {
                formName: 'someForm',
                path:  ['input', 0],
                value: 'value',
            }
        })

    })

    it('should create reset action', () => {
        assert.shallowDeepEqual(resetForm('someForm', {field: 'someValue'}, true), {
            type: RESET_FORM,
            payload: {
                formName: 'someForm',
                values: {field: 'someValue'},
                setPristine: true,
            }
        })
    })

    it('should create set errors action', () => {
        assert.shallowDeepEqual(setFormErrors('someForm', {field: 'error'}), {
            type: SET_ERRORS,
            payload: {
                formName: 'someForm',
                errors: {field: 'error'},
            }
        })
    })

    it('should create submitting acion', () => {
        assert.shallowDeepEqual(setSubmitting('someForm', false), {
            type: SET_SUBMITTING,
            payload: {
                formName: 'someForm',
                submitting: false,
            }
        })
    })
})
