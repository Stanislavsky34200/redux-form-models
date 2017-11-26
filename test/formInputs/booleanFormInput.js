import BooleanFormInput from 'formInput/BooleanFormInput'


describe('BooleanFormInput', () => {
    it('generates new value correctly', () => {
        const input = new BooleanFormInput()
        assert.equal(null, input.getNewValue(true, {payload: {value: undefined}}))
        assert.equal(null, input.getNewValue(true, {payload: {value: null}}))
        assert.equal(false, input.getNewValue(true, {payload: {value: ''}}))
        assert.equal(true, input.getNewValue(true, {payload: {value: 'sdasd'}}))
        assert.equal(true, input.getNewValue(true, {payload: {value: {}}}))
        assert.equal(true, input.getNewValue(true, {payload: {value: true}}))
        assert.equal(false, input.getNewValue(true, {payload: {value: false}}))
    })
    it('preforms basic validation correctly', () => {
        const input = new BooleanFormInput()
        assert.notEqual(null, input.validateBasic({}))
        assert.notEqual(null, input.validateBasic(''))
        assert.notEqual(null, input.validateBasic(123))
        assert.equal(null, input.validateBasic(null))
        assert.equal(null, input.validateBasic(true))
        assert.equal(null, input.validateBasic(false))
    })

})
