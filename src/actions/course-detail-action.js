import { CourseDeatailActionTypes } from '../globals/constants';

export const setCourseInfo = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setCourseInfo, data: data });
}

export const setCourseSection = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setCourseSection, data: data });
}

export const setUserBuyCourse = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setUserBuyCourse, data: data });
}

export const setUserLikeCourse = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setUserLikeCourse, data: data });
}

export const setUserRatingCourse = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setUserRatingCourse, data: data });
}

export const setCurrentLesson = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setCurrentLesson, data: data });
}

export const setCurrentTimePlayingVideo = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setCurrentTimePlayingVideo, data: data });
}

export const setVideoPlaying = (dispatch, data) => {
    dispatch({ type: CourseDeatailActionTypes.setVideoPlaying, data: data });
}

export const closeCourseDetail = (dispatch) => {
    dispatch({ type: CourseDeatailActionTypes.closeCourseDetail });
}