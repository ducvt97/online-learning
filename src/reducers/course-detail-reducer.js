import { CourseDetailActionTypes } from '../globals/constants';

const courseDetailReducer = (prevState, action) => {
    switch (action.type) {
        case CourseDetailActionTypes.setCourseInfo:
            return {...prevState, courseInfo: action.data, courseInfoLoading: false};
        case CourseDetailActionTypes.setCourseSection:
            return {...prevState, courseSection: action.data};
        case CourseDetailActionTypes.closeCourseDetail:
            return {...prevState, courseInfo: null,
                courseInfoLoading: true,
                userBuyCourse: null,
                userRatingCourse: null,
                userLikeCourse: null,
                courseSection: null,
                currentLesson: null
            };
        case CourseDetailActionTypes.setUserBuyCourse:
            return {...prevState, userBuyCourse: action.data};
        case CourseDetailActionTypes.setUserLikeCourse:
            return {...prevState, userLikeCourse: action.data};
        case CourseDetailActionTypes.setUserRatingCourse:
            return {...prevState, userRatingCourse: action.data};
        case CourseDetailActionTypes.setCurrentLesson:
            return {...prevState, currentLesson: action.data};
        case CourseDetailActionTypes.setCurrentTimePlayingVideo:
            return {...prevState, currentTimePlayingVideo: action.data};
        case CourseDetailActionTypes.setVideoPlaying:
            return {...prevState, videoPlaying: action.data};
        case CourseDetailActionTypes.setProcess:
            return {...prevState, process: action.data};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default courseDetailReducer;