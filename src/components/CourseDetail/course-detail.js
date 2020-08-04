import React, { useContext, useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import YoutubePlayer from 'react-native-youtube-iframe';

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
import { setCourseInfo, setVideoPlaying, setUserRatingCourse } from '../../actions/course-detail-action';
import Utilities from '../../core/fwk/utilities';

const initialState = {
    process: null,
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
                rate={1.0} volume={1.0} shouldCorrectPitch={true} isMuted={false} resizeMode="contain"
                shouldPlay useNativeControls style={styles.video}
                positionMillis={Utilities.hourToMilsecond(state.currentLesson.currentTime * 60 * 60 * 1000)} />
            : <YoutubePlayer height={200} videoId={Utilities.getYoutubeVideoIdFromUrl(state.currentLesson.videoUrl)} play={state.videoPlaying}
                onChangeState={event => onChangeStateYtPlayer(event)} onError={e => console.log(e)} volume={80} playbackRate={1}
                initialPlayerParams={{ start: Utilities.hourToMilsecond(state.currentLesson.currentTime * 60 * 60), rel: 0 }} />
        : <Image style={styles.image} source={{uri: state.courseInfo.imageUrl}} />}
        <ScrollView nestedScrollEnabled style={CommonStyles.shortPaddingHorizontal}>
            <CourseDetailInfo {...props} state={state} dispatch={dispatch} />
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Contents</Text>
            {state.userBuyCourse ? <Contents {...props} state={state} dispatch={dispatch} />
            : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>You must buy course to see lessons.</Text>}
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