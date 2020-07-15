import { useContext } from "react";
import Axios from 'axios';
import { CoursesContext } from "../../contexts/courses-context";

export class CoursesServices {
    requestUrl = "course";

    static getCourseInfo = (courseId) => {
        Axios.get(`${requestUrl}/get-course-info`, {
            params: {
               id:  courseId
            }
        })
    }

    handleError = (error) => {
        console.log(`Course service error: ${error}`);
    }
}

export const getCourseById = (courseId) => {
    const {courses} = useContext(CoursesContext);
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId)
            return courses[i];
    }
    return null;
}

export const getBookmarkedCourses = () => {
    const {courses} = useContext(CoursesContext);
    const result = [];
    courses.forEach(course => {
        if (course.bookmarked)
            result.push(course);
    });
    return result;
}
