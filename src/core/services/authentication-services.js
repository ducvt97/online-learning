export const login = (accounts, usernameOrEmail, password) => {
    let account = null;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username === usernameOrEmail || accounts[i].email === usernameOrEmail)
            account = accounts[i];
    }
    if (account) {
        return account.password === password ? { status: 200, message: "Login successfully", user: account }
            : { status: 404, message: "Password is not correct" };
    }
    return { status: 404, message: "Username or Email doesn't exist" }
}

export const verifyEmail = (accounts, email) => {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email)
            return { status: 200, message: "Email correct" };
    }
    return { status: 404, message: "Email doesn't exist" };
}

export const verifyCode = (code) => {
    return code === "123456" ? { status: 200, message: "Verification code correct" }
        : { status: 404, message: "Verification code not correct" }
}

export const verifyPassword = (currentUser, password) => {
    return currentUser.password === password ? { status: 200, message: "Verify successfully" }
        : { status: 404, message: "Password is not correct" }
}