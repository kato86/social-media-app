module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not by empty';
    }
    if(email.trim() === '') {
        errors.email = 'Email must not by empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must by a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not empty'
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'Password must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username must not by empty'
    }
    if(password.trim() === '') {
        errors.password = 'Password must not by empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}