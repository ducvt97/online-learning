import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import PopularSkills from './PopularSkills/popular-skills';
import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import TopInstructors from './TopInstructors/top-instructors';
import ImageText from '../../common/image-text';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import CoursesServices from '../../../core/services/courses-services';

const BrowseTab = (props) => {
    const {theme} = useContext(ThemeContext);

    const onPressHeaderButton = (screenName, data, theme, style) => {
        props.navigation.navigate(screenName, { data: data, theme: theme, style: style});
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
        <ImageText imageSrc={require("../../../../assets/images/background/bg.jpg")} title="NEW RELEASE"
            style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            onPress={() => props.navigation.navigate(ScreenName.coursesTopNew)} />
        <ImageText imageSrc={require("../../../../assets/images/background/bg.jpg")} title={`RECOMMENDED\nFOR YOU`}
            style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            onPress={() => props.navigation.navigate(ScreenName.coursesRecommend)} />
        <View style={styles.container}>
            <PopularSkills theme={theme} {...props} />
            <ListCoursesHorizontal navigation={props.navigation} theme={theme} headerTitle="Top Sell"
                requestData={CoursesServices.getTopSell} requestDataError={CoursesServices.handleError}
                onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopSell} />
            <ListCoursesHorizontal navigation={props.navigation} theme={theme} headerTitle="Top Rate"
                requestData={CoursesServices.getTopRate} requestDataError={CoursesServices.handleError}
                onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopRate} />
            <TopInstructors screenName={ScreenName.instructorDetail} onPressHeaderButton={onPressHeaderButton} theme={theme} 
                navigation={props.navigation} headerTitle="Top Instructors" />
        </View>
    </ScrollView>
}

export default BrowseTab;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
