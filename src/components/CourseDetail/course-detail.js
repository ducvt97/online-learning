import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import YoutubePlayer from 'react-native-youtube-iframe';

import CourseDetailInfo from './CourseDetailInfo/course-detail-info';
import ContentsTab from './ContentsTab/contents-tab';
import ListCoursesHorizontal from '../Courses/ListCoursesHorizontal/list-courses-horizontal';
import RatingsAndReviews from './RatingsAndReviews/ratings-and-reviews';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';
import CoursesServices from '../../core/services/courses-services';
import { AuthenticationContext } from '../../contexts/authentication-context';
import courseDetailReducer from '../../reducers/course-detail-reducer';
import { setCourseSection, setCourseInfo, setVideoPlaying, setUserRatingCourse } from '../../actions/course-detail-action';
import LessonServices from '../../core/services/lesson-services';
import Utilities from '../../core/fwk/utilities';

const initialState = {
    courseInfo: null,
    courseInfoLoading: true,
    userBuyCourse: null,
    userRatingCourse: null,
    userLikeCourse: null,
    courseSection: null,
    currentLesson: null,
    videoPlaying: true
}

const CourseDetail = (props) => {
    const courseId = props.route.params.itemId;
    const [state, dispatch] = useReducer(courseDetailReducer, initialState);
    const [errMsgCourseInfo, setErrMsgCourseInfo] = useState(null);
    const [courseSectionLoading, setcourseSectionLoading] = useState(true);
    const [errMsgCourseSection, setErrMsgCourseSection] = useState(null);
    const playerRef = useRef(null);

    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);

    useEffect(() => {
        CoursesServices.getCourseDetail(courseId, authContext.state.userInfo.id)
            .then(response => {
                if (response.status === 200)
                    setCourseInfo(dispatch, response.data.payload);
                else
                    setErrMsgCourseInfo(response.data.message);
            }).catch(error => {
                setCourseInfo(dispatch, null);
                setErrMsgCourseInfo(error);
                CoursesServices.handleError(error);
            });

        CoursesServices.getRating(courseId)
            .then(response => {
                if (response.status === 200)
                    setUserRatingCourse(dispatch, response.data.payload);
            }).catch(error => {
                CoursesServices.handleError(error);
            });
    }, []);

    useEffect(() => {
        if (state.userBuyCourse) {
            const loadSection = async () => {
                let sections = [];
                for (const section of state.courseInfo.section) {
                    let lessons = [];
                    for (const lesson of section.lesson) {
                        await LessonServices.getVideoStatus(state.courseInfo.id, lesson.id)
                            .then(response => {
                                if (response.status === 200)
                                    lessons.push({...lesson, ...{
                                        currentTime: response.data.payload.currentTime,
                                        isFinish: response.data.payload.isFinish
                                    }}); 
                                else
                                    setErrMsgCourseSection(response.data.message);
                            }).catch(error => {
                                setErrMsgCourseSection(error.message);
                                LessonServices.handleError(error);
                            });
                    }
                    sections.push({...section, lesson: lessons});
                }
                setcourseSectionLoading(false);
                setCourseSection(dispatch, sections);
            }
            loadSection();
        }
    }, [state.userBuyCourse]);

    const onChangeStateYtPlayer = async (event) => {
        switch (event) {
            case "playing":
                setVideoPlaying(dispatch, true);
                break;
            case "paused":
                setVideoPlaying(dispatch, false);
                break;
            case "ended":
                setVideoPlaying(dispatch, false);
                break;
            default:
                break;
        }
    }

    return state.courseInfoLoading ? <Spinner textStyle={styles.indicatorText} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
    : state.courseInfo ? <View style={[styles.container, theme.background, CommonStyles.flex]}>
        <Icon name="close" size={30} color={Colors.gainsboro} containerStyle={styles.backButton} onPress={props.navigation.goBack} />
        {state.currentLesson ? state.courseInfo.typeUploadVideoLesson === 1 ?
            <Video source={{uri: state.currentLesson.videoUrl}} posterSource={{uri: state.courseInfo.imageUrl}}
                rate={1.0} volume={1.0} shouldCorrectPitch={true} isMuted={false} resizeMode="cover"
                shouldPlay useNativeControls style={styles.video}
                positionMillis={Utilities.hourToMilsecond(state.currentLesson.currentTime * 60 * 60 * 1000)} />
            : <YoutubePlayer ref={playerRef} height={200} videoId={state.currentLesson.videoUrl} play={state.videoPlaying}
                onChangeState={event => onChangeStateYtPlayer(event)} onError={e => console.log(e)} volume={80} playbackRate={1}
                initialPlayerParams={{ start: Utilities.hourToMilsecond(state.currentLesson.currentTime * 60 * 60), rel: 0 }} />
        : <Image style={styles.image} source={{uri: state.courseInfo.imageUrl}} />}
        <ScrollView nestedScrollEnabled style={CommonStyles.shortPaddingHorizontal}>
            <CourseDetailInfo {...props} state={state} dispatch={dispatch} />
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Lessons</Text>
            {state.userBuyCourse ?
                courseSectionLoading ? <ActivityIndicator color={theme.tintColor} />
                : state.courseSection ? <ContentsTab {...props} state={state} dispatch={dispatch} ytPlayerRef={playerRef} />
                    : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage]}>{errMsgCourseSection}</Text>
            : null}
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Related Courses</Text>
            <ListCoursesHorizontal data={state.courseInfo.coursesLikeCategory} theme={theme} {...props} />
            <RatingsAndReviews state={state} dispatch={dispatch} theme={theme} style={CommonStyles.shortMarginVertical} />
        </ScrollView>
    </View> : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage]}>{errMsgCourseInfo}</Text>
}

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    video: {
        height: 200
    },
    image: {
        height: 200,
        resizeMode: "stretch"
    },
    backButton: {
        position: "absolute",
        zIndex: 300,
        marginTop: 10,
        marginLeft: 10
    }
});