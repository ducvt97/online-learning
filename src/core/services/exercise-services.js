import axios from 'axios';

export default class ExerciseServices {
    static getByLessonId = (lessonId) => {
        return axios.post(`/exercise/student/list-exercise-lesson`, { lessonId: lessonId });
    }

    static handleError = (error) => {
        console.log(`Exercise service error: ${error}`);
    }
}