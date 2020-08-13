import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import ImageText from '../../common/image-text';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import UserServices from '../../../core/services/user-services';
import { LanguageContext } from '../../../contexts/language-context';
import { HomeContext } from '../../../contexts/home-context';

const HomeTab = (props) => {
    const [recommendCourses, setRecommendCourses] = useState(null);
    const [errMsgRecommendCourses, setErrMsgRecommendCourses] = useState(null);
    const [recommendCoursesLoading, setRecommendCoursesLoading] = useState(true);
    const [continueLearning, setContinueLearning] = useState(null);
    const [continueLearningLoading, setContinueLearningLoading] = useState(true);
    const [errMsgLoadContinueLearning, setErrMsgLoadContinueLearning] = useState(null);
    const [favorites, setFavorites] = useState(true);
    const [favoritesLoading, setFavoritesLoading] = useState(true);
    const [errMsgLoadFavorites, setErrMsgLoadFavorites] = useState(null);

    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);
    const langContext = useContext(LanguageContext);
    const homeContext = useContext(HomeContext);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton} 
                onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
            />,
            headerRight: () => <Avatar rounded source={authContext.state.userInfo && {uri: authContext.state.userInfo.avatar}} size="small"
                containerStyle={styles.headerButton} onPress={() => props.navigation.navigate(ScreenName.profile)}
            />
        });
    }, [{...theme}]);

    useEffect(() => {
        if (authContext.state.token) {
            UserServices.getProcessCourse(authContext.state.token)
                .then(response => {
                    setContinueLearningLoading(false);
                    if (response.status === 200)
                        setContinueLearning(response.data.payload);
                    else
                        setErrMsgLoadContinueLearning(response.data.message);
                }).catch(error => {
                    setErrMsgLoadContinueLearning(error.message);
                    UserServices.handleError(error);
                });
            UserServices.getFavoriteCourse(authContext.state.token)
                .then(response => {
                    setFavoritesLoading(false);
                    if (response.status === 200)
                        setFavorites(response.data.payload);
                    else
                        setErrMsgLoadFavorites(response.data.message);
                }).catch(error => {
                    setErrMsgLoadFavorites(error.message);
                    UserServices.handleError(error);
                });
        }
    }, [authContext.state.token]);

    useEffect(() => {
        if (homeContext.shouldContinueLearningReload) {
            UserServices.getProcessCourse(authContext.state.token)
                .then(response => {
                    setContinueLearningLoading(false);
                    if (response.status === 200)
                        setContinueLearning(response.data.payload);
                    else
                        setErrMsgLoadContinueLearning(response.data.message);
                }).catch(error => {
                    setErrMsgLoadContinueLearning(error.message);
                    UserServices.handleError(error);
                });
            homeContext.setShouldContinueLearningReload(false);
        }
    }, [homeContext.shouldContinueLearningReload]);

    useEffect(() => {
        if (homeContext.shouldFavoritesReload) {
            UserServices.getFavoriteCourse(authContext.state.token)
                .then(response => {
                    setFavoritesLoading(false);
                    if (response.status === 200)
                        setFavorites(response.data.payload);
                    else
                        setErrMsgLoadFavorites(response.data.message);
                }).catch(error => {
                    setErrMsgLoadFavorites(error.message);
                    UserServices.handleError(error);
                });
            homeContext.setShouldFavoritesReload(false);
        }
    }, [homeContext.shouldFavoritesReload]);

    useEffect(() => {
        if (authContext.state.userInfo) {
            UserServices.recommendCourse(authContext.state.userInfo.id, 10, 0)
                .then(response => {
                    if (response.status === 200)
                        setRecommendCourses(response.data.payload);
                    else
                        setErrMsgRecommendCourses(response.data.message);
                    setRecommendCoursesLoading(false);
                }).catch(error => {
                    setErrMsgRecommendCourses(error.message);
                    setRecommendCoursesLoading(false);
                    UserServices.handleError(error);
                });
        }
    }, [authContext.state.userInfo]);

    const onPressHeaderButton = (screenName, data, theme, style) => {
        props.navigation.navigate(screenName, { data: data, theme: theme, style: style});
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
        <ImageText title={langContext.state.translation["buildFutureApp"]} disableActiveOpacity
            imageSrc={require("../../../../assets/images/background/bg.jpg")}
            style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]} />
        <View style={styles.sectionContainer}>
            {continueLearningLoading
            ? <><Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{langContext.state.translation["continueLearning"]}</Text>
                <ActivityIndicator color={theme.tintColor} /></>
            : errMsgLoadContinueLearning ? <Text style={theme.titleColor}>{homeContext.state.errMsgLoadContinueLearning}</Text>
                : <ListCoursesHorizontal navigation={props.navigation} theme={theme} data={continueLearning}
                    headerTitle={langContext.state.translation["continueLearning"]}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.continueLearning}
                    emptyListIconName="school" emptyListTitle={langContext.state.translation["continueLearningEmptyTitle"]} />}
            {favoritesLoading
            ? <><Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{langContext.state.translation["favorites"]}</Text>
                <ActivityIndicator color={theme.tintColor} /></>
            : errMsgLoadFavorites ? <Text style={theme.titleColor}>{homeContext.state.errMsgLoadFavorites}</Text>
                : <ListCoursesHorizontal navigation={props.navigation} theme={theme} data={favorites}
                    headerTitle={langContext.state.translation["favorites"]}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.favorites}
                    emptyListIconName="favorite" emptyListTitle={langContext.state.translation["favoritesEmptyTitle"]} />}
            {recommendCoursesLoading
            ? <><Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{langContext.state.translation["recommend"]}</Text>
                <ActivityIndicator color={theme.tintColor} /></>
            : errMsgRecommendCourses ? <Text style={theme.titleColor}>{errMsgRecommendCourses}</Text>
                : <ListCoursesHorizontal navigation={props.navigation} theme={theme} data={recommendCourses}
                    headerTitle={langContext.state.translation["recommend"]}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesRecommend}
                    emptyListIconName="filter" emptyListTitle={langContext.state.translation["recommendEmptyTitle"]} />}
        </View>
    </ScrollView>
}

export default HomeTab;

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10
    },
    sectionContainer: {
        marginVertical: 20
    }
});