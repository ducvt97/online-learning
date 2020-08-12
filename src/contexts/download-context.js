import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';

import CoursesServices from '../core/services/courses-services';

const initialState = {
    downloadedCourses: [],
    downloadedCoursesInfo: []
};

const DownloadContext = React.createContext();

const DownloadProvider = (props) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        // Get downloaded courses from Storage
        const getStorageData = async () => {
            try {
                const value = await AsyncStorage.getItem("downloadedCourses");
                if (value !== null) {
                    const downloadedCourses = JSON.parse(value);
                    const coursesInfo = [];
                    for (course of downloadedCourses) {
                        await CoursesServices.getCourseDetail(course, null)
                            .then(response => {
                                if(response.status === 200) coursesInfo.push(response.data.payload);
                            }).catch(error => CoursesServices.handleError(error));
                    }
                    setState({...state, downloadedCourses: await downloadedCourses, downloadedCoursesInfo: coursesInfo});
                }
            } catch (error) { console.log(error); }
        }
        getStorageData();
    }, []);

    // Add new course to downloaded list
    const addDownloadedCourse = (course) => {
        const courses = [...state.downloadedCourses];
        courses.push(course.id);
        const coursesInfo = [...state.downloadedCoursesInfo];
        coursesInfo.push(course);
        setState({...state, downloadedCourses: courses, downloadedCoursesInfo: coursesInfo});
        setDownloadedCoursesStorage(courses);
    }

    // Save downloaded list to Stotage
    const setDownloadedCoursesStorage = async (courses) => {
        const coursesString = JSON.stringify(courses);
        AsyncStorage.setItem("downloadedCourses", await coursesString);
    }

    // Delete specific course downloaded
    const removeDownloadedCourse = async courseId => {
        const position = state.downloadedCourses.indexOf(courseId);
        const courses = [...state.downloadedCourses];
        const coursesInfo = [...state.downloadedCoursesInfo];
        if (position !== -1){
            await FileSystem.deleteAsync(FileSystem.documentDirectory + courseId)
                .then(async status => {}).catch(error => alert(error));
            courses.splice(position, 1);
            coursesInfo.splice(position, 1);
            await setState({...state, downloadedCourses: courses, downloadedCoursesInfo: coursesInfo});
            await setDownloadedCoursesStorage(courses);
        }
    }

    // Delete all courses downloaded
    const removeAllDownloadedCourse = async () => {
        const courses = [...state.downloadedCourses];
        const coursesInfo = [...state.downloadedCoursesInfo];
        for (let i = courses.length; i--;) {
            await FileSystem.deleteAsync(FileSystem.documentDirectory + courses[i])
                .then(status => {})
                .catch(error => alert(error));
            courses.splice(i, 1);
            coursesInfo.splice(i, 1);
        }
        setState({...state, downloadedCourses: courses, downloadedCoursesInfo: coursesInfo});
        setDownloadedCoursesStorage(courses);
    }

    return <DownloadContext.Provider value={{state, removeDownloadedCourse, removeAllDownloadedCourse, addDownloadedCourse}}>
        {props.children}
    </DownloadContext.Provider>
}

export {DownloadProvider, DownloadContext}
