import BaseFormInput from 'formInput/BaseFormInput'


describe('BaseFormInput', () => {
    it('should be instantiated correctly', () => {
        const input = new BaseFormInput([1], {someChild: "fake child"}, {option: "option"})
        assert.shallowDeepEqual(input.validators, [1])
        assert.shallowDeepEqual(input.children, {someChild: "fake child"})
        assert.shallowDeepEqual(input.options, {option: "option"})
    })
    it('should preform validation correctly', () => {
        const input = new BaseFormInput([value => value ? null : 'some error'])
        assert.equal(input.validate(true), null)
        assert.equal(input.validate(false), 'some error')
    })
    it('should generate nex value correctly', () => {
        const input = new BaseFormInput()
        assert.equal(input.getNewValue(123, {payload: {value: 17}}), 17)
    })
})
