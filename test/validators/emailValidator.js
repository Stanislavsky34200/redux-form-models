import email from 'validators/email'

describe('email validator', () => {
    it('recognizes empty values', () => {
        assert.equal(null, email(null))
        assert.equal(null, email(''))
        assert.equal(null, email())
    })
    it('recognizes email', () => {
        assert.equal(null, email('stan@mail.ru'))
    })
    it('recognizes invalid email', () => {
        assert.notEqual(null, email('asd@aas'))
        assert.notEqual(null, email('asdaas'))
        assert.notEqual(null, email('asdaas@.ru'))
    })
})
