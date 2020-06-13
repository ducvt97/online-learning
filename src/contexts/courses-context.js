import React, { useState } from 'react';
import { coursesData } from '../raw-data/courses';

const CoursesContext = React.createContext();

const CoursesProvider = (props) => {
    const [courses, setCourses] = useState(coursesData);
    const toggleBookmarkedCourse = (courseId) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseId) {
                const temp = [...courses];
                temp[courseId].bookmarked = !temp[courseId].bookmarked;
                setCourses(temp);
            }
        }
    }
    return <CoursesContext.Provider value={{courses, toggleBookmarkedCourse}}>
        {props.children}
    </CoursesContext.Provider>
}

export {CoursesProvider, CoursesContext}
