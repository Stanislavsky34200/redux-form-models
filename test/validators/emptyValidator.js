import notEmpty from 'validators/notEmpty'


describe('notEmpty validator', () => {
    it('recognizes empty values', () => {
        assert.notEqual(null, notEmpty(''))
        assert.notEqual(null, notEmpty())
        assert.notEqual(null, notEmpty([]))
        assert.notEqual(null, notEmpty(null))
    })
    it('recognizes not empty values', () => {
        assert.equal(null, notEmpty(0))
        assert.equal(null, notEmpty({}))
        assert.equal(null, notEmpty('13'))
        assert.equal(null, notEmpty(['13']))
    })
})
