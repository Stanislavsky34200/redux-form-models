export default function validateNotEmpty(value) {
    return (typeof value === 'undefined' || value === null || Array.isArray(value) && value.length === 0 || value === '')
        ? 'Value should not be empty'
        : null
}
