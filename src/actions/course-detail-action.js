import { CourseDetailActionTypes } from '../globals/constants';

export const setCourseInfo = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setCourseInfo, data: data });
}

export const setCourseSection = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setCourseSection, data: data });
}

export const setUserBuyCourse = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setUserBuyCourse, data: data });
}

export const setUserLikeCourse = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setUserLikeCourse, data: data });
}

export const setUserRatingCourse = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setUserRatingCourse, data: data });
}

export const setCurrentLesson = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setCurrentLesson, data: data });
}

export const setCurrentTimePlayingVideo = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setCurrentTimePlayingVideo, data: data });
}

export const setProcess = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setProcess, data: data });
}

export const setIsDownloaded = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setIsDownloaded, data: data });
}

export const setTotalLessons = (dispatch, data) => {
    dispatch({ type: CourseDetailActionTypes.setTotalLessons, data: data });
}

export const closeCourseDetail = (dispatch) => {
    dispatch({ type: CourseDetailActionTypes.closeCourseDetail });
}