import axios from 'axios';

const requestUrl = "/course";

export default class CoursesServices {
    static getTopSell = () => {
        return axios.post(`${requestUrl}/top-sell`, {
            limit: 10,
            page: 0
        });
    }

    static getTopNew = () => {
        return axios.post(`${requestUrl}/top-new`, {
            limit: 10,
            page: 0
        });
    }

    static getTopRate = () => {
        return axios.post(`${requestUrl}/top-rate`, {
            limit: 10,
            page: 0
        });
    }

    static getByUserFavoriteCategory = (userId) => {
        return axios.post(`${requestUrl}/courses-user-favorite-categories`, { userId: userId });
    }

    static getCourseInfo = (courseId) => {
        return axios.get(`${requestUrl}/get-course-info?id=${courseId}`);
    }

    static getCourseDetail = (courseId, userId) => {
        return axios.get(`${requestUrl}/get-course-detail/${courseId}/${userId}`);
    }

    static getCourseDetailWithLesson = (courseId) => {
        return axios.get(`${requestUrl}/detail-with-lesson/${courseId}`);
    }

    static getCourseProcess = (courseId) => {
        return axios.get(`${requestUrl}/process-course/${courseId}`);
    }

    static getLastWatchLesson = (courseId) => {
        return axios.get(`${requestUrl}/last-watched-lesson/${courseId}`);
    }

    static ratingCourse = (courseId, ratingNumber, content) => {
        return axios.post(`${requestUrl}/rating-course`, {
            courseId: courseId,
            formalityPoint: ratingNumber,
            contentPoint: ratingNumber,
            presentationPoint: ratingNumber,
            content: content
        });
    }

    static getRating = (courseId) => {
        return axios.get(`${requestUrl}/get-rating/${courseId}`);
    }

    static reportCourse = (courseId, content, subject) => {
        return axios.post(`${requestUrl}/report-course`, {
            courseId: courseId,
            content: content,
            subject: subject
        });
    }

    static search = (keyword, token) => {
        return axios.post(`${requestUrl}/searchV2`, {
            keyword: keyword,
            token: token
        });
    }

    static searchByCategory = (categoryId) => {
        return axios.post(`${requestUrl}/search`, { 
            keyword: "",
            opt: {
                category: [ categoryId ],
            }
        });
    }

    static getSearchHistory = () => {
        return axios.get(`${requestUrl}/search-history`);
    }

    static getSearchHistoryWithToken = (token) => {
        const instance = axios.create({
            headers: {"Authorization": `Bearer ${token}`}
        });
        return instance.get(`${requestUrl}/search-history`);
    }

    static deleteSearchHistory = (searchId) => {
        return axios.delete(`${requestUrl}/delete-search-history/${searchId}`);
    }

    static handleError = (error) => {
        console.log(`Course service error: ${error}`);
    }
}