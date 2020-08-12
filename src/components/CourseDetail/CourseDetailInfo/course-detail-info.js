import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity, Share } from 'react-native';
import { ListItem, Rating, Button, Icon } from 'react-native-elements';
import { Linking } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import Description from '../../common/description';
import DownloadInfo from './DownloadInfo/download-info';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors, ScreenName } from '../../../globals/constants';
import PaymentServices from '../../../core/services/payment-services';
import UserServices from '../../../core/services/user-services';
import { setUserBuyCourse, setUserLikeCourse, setProcess } from '../../../actions/course-detail-action';
import CoursesServices from '../../../core/services/courses-services';
import Utilities from '../../../core/fwk/utilities';
import { LanguageContext } from '../../../contexts/language-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';

const CourseDetailInfo = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const authContext = useContext(AuthenticationContext);
    const [paymentLoadingStatus, setPaymentLoadingStatus] = useState(false);
    const [errMsgPaymentStatus, setErrMsgPaymentStatus] = useState("");
    const [likeCourseLoading, setLikeCourseLoading] = useState(false);
    const [buyCourseLoading, setBuyCourseLoading] = useState(false);

    useEffect(() => {
        if (authContext.state.authenticated) {
            setPaymentLoadingStatus(true);
            setLikeCourseLoading(true);
            PaymentServices.getPaymentStatus(props.state.courseInfo.id)
                .then(response => {
                    setPaymentLoadingStatus(false);
                    if (response.status === 200)
                        setUserBuyCourse(props.dispatch, response.data.didUserBuyCourse);
                    else
                        setErrMsgPaymentStatus(response.data.message);
                }).catch(error => {
                    setPaymentLoadingStatus(false);
                    setErrMsgPaymentStatus(error.message);
                    PaymentServices.handleError(error);
                });
            UserServices.getCourseLikeStatus(props.state.courseInfo.id)
                .then(response => {
                    setLikeCourseLoading(false);
                    if (response.status === 200)
                        setUserLikeCourse(props.dispatch, response.data.likeStatus);
                    else
                        alert(response.data.message);
                }).catch(error => {
                    setLikeCourseLoading(false);
                    alert(error.message);
                    UserServices.handleError(error);
                });
        }
    }, []);

    useEffect(() => {
        CoursesServices.getCourseProcess(props.state.courseInfo.id)
            .then(response => {
                if (response.status === 200)
                    setProcess(props.dispatch, Utilities.roundFloat(response.data.payload / 100 * props.state.courseInfo.totalHours) );
            }).catch(error => { UserServices.handleError(error); });
    }, [props.state.currentLesson]);

    const onPressLikeCourse = (courseId) => {
        if (authContext.state.authenticated) {
            setLikeCourseLoading(true);
            UserServices.likeCourse(courseId)
                .then(response => {
                    setLikeCourseLoading(false);
                    if (response.status === 200)
                        setUserLikeCourse(props.dispatch, response.data.likeStatus);
                    else
                        alert(response.data.message);
                }).catch(error => {
                    setLikeCourseLoading(false);
                    alert(error.message);
                    UserServices.handleError(error);
                });
        } else alert(langContext.state.translation["loginRequireAction"]);
    }

    const onPressBuyCourse = (courseId) => {
        if (authContext.state.authenticated) {
            setBuyCourseLoading(true);
            PaymentServices.buyCourseFree(courseId)
                .then(response => {
                    setBuyCourseLoading(false);
                    if (response.status === 200) {
                        setUserBuyCourse(props.dispatch, true);
                        alert(langContext.state.translation["buyCourseSuccessMsg"]);
                    } else
                        Linking.openURL(`https://itedu.me/payment/${props.state.courseInfo.id}`);
                }).catch(error => {
                    setBuyCourseLoading(false);
                    alert(error.message);
                    PaymentServices.handleError(error);
                });
        } else alert(langContext.state.translation["loginRequireAction"]);
    }

    return <View style={[theme.background, {marginTop: 15}]}>
        <Spinner visible={buyCourseLoading} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
        <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{props.state.courseInfo.title}</Text>
        <ListItem containerStyle={[styles.instructorButton, theme.navigationHeader, CommonStyles.shortMarginVertical]}
            leftAvatar={{source: {uri: props.state.courseInfo.instructor.avatar}}} title={props.state.courseInfo.instructor.name} titleStyle={theme.titleColor}
            onPress={() => props.navigation.navigate(ScreenName.instructorDetail, { itemId: props.state.courseInfo.instructor.id })} />
        <View style={[styles.rowContainer, CommonStyles.shortMarginVertical]}>
            <Text style={theme.textColor}>{`${new Date(props.state.courseInfo.createdAt).toDateString()} . ${props.state.courseInfo.totalHours} ${langContext.state.translation["hour"]}`}</Text>
            <Rating style={{marginLeft: 15}} tintColor={theme.backgroundColor} imageSize={15} fractions={0.75}
                startingValue={props.state.courseInfo.averagePoint !== "NaN" ? Number(props.state.courseInfo.averagePoint) : 1} readonly />
            <Text style={[theme.textColor, {marginLeft: 5}]}>({props.state.courseInfo.ratedNumber})</Text>
        </View>
        <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["process"]}:  {props.state.process} / {props.state.courseInfo.totalHours} {langContext.state.translation["hour"]}</Text>
        <View style={[styles.rowContainer, styles.buttonGroup]}>
            <TouchableOpacity style={styles.iconButton} onPress={() => onPressLikeCourse(props.state.courseInfo.id)} disabled={likeCourseLoading}>
                {likeCourseLoading ? <ActivityIndicator color={theme.tintColor} />
                : <Icon reverse type="font-awesome" name={props.state.userLikeCourse ? "heart" : "heart-o"}
                    color={Colors.transparent} reverseColor={Colors.dodgerBlue} containerStyle={{borderColor: Colors.dodgerBlue, borderWidth: 1}} />}
                <Text style={{color: Colors.dodgerBlue}}>{props.state.userLikeCourse ? langContext.state.translation["liked"] : langContext.state.translation["like"]}</Text>
            </TouchableOpacity>
            <DownloadInfo {...props} />
            <TouchableOpacity style={styles.iconButton} onPress={() => Share.share({message: `${langContext.state.translation["share"]} ${langContext.state.translation["course"]} "${props.state.courseInfo.title}"`})}>
                <Icon reverse type="font-awesome" name="share" color={Colors.transparent} reverseColor={Colors.dodgerBlue} containerStyle={{borderColor: Colors.dodgerBlue, borderWidth: 1}} />
                <Text style={{color: Colors.dodgerBlue}}>{langContext.state.translation["share"]}</Text>
            </TouchableOpacity>
        </View>
        {paymentLoadingStatus ? <ActivityIndicator color={theme.tintColor} />
        : !props.state.userBuyCourse ? props.state.userBuyCourse != null
            ? <Button icon={{type: "font-awesome", name: "shopping-cart", color: Colors.ghostWhite}} title={`${langContext.state.translation["buy"]} ${langContext.state.translation["course"]}`} containerStyle={CommonStyles.shortMarginVertical}
                onPress={() => onPressBuyCourse(props.state.courseInfo.id)} />
            : <Text style={theme.textColor}>{errMsgPaymentStatus}</Text>
        : null}
        <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["description"]}</Text>
        <Description style={theme.textColor} content={props.state.courseInfo.description} theme={theme} />
        <View style={styles.field}>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["learnWhat"]}</Text>
            <FlatList data={props.state.courseInfo.learnWhat} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.listItem]}>&#8226; {item}</Text>} />
        </View>
        <View style={styles.field}>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["requirement"]}</Text>
            <FlatList data={props.state.courseInfo.requirement} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.listItem]}>&#8226; {item}</Text>} />
        </View>
    </View>
}

export default CourseDetailInfo;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row"
    },
    instructorButton: {
        marginTop: 10,
        borderRadius: 30,
        maxWidth: 200,
        maxHeight: 40,
        padding: 2
    },
    listItem: {
        marginVertical: 3,
        marginLeft: 5
    },
    field: {
        marginBottom: 10
    },
    iconButton: {
        alignItems: "center"
    },
    buttonGroup: {
        justifyContent: "space-around",
        marginVertical: 10
    }
});