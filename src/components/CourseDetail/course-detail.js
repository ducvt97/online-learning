import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as FileSystem from 'expo-file-system';

import CourseDetailInfo from './CourseDetailInfo/course-detail-info';
import Contents from './Contents/contents';
import ListCoursesHorizontal from '../Courses/ListCoursesHorizontal/list-courses-horizontal';
import RatingsAndReviews from './RatingsAndReviews/ratings-and-reviews';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';
import CoursesServices from '../../core/services/courses-services';
import { AuthenticationContext } from '../../contexts/authentication-context';
import courseDetailReducer from '../../reducers/course-detail-reducer';
import { setCourseInfo, setUserRatingCourse, setCurrentLesson } from '../../actions/course-detail-action';
import Utilities from '../../core/fwk/utilities';
import { LanguageContext } from '../../contexts/language-context';
import LessonServices from '../../core/services/lesson-services';

const initialState = {
    process: null,
    courseInfo: null,
    courseInfoLoading: true,
    userBuyCourse: null,
    userRatingCourse: null,
    userLikeCourse: null,
    courseSection: null,
    currentLesson: null,
    totalLessons: null,
    isDownloaded: null
}

const CourseDetail = (props) => {
    const courseId = props.route.params.itemId;
    const [state, dispatch] = useReducer(courseDetailReducer, initialState);
    const [errMsgCourseInfo, setErrMsgCourseInfo] = useState(null);

    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);
    const langContext = useContext(LanguageContext);
    const videoPlayer = useRef(null);
    const ytPlayer = useRef(null);

    useEffect(() => {
        CoursesServices.getCourseDetail(courseId, null)
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
    }, []);

    useEffect(() => {
        if (authContext.state.authenticated && state.userBuyCourse) {
            // Get user rating of this course
            CoursesServices.getRating(courseId)
                .then(response => {
                    if (response.status === 200)
                        setUserRatingCourse(dispatch, response.data.payload);
                }).catch(error => { CoursesServices.handleError(error); });
            // Get last lesson video user watch
            CoursesServices.getLastWatchLesson(courseId)
                .then(response => {
                    if (response.status === 200)
                        setCurrentLesson(dispatch, response.data.payload);
                }).catch(error => { CoursesServices.handleError(error); });
        }
    }, [state.userBuyCourse]);

    // Update time of watch video
    const updateVideoCurrentTime = (lessonId, time) => {
        LessonServices.updateVideoCurrentTime(lessonId, time)
            .then(reponse => {})
            .catch(error => { LessonServices.handleError(error); });
    }

    // Trigger when Youtube Player state is change
    const onChangeStateYtPlayer = async (event) => {
        if (event === "ended")
            updateVideoCurrentTime(state.currentLesson.id || state.currentLesson.lessonId, 0);
    }

    // Trigger when Youtube Player resource is ready
    const ytPlayerOnReady = () => {
        ytPlayer.current.seekTo(Utilities.milsecondToSecond(state.currentLesson.currentTime), true);
    }

    // Trigger when Video Player state is change
    const videoPlayerStatusUpdate = (status) => {
        if (status.didJustFinish)
            updateVideoCurrentTime(state.currentLesson.id || state.currentLesson.lessonId, 0);
    }

    const onPressCloseBtn = async () => {
        const updateCurrentLessonTime = () => {
            if (state.currentLesson)
                if (state.courseInfo)
                    if (state.courseInfo.typeUploadVideoLesson === 1 && videoPlayer.current)
                        videoPlayer.current.setOnPlaybackStatusUpdate(status => {
                            if (status.isLoaded)
                                updateVideoCurrentTime(state.currentLesson.id || state.currentLesson.lessonId, status.positionMillis >= status.playableDurationMillis ? 0 : status.positionMillis);
                        });
                    else if (state.courseInfo.typeUploadVideoLesson !== 1 && ytPlayer.current)
                        ytPlayer.current.getCurrentTime().then(async currentTime =>
                            updateVideoCurrentTime(state.currentLesson.id || state.currentLesson.lessonId, await Utilities.secondToMilsecond(currentTime)));
        }
        await updateCurrentLessonTime();
        props.navigation.goBack();
    }

    return state.courseInfoLoading ? <Spinner textStyle={styles.indicatorText} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
    : state.courseInfo ? <View style={[styles.container, theme.background, CommonStyles.flex]}>
        <Icon name="close" size={30} color={Colors.gainsboro} containerStyle={styles.backButton} onPress={onPressCloseBtn} />
        {state.currentLesson ? state.courseInfo.typeUploadVideoLesson === 1 ?
            state.isDownloaded !== null ?
                <Video source={{uri: state.isDownloaded === false ? state.currentLesson.videoUrl : state.currentLesson.id ?
                        `${FileSystem.documentDirectory}${courseId}/${state.currentLesson.id}.mp4` : `${FileSystem.documentDirectory}${courseId}/${state.currentLesson.lessonId}.mp4`}} 
                    posterSource={{uri: state.courseInfo.imageUrl}} rate={1.0} volume={1.0} shouldCorrectPitch={true} resizeMode="contain"
                    shouldPlay useNativeControls isMuted={false} style={styles.video} ref={videoPlayer} progressUpdateIntervalMillis={1000000}
                    positionMillis={state.currentLesson.currentTime} onPlaybackStatusUpdate={status => videoPlayerStatusUpdate(status)} />
                :<Image style={styles.image} source={{uri: state.courseInfo.imageUrl}} />
            : <YoutubePlayer height={200} videoId={Utilities.getYoutubeVideoIdFromUrl(state.currentLesson.videoUrl)} play
                onChangeState={event => onChangeStateYtPlayer(event)} onError={e => console.log(e)} volume={80} playbackRate={1} ref={ytPlayer}
                initialPlayerParams={{ rel: 0, autoplay: 1 }} onReady={ytPlayerOnReady} />
        : <Image style={styles.image} source={{uri: state.courseInfo.imageUrl}} />}
        <ScrollView nestedScrollEnabled style={CommonStyles.shortPaddingHorizontal}>
            <CourseDetailInfo {...props} state={state} dispatch={dispatch} />
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["content"]}</Text>
            {authContext.state.authenticated ? state.userBuyCourse ? <Contents {...props} state={state} dispatch={dispatch} videoPlayer={videoPlayer} ytPlayer={ytPlayer} />
                : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["paymentRequire"]}</Text>
            : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["loginRequire"]}</Text>}
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["courses"]} {langContext.state.translation["relate"]}</Text>
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