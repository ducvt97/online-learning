import axios from 'axios';

const requestUrl = "/course";

export class CoursesServices {
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

    static ratingCourse = (courseId, formalityPoint, contentPoint, presentationPoint, content) => {
        return axios.post(`${requestUrl}/rating-course`, {
            courseId: courseId,
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint,
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

    static search = (keyword) => {
        return axios.post(`${requestUrl}/search`, { keyword: keyword });
    }

    static handleError = (error) => {
        console.log(`Course service error: ${error}`);
    }
}