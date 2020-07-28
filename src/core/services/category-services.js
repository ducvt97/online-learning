import axios from 'axios';

const requestUrl = "/category";

export default class CategoryServices {
    static getAll = () => {
        return axios.get(`${requestUrl}/all`);
    }

    static getDetailById = (categoryId) => {
        return axios.get(`${requestUrl}/${categoryId}`);
    }

    static handleError = (error) => {
        console.log(`Category service error: ${error}`);
    }
}