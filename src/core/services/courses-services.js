import { useContext } from "react"
import { CoursesContext } from "../../contexts/courses-context";

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

export const getDownloadedCourses = () => {
    const {courses} = useContext(CoursesContext);
    const result = [];
    courses.forEach(course => {
        if (course.downloaded)
            result.push(course);
    });
    return result;
}