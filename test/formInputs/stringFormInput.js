import StringFormInput from 'formInput/StringFormInput'

describe('StringFormInput', () => {
    it('generates new value correctly', () => {
        const input = new StringFormInput()

        assert.equal(input.getNewValue('123', {payload: {value: null}}), null)
        assert.equal(input.getNewValue('123', {payload: {value: '1234'}}), '1234')
    })
})
