import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { ListItem, Rating, Divider, Button } from 'react-native-elements';
import { Linking } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import Description from '../../common/description';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors, ScreenName } from '../../../globals/constants';
import PaymentServices from '../../../core/services/payment-services';
import UserServices from '../../../core/services/user-services';
import { setUserBuyCourse, setUserLikeCourse } from '../../../actions/course-detail-action';

const CourseDetailInfo = (props) => {
    const {theme} = useContext(ThemeContext);
    const [paymentLoadingStatus, setPaymentLoadingStatus] = useState(true);
    const [errMsgPaymentStatus, setErrMsgPaymentStatus] = useState("");
    const [likeCourseLoading, setLikeCourseLoading] = useState(true);
    const [errMsgLikeCourseLoading, setErrMsgLikeCourseLoading] = useState("");
    const [buyCourseLoading, setBuyCourseLoading] = useState(false);

    useEffect(() => {
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
                    setUserLikeCourse(props.dispatch,response.data.likeStatus);
                else
                    setErrMsgLikeCourseLoading(response.data.message);
            }).catch(error => {
                setLikeCourseLoading(false);
                setErrMsgLikeCourseLoading(error.message);
                UserServices.handleError(error);
            });
    }, []);

    const onPressLikeCourse = (courseId) => {
        setLikeCourseLoading(true);
        UserServices.likeCourse(courseId)
            .then(response => {
                setLikeCourseLoading(false);
                if (response.status === 200) {
                    setUserLikeCourse(props.dispatch, response.data.likeStatus);
                    setErrMsgLikeCourseLoading("");
                } else
                    alert(response.data.message);
            }).catch(error => {
                setLikeCourseLoading(false);
                alert(error);
                UserServices.handleError(error);
            });
    }

    const onPressBuyCourse = (courseId) => {
        setBuyCourseLoading(true);
        PaymentServices.buyCourseFree(courseId)
            .then(response => {
                setBuyCourseLoading(false);
                if (response.status === 200) {
                    setUserBuyCourse(props.dispatch, true);
                    alert("Congratulation!! You are so lucky to get this course for free.");
                } else
                    Linking.openURL(`https://itedu.me/payment/${props.state.courseInfo.id}`);
            }).catch(error => {
                setBuyCourseLoading(false);
                alert(error);
                PaymentServices.handleError(error);
            });
    }

    return <View style={[theme.background]}>
        <Spinner visible={buyCourseLoading} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
        <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{props.state.courseInfo.title}</Text>
        <ListItem containerStyle={[styles.instructorButton, theme.navigationHeader, CommonStyles.shortMarginVertical]}
            leftAvatar={{source: {uri: props.state.courseInfo.instructor.avatar}}}
            title={props.state.courseInfo.instructor.name} titleStyle={theme.titleColor}
            onPress={() => props.navigation.navigate(ScreenName.instructorDetail, { itemId: props.state.courseInfo.instructor.id })} />
        <View style={[styles.rowContainer, CommonStyles.shortMarginVertical]}>
            <Text style={theme.textColor}>{`${new Date(props.state.courseInfo.createdAt).toDateString()} . ${props.state.courseInfo.totalHours} hours`}</Text>
            <Rating style={[styles.rating, CommonStyles.shortPaddingHorizontal]} tintColor={theme.backgroundColor} imageSize={15} fractions={0.75}
                startingValue={Number(props.state.courseInfo.averagePoint)} readonly />
            <Text style={theme.textColor}>({props.state.courseInfo.ratedNumber})</Text>
        </View>
        {props.state.userLikeCourse != null ?
            <Button icon={{type: "font-awesome", name: props.state.userLikeCourse ? "heart" : "heart-o", color: Colors.dodgerBlue}} type="outline"
                loading={likeCourseLoading} title={props.state.userLikeCourse ? "Unlike Course" : "Like Course"}
                containerStyle={CommonStyles.shortMarginVertical} onPress={() => onPressLikeCourse(props.state.courseInfo.id)} />
            : <Text style={[theme.textColor]}>{errMsgLikeCourseLoading}</Text>}
        {paymentLoadingStatus ? <ActivityIndicator color={theme.tintColor} />
        : !props.state.userBuyCourse ? props.state.userBuyCourse != null
            ? <Button icon={{type: "font-awesome", name: "shopping-cart", color: Colors.ghostWhite}} title="Buy Course" containerStyle={CommonStyles.shortMarginVertical}
                onPress={() => onPressBuyCourse(props.state.courseInfo.id)} />
            : <Text style={theme.textColor}>{errMsgPaymentStatus}</Text>
        : null}
        <Divider style={CommonStyles.divider} />
        <View>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Descriptions</Text>
            <Description style={theme.textColor} content={props.state.courseInfo.description} theme={theme} />
        </View>
        <View style={styles.field}>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>What you will learn</Text>
            <FlatList data={props.state.courseInfo.learnWhat} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.listItem]}>&#8226; {item}</Text>} />
        </View>
        <View style={styles.field}>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Requirements</Text>
            <FlatList data={props.state.courseInfo.requirement} keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.listItem]}>&#8226; {item}</Text>} />
        </View>
    </View>
}

export default CourseDetailInfo;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    instructorButton: {
        marginTop: 10,
        borderRadius: 30,
        maxWidth: 200,
        maxHeight: 40,
        padding: 2
    },
    rating: {
        marginLeft: 10
    },
    listItem: {
        marginVertical: 3,
        marginLeft: 5
    },
    field: {
        marginBottom: 10
    }
});