import { CourseDeatailActionTypes } from '../globals/constants';

const courseDetailReducer = (prevState, action) => {
    switch (action.type) {
        case CourseDeatailActionTypes.setCourseInfo:
            return {...prevState, courseInfo: action.data, courseInfoLoading: false};
        case CourseDeatailActionTypes.setCourseSection:
            return {...prevState, courseSection: action.data};
        case CourseDeatailActionTypes.closeCourseDetail:
            return {...prevState, courseInfo: null,
                courseInfoLoading: true,
                userBuyCourse: null,
                userRatingCourse: null,
                userLikeCourse: null,
                courseSection: null,
                currentLesson: null
            };
        case CourseDeatailActionTypes.setUserBuyCourse:
            return {...prevState, userBuyCourse: action.data};
        case CourseDeatailActionTypes.setUserLikeCourse:
            return {...prevState, userLikeCourse: action.data};
        case CourseDeatailActionTypes.setUserRatingCourse:
            return {...prevState, userRatingCourse: action.data};
        case CourseDeatailActionTypes.setCurrentLesson:
            return {...prevState, currentLesson: action.data};
        case CourseDeatailActionTypes.setCurrentTimePlayingVideo:
            return {...prevState, currentTimePlayingVideo: action.data};
        case CourseDeatailActionTypes.setVideoPlaying:
            return {...prevState, videoPlaying: action.data};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default courseDetailReducer;