import axios from 'axios';

const requestUrl = "/user";

export default class UserServices {
    static login = (email, password) => {
        return axios.post(`${requestUrl}/login`, {
            email: email,
            password: password
        });
    }

    // Login with Google account
    static loginWithGoogle = (email, googleId) => {
        return axios.post(`/user/login-google-mobile`, {
            user: {
                email: email,
                id: googleId
            }
        });
    }

    static register = (name, email, phone, password) => {
        return axios.post(`${requestUrl}/register`, {
            name: name,
            email: email,
            phone: phone,
            password: password
        });
    }

    // Send active link to user's email
    static sendActivateEmail = (email) => {
        return axios.post(`${requestUrl}/send-activate-email`, { email: email });
    }

    static activateEmail = (token) => {
        return axios.put(`${requestUrl}/activate-email`, { token: token });
    }

    static getInfo = (token) => {
        const instance = axios.create({
            headers: {"Authorization": `Bearer ${token}`}
        });
        return instance.get(`${requestUrl}/me`);
    }

    // Send email forget password to user
    static verifyEmail = (email) => {
        return axios.post(`${requestUrl}/forget-pass/send-email`, { email: email });
    }

    // Verify token that sent email forget password
    static verifyCode = (token) => {
        return axios.get(`${requestUrl}/forget-pass/jwt/${token}`);
    }

    static resetPassword = (userId, password) => {
        return axios.post(`${requestUrl}/reset-password`, {
            id : userId,
            password: password
        });
    }

    static chagePassword = (userId, oldPassword, newPassword) => {
        return axios.post(`${requestUrl}/change-password`, {
            id : userId,
            oldPass: oldPassword,
            newPass: newPassword
        });
    }

    // Update user information: name, avatar, phone
    static updateProfile = (name, avatar, phone) => {
        return axios.put(`${requestUrl}/update-profile`, {
            name : name,
            avatar: avatar,
            phone: phone
        });
    }

    // Change user email that had been registered
    static changeEmail = (newEmail) => {
        return axios.put(`${requestUrl}/change-user-email`, { newEmail : newEmail });
    }

    static updateFavoriteCategories = (categoryIds) => {
        return axios.put(`${requestUrl}/update-favorite-categories`, { categoryIds : categoryIds });
    }

    static recommendCourse = (userId, limit, offset) => {
        return axios.get(`${requestUrl}/recommend-course/${userId}/${limit}/${offset}`);
    }

    static likeCourse = (courseId) => {
        return axios.post(`${requestUrl}/like-course`, { courseId : courseId });
    }

    // Get user like status with a specific course
    static getCourseLikeStatus = (courseId) => {
        return axios.get(`${requestUrl}/get-course-like-status/${courseId}`, { courseId : courseId });
    }

    // Get list courses user is learning
    static getProcessCourse = (token) => {
        const instance = axios.create({
            headers: {"Authorization": `Bearer ${token}`}
        });
        return instance.get(`${requestUrl}/get-process-courses`);
    }

    // Get list courses user liked
    static getFavoriteCourse = (token) => {
        const instance = axios.create({
            headers: {"Authorization": `Bearer ${token}`}
        });
        return instance.get(`${requestUrl}/get-favorite-courses`);
    }

    static getIntroPage = () => {
        return axios.get(`${requestUrl}/intro-page`);
    }

    static checkOwnCourse = (courseId) => {
        return axios.get(`${requestUrl}/check-own-course/${courseId}`);
    }

    static handleError = (error) => {
        console.log(`User service error: ${error}`);
    }
}