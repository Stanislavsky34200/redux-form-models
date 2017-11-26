import Form from 'formInput/Form'
import BaseFormInput from 'formInput/BaseFormInput'

import {changeFormValue} from 'actions/formActions'


describe('Form (Input)', () => {
    it('validates correctly', () => {
        let form = new Form([], {
            subform: new Form([], {
                input: new Form([() => 'someInputError'])
            })
        })

        assert.shallowDeepEqual(form.validate({subform: {}}), {
            subform: {
                input: 'someInputError',
            },
        })
    })
    it('changes value correctly', () => {
        let form = new Form([], {
            subform: new Form([], {
                input: new BaseFormInput()
            })
        })

        assert.shallowDeepEqual(
            form.getNewValue({}, changeFormValue('name', ['subform', 'input'], 123)),
            {
                subform: {
                    input: 123,
                },
            }
        )

    })
})
