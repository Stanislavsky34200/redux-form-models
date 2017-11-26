import FloatFormInput from 'formInput/FloatFormInput'

describe('FloatFormInput', () => {
    it('generates new value correctly', () => {
        const input = new FloatFormInput()
        assert.equal(null, input.getNewValue(123, {payload: {value: null}}))
        assert.equal(null, input.getNewValue(123, {payload: {value: ''}}))
        assert.equal(null, input.getNewValue(123, {payload: {value: undefined}}))
        assert.equal(1.1, input.getNewValue(null, {payload: {value: 1.1}}))
        assert.equal(2.2, input.getNewValue(null, {payload: {value: '2.2'}}))
        assert.equal(3.3, input.getNewValue(null, {payload: {value: 3.3}}))
    })
    it('preforms basic validation correctly', () => {
        const input = new FloatFormInput()
        assert.notEqual(null, input.validateBasic({}))
        assert.equal(null, input.validateBasic(null))
        assert.equal(null, input.validateBasic(''))
        assert.equal(null, input.validateBasic(undefined))
        assert.equal(null, input.validateBasic(123.3))
        assert.equal(null, input.validateBasic(123))
    })
})
