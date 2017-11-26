import {addElement, removeElement, swapElements, ArrayOperations} from 'actions/arrayActions'
import {CHANGE_VALUE} from 'actions/formActions'



describe('Array inputs action creators', () => {
    it('creates add action', () => {
        assert.shallowDeepEqual(addElement('form name', 'input', 123), {
            type: CHANGE_VALUE,
            payload: {
                formName: 'form name',
                path: ['input'],
                value: 123,
                operation: ArrayOperations.Add,
            }
        })
    })
    it('creates remove action', () => {
        assert.shallowDeepEqual(removeElement('form name', 'input', 123), {
            type: CHANGE_VALUE,
            payload: {
                formName: 'form name',
                path: ['input'],
                index: 123,
                operation: ArrayOperations.Remove,
            }
        })
    })
    it('creates swap action', () => {
        assert.shallowDeepEqual(swapElements('form name', 'input', 1, 2), {
            type: CHANGE_VALUE,
            payload: {
                formName: 'form name',
                path: ['input'],
                aIndex: 1,
                bIndex: 2,
                operation: ArrayOperations.Swap,
            }
        })
    })
})
