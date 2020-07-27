import axios from 'axios';

const requestUrl = "/lesson";

export default class LessonServices {
    static getVideoStatus = (courseId, lessonId) => {
        return axios.get(`${requestUrl}/video/${courseId}/${lessonId}`);
    }

    static updateLessonStatus = (lessonId) => {
        return axios.post(`${requestUrl}/update-status`, { lessonId: lessonId });
    }

    static updateVideoCurrentTime = (lessonId, currentTime) => {
        return axios.post(`${requestUrl}/update-current-time-learn-video`, {
            lessonId: lessonId,
            currentTime: currentTime
        });
    }

    static handleError = (error) => {
        console.log(`Lesson service error: ${error}`);
    }
}