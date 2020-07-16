import axios from 'axios';

const requestUrl = "/course";

export class CoursesServices {
    static getTopSell = () => {
        axios.post(`${requestUrl}/top-sell`, {
            limit: 10,
            page: 0
        });
    }

    static getTopNew = () => {
        axios.post(`${requestUrl}/top-new`, {
            limit: 10,
            page: 0
        });
    }

    static getTopRate = () => {
        axios.post(`${requestUrl}/top-rate`, {
            limit: 10,
            page: 0
        });
    }

    static getByUserFavoriteCategory = (userId) => {
        axios.post(`${requestUrl}/courses-user-favorite-categories`, { userId: userId });
    }

    static getCourseInfo = (courseId) => {
        axios.get(`${requestUrl}/get-course-info`, { id: courseId });
    }

    static getCourseDetail = (courseId, userId) => {
        axios.get(`${requestUrl}/get-course-detail/${courseId}/${userId}`);
    }

    static getCourseDetailWithLesson = (courseId) => {
        axios.get(`${requestUrl}/get-course-detail/${courseId}`);
    }

    static getCourseProcess = (courseId) => {
        axios.get(`${requestUrl}/process-course/${courseId}`);
    }

    static ratingCourse = (courseId, formalityPoint, contentPoint, presentationPoint, content) => {
        axios.post(`${requestUrl}/rating-course`, {
            courseId: courseId,
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint,
            content: content
        });
    }

    static getRating = (courseId) => {
        axios.get(`${requestUrl}/get-rating/${courseId}`);
    }

    static reportCourse = (courseId, content, subject) => {
        axios.post(`${requestUrl}/report-course`, {
            courseId: courseId,
            content: content,
            subject: subject
        });
    }

    static search = (keyword) => {
        axios.post(`${requestUrl}/search`, { keyword: keyword });
    }

    static handleError = (error) => {
        console.log(`Course service error: ${error}`);
    }
}