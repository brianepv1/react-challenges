const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validations = {
    name: (value: string) => (value !== '' && value.length >= 10) ? { valid: true, msg: ''} : { valid: false, msg: 'Name should not be empty and should be greater or equal than 10 charcters'},
    email: (value: string) => (value !== '' && EMAIL_REGEX.test(value)) ? { valid: true, msg: ''} : { valid: false, msg: 'Email should not be empty and email should be valid, please review your email format'},
    title: (value: string) => (value !== '' && value.length >= 10) ? { valid: true, msg: ''} : { valid: false, msg: 'Title should not be empty and should be greater or equal than 10 charcters'},
}