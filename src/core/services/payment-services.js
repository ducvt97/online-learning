import axios from 'axios';

const requestUrl = "/payment";

export default class PaymentServices {
    static buyCourseFree = (courseId) => {
        return axios.post(`${requestUrl}/get-free-courses`, { courseId: courseId });
    }

    static getPaymentStatus = (courseId) => {
        return axios.get(`${requestUrl}/get-course-info/${courseId}`);
    }

    static handleError = (error) => {
        console.log(`Payment service error: ${error}`);
    }
}