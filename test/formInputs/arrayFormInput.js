import ArrayFormInput from 'formInput/ArrayFormInput'
import BaseFormInput from 'formInput/BaseFormInput'
import {removeElement, addElement, swapElements, moveElement} from 'actions/arrayActions'
import {changeFormValue} from 'actions/formActions'


describe('ArrayFormInput', () => {
    it('changes value correctly (scalar)', () => {
        const input = new ArrayFormInput()

        assert.shallowDeepEqual(
            [1, 2, 3],
            input.getNewValue([], changeFormValue('form', [], [1, 2, 3]))
        )
    })
    it('changes value correctly (with children)', () => {
        const input = new ArrayFormInput([], {
            input: new BaseFormInput(),
        })
        assert.shallowDeepEqual(
            [{}, {input: '123'}],
            input.getNewValue(
                [{}, {}],
                changeFormValue('form', [1, 'input'], '123')
            )
        )
    })
    it('adds element', () => {
        const input = new ArrayFormInput()
        assert.shallowDeepEqual(
            [1, 2, 3],
            input.getNewValue([1, 2], addElement('form', [], 3))
        )
    })
    it('swaps elements', () => {
        const input = new ArrayFormInput()
        assert.shallowDeepEqual(
            [3, 2, 1],
            input.getNewValue([1, 2, 3], swapElements('form', [], 0, 2))
        )
    })
    it('moves element', () => {
        const input = new ArrayFormInput()
        assert.shallowDeepEqual(
            [1, 2, 3, 4],
            input.getNewValue([1, 4, 2, 3], moveElement('form', [], 1, 4))
        )
    })
    it('removes elements', () => {
        const input = new ArrayFormInput()
        assert.shallowDeepEqual(
            [1, 3],
            input.getNewValue([1, 2, 3], removeElement('form', [], 1))
        )
    })
    it('validates correctly (scalar)', () => {
        const input = new ArrayFormInput([(value) => value && !value.length ? 'error' : null])
        assert.equal(input.validate([1, 2], null))
        assert.equal(input.validate([]), 'error')

        assert.notEqual(input.validate({}), null)
        assert.equal(input.validate(null), null)
        assert.equal(input.validate(undefined), null)
    })
    it('validates correctly (with children)', () => {
        const input = new ArrayFormInput(
            [(value) => value && !value.length ? {length: 'error1'} : null],
            {input: new BaseFormInput([(value) => value ? null : 'error2'])}
        )

        assert.equal(null, input.validate([{input: true}]))
        assert.shallowDeepEqual({length: 'error1'}, input.validate([]))
        assert.shallowDeepEqual({[1]: {input: 'error2'}}, input.validate([{input: true}, {input: false}]))
    })
})
