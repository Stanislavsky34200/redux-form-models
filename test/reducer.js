import Form from 'formInput/Form'
import Input from 'formInput/BaseFormInput'
import {changeFormValue, resetForm, setSubmitting, setFormErrors} from 'actions/formActions'

import {createFormReducer} from 'reducer'

describe('FormReducer', () => {
    const initialState = {
        submitting: false,
        valid: false,
        pristine: true,
        initialValues: {input: 123},
        values: {input: 123},
        errors: {input: 'error'},
    }

    const reducer = createFormReducer('form', new Form([], {
        input: new Input([(value) => (value ? 'error' : null)]),
    }), {input: 123})

    it('handles initial value correctly', () => {
        assert.shallowDeepEqual(
            reducer(null, {type: 'init...'}),
            initialState
        )
    })
    it('handles reset correctly', () => {

        assert.shallowDeepEqual(
            reducer({...initialState, values: {input: 'not correct value'}}, resetForm('form', null)),
            initialState,
            'empty initial values'
        )
        assert.shallowDeepEqual(
            reducer(initialState, resetForm('form', {input: 0})),
            {
                submitting: false,
                valid: true,
                pristine: true,
                initialValues: {input: 0},
                values: {input: 0},
                errors: {},
            },
            'filled initial values'
        )
    })
    it('handles change value correctly', () => {
        assert.shallowDeepEqual(
            reducer(initialState, changeFormValue('form', 'input', 0)),
            {
                submitting: false,
                valid: true,
                pristine: false,
                initialValues: {input: 123},
                values: {input: 0},
                errors: {},
            },
            'valid value'
        )
        assert.shallowDeepEqual(
            reducer(initialState, changeFormValue('form', 'input', 11)),
            {
                submitting: false,
                valid: false,
                pristine: false,
                initialValues: {input: 123},
                values: {input: 11},
                errors: {input: 'error'},
            },
            'invalid value'
        )
    })
    it('handles set errors correctly', () => {
        assert.shallowDeepEqual(
            reducer(initialState, setFormErrors('form', {'errors': 'lalala'})),
            {
                submitting: false,
                valid: false,
                pristine: true,
                initialValues: {input: 123},
                values: {input: 123},
                errors:  {'errors': 'lalala'},
            }
        )
    })
    it('handles set submitting correctly', () => {
        assert.shallowDeepEqual(
            reducer(initialState, setSubmitting('form', true)),
            {
                ...initialState,
                submitting: true,
            }
        )

    })
})
