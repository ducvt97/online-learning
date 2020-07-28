import axios from 'axios';

const requestUrl = "/instructor";

export default class InstructorServices {
    static getAll = () => {
        return axios.get(`${requestUrl}`);
    }

    static getDetailById = (instructorId) => {
        return axios.get(`${requestUrl}/detail/${instructorId}`);
    }

    static handleError = (error) => {
        console.log(`Instructor service error: ${error}`);
    }
}