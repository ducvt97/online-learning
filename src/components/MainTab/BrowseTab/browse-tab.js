import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import PopularSkills from './PopularSkills/popular-skills';
import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import TopInstructors from './TopInstructors/top-instructors';
import ImageText from '../../common/image-text';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';
import CoursesServices from '../../../core/services/courses-services';

const BrowseTab = (props) => {
    const [coursesTopSell, setCoursesTopSell] = useState(null);
    const [errMsgCoursesTopSell, setErrMsgCoursesTopSell] = useState(null);
    const [coursesTopSellLoading, setCoursesTopSellLoading] = useState(true);
    const [coursesTopRate, setCoursesTopRate] = useState(null);
    const [errMsgCoursesTopRate, setErrMsgCoursesTopRate] = useState(null);
    const [CoursesTopRateLoading, setCoursesTopRateLoading] = useState(true);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        // Get list courses top selling
        CoursesServices.getTopSell()
            .then(response => {
                setCoursesTopSellLoading(false);
                if (response.status === 200)
                    setCoursesTopSell(response.data.payload);
                else
                    setErrMsgCoursesTopSell(response.data.message);
            }).catch(error => {
                setErrMsgCoursesTopSell(error.message);
                CoursesServices.handleError(error);
            });
        // Get list courses top rating
        CoursesServices.getTopRate()
            .then(response => {
                setCoursesTopRateLoading(false);
                if (response.status === 200)
                    setCoursesTopRate(response.data.payload);
                else
                    setErrMsgCoursesTopRate(response.data.message);
            }).catch(error => {
                setErrMsgCoursesTopRate(error.message);
                CoursesServices.handleError(error);
            });
    }, []);

    const onPressHeaderButton = (screenName, data, theme, style) => {
        props.navigation.navigate(screenName, { data: data, theme: theme, style: style});
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
        <ImageText imageSrc={require("../../../../assets/images/background/bg.jpg")} title={langContext.state.translation["newRelease"]}
            style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            onPress={() => props.navigation.navigate(ScreenName.coursesTopNew)} />
        <ImageText imageSrc={require("../../../../assets/images/background/bg.jpg")} title={langContext.state.translation["recommendForYou"]}
            style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            onPress={() => props.navigation.navigate(ScreenName.coursesRecommend)} />
        <View style={styles.container}>
            <PopularSkills theme={theme} {...props} />
            {coursesTopSellLoading
            ? <><Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{langContext.state.translation["topSell"]}</Text>
                <ActivityIndicator color={theme.tintColor} /></>
            : errMsgCoursesTopSell ? <Text style={theme.titleColor}>{errMsgCoursesTopSell}</Text>
                : <ListCoursesHorizontal navigation={props.navigation} theme={theme} data={coursesTopSell}
                    headerTitle={langContext.state.translation["topSell"]}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopSell}
                    emptyListIconName="school" emptyListTitle={langContext.state.translation["continueLearningEmptyTitle"]} />}
            {CoursesTopRateLoading
            ? <><Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{langContext.state.translation["topRate"]}</Text>
                <ActivityIndicator color={theme.tintColor} /></>
            : errMsgCoursesTopRate ? <Text style={theme.titleColor}>{errMsgCoursesTopRate}</Text>
                : <ListCoursesHorizontal navigation={props.navigation} theme={theme} data={coursesTopRate}
                    headerTitle={langContext.state.translation["topSell"]}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopRate}
                    emptyListIconName="school" emptyListTitle={langContext.state.translation["continueLearningEmptyTitle"]} />}
            <TopInstructors screenName={ScreenName.instructorDetail} onPressHeaderButton={onPressHeaderButton} theme={theme} 
                navigation={props.navigation} headerTitle={langContext.state.translation["topInstructor"]} />
        </View>
    </ScrollView>
}

export default BrowseTab;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
