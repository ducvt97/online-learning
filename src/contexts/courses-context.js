import React, { useState } from 'react';
import { coursesData } from '../raw-data/courses';

const CoursesContext = React.createContext();

const CoursesProvider = (props) => {
    const [courses, setCourses] = useState(coursesData);
    const toggleBookmarkCourse = (courseId) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseId) {
                const temp = [...courses];
                temp[i].bookmarked = !temp[i].bookmarked;
                setCourses(temp);
            }
        }
    }

    const toggleDownloadCourse = (courseId) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseId) {
                const temp = [...courses];
                temp[i].downloaded = !temp[i].downloaded;
                setCourses(temp);
            }
        }
    }
    return <CoursesContext.Provider value={{courses, toggleBookmarkCourse, toggleDownloadCourse}}>
        {props.children}
    </CoursesContext.Provider>
}

export {CoursesProvider, CoursesContext}
