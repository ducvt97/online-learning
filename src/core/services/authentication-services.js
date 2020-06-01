export const login = (username, password) => {
    return username === "admin" && password === "password" ? { status: 200, message: "Login successfully" }
        : { status: 404, message: "Username and password are not correct" }
}

export const verifyCode = (code) => {
    return code === "123456" ? { status: 200, message: "Verification code correct" }
        : { status: 404, message: "Verification code not correct" }
}

export const changePassword = (newPassword, verifyNewPassword) => {
    return newPassword === verifyNewPassword ? { status: 200, message: "Password changed successfully" }
        : { status: 404, message: "Veify new password does not match your new password" }
}

export const register = (username, email, fullname, password) => {
    if (username === "" || email === ""  || fullname === ""  || password === ""){
        if (username === "admin")
            return { status: 404, message: "Username already exist" }
        else
            return { status: 200, message: "Register successfully" }
    }
    return { status: 404, message: "Register failed. Some requirements not meet" }
}

export const verifyPassword = (password) => {
    return password === "password" ? { status: 200, message: "Verify successfully" }
        : { status: 404, message: "Password is not correct" }
}