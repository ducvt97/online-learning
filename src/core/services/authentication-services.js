export const login = (username, password) => {
    return username === "admin" && password === "password" ? { status: 200, message: "Login success" }
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