import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Tile } from 'react-native-elements';

import PopularSkills from './PopularSkills/popular-skills';
import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import TopAuthors from './TopAuthors/top-authors';

import { CommonStyles } from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { CoursesServices } from '../../../core/services/courses-services';

const BrowseTab = (props) => {
    const {theme} = useContext(ThemeContext);

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled>
        <Tile featured title={"NEW RELEASE"}
            imageSrc={require("../../../../assets/images/background/bg.jpg")}
            titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
            containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            imageContainerStyle={CommonStyles.imageButtonBig}
        />
        <Tile featured title={"RECOMMENDED FOR YOU"}
            imageSrc={require("../../../../assets/images/background/bg.jpg")}
            titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
            containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
            imageContainerStyle={CommonStyles.imageButtonBig}
        />
        <View style={styles.container}>
            <PopularSkills theme={theme} headerTitle="Popular Skills Categories" />
            <ListCoursesHorizontal screenName={ScreenName.courseDetail} onPressItem={onPressListItem} theme={theme}
                requestData={CoursesServices.getTopSell} requestDataError={CoursesServices.handleError} headerTitle="Top Sell" />
            <ListCoursesHorizontal screenName={ScreenName.courseDetail} onPressItem={onPressListItem} theme={theme}
                requestData={CoursesServices.getTopRate} requestDataError={CoursesServices.handleError} headerTitle="Top Rate" />
            <TopAuthors screenName={ScreenName.authorDetail} onPressItem={onPressListItem} theme={theme} headerTitle="Top Instructors" />
        </View>
    </ScrollView>
}

export default BrowseTab;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
