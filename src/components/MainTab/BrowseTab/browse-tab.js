import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Tile } from 'react-native-elements';

import PopularSkills from './PopularSkills/popular-skills';
import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import TopAuthors from './TopAuthors/top-authors';

import { CommonStyles } from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import CoursesServices from '../../../core/services/courses-services';

const BrowseTab = (props) => {
    const {theme} = useContext(ThemeContext);

    const onPressHeaderButton = (screenName, data, theme, style) => {
        props.navigation.navigate(screenName, { data: data, theme: theme, style: style});
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled>
        <Tile featured title={"NEW RELEASE"}
            imageSrc={require("../../../../assets/images/background/bg.jpg")}
            titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
            containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            imageContainerStyle={CommonStyles.imageButtonBig}
            onPress={() => props.navigation.navigate(ScreenName.coursesTopNew)}
        />
        <Tile featured title={"RECOMMENDED FOR YOU"}
            imageSrc={require("../../../../assets/images/background/bg.jpg")}
            titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
            containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            imageContainerStyle={CommonStyles.imageButtonBig}
            onPress={() => props.navigation.navigate(ScreenName.coursesRecommend)}
        />
        <View style={styles.container}>
            <PopularSkills theme={theme} headerTitle="Popular Skills Categories" />
            <ListCoursesHorizontal screenName={ScreenName.courseDetail} navigation={props.navigation} theme={theme}
                requestData={CoursesServices.getTopSell} requestDataError={CoursesServices.handleError} headerTitle="Top Sell"
                onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopSell} />
            <ListCoursesHorizontal screenName={ScreenName.courseDetail} navigation={props.navigation} theme={theme}
                requestData={CoursesServices.getTopRate} requestDataError={CoursesServices.handleError} headerTitle="Top Rate"
                onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.coursesTopRate} />
            <TopAuthors screenName={ScreenName.authorDetail} onPressHeaderButton={onPressHeaderButton} theme={theme} 
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
