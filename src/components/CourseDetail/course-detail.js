import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';

import CourseDetailInfo from './CourseDetailInfo/course-detail-info';
import ContentsTab from './ContentsTab/contents-tab';

import { CommonStyles } from '../../globals/styles';
import { Colors, ScreenName, ScreenTitle } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';
import { getCourseById } from '../../core/services/courses-services';
import TranscriptTab from './TranscriptTab/transcript-tab';

const TopTabBar = createMaterialTopTabNavigator();

const TopTabBarNavigation = (props) => {
    const theme = props.theme;
    const transcript = props.transcript;
    const contents = props.contents;

    return <TopTabBar.Navigator initialRouteName={ScreenName.contentsTab}
        tabBarOptions={{ activeTintColor: Colors.dodgerBlue,
            inactiveTintColor: theme.inactiveTintColor,
            style: theme.navigationHeader,
            labelStyle: [CommonStyles.fontSizeSmall, CommonStyles.fontWeightBold, {paddingHorizontal: 0, paddingVertical: 0}] }}>
        <TopTabBar.Screen name={ScreenName.contentsTab}
            options={{ headerShown: false,
                tabBarLabel: ScreenTitle.contentsTab }}
        >
            {({props}) => (<ContentsTab {...props} data={contents} />)}
        </TopTabBar.Screen>
        <TopTabBar.Screen name={ScreenName.transcriptTab}
            options={{ headerShown: false,
                tabBarLabel: ScreenTitle.transcriptTab }}
        >
            {({props}) => (<TranscriptTab {...props} data={transcript} />)}
        </TopTabBar.Screen>
    </TopTabBar.Navigator>
}

const CourseDetail = (props) => {
    const courseId = props.route.params.itemId;
    const course = getCourseById(courseId);
    
    const {theme} = useContext(ThemeContext);

    return <View style={[styles.container, theme.background]}>
        <Icon name="close" size={30} color={Colors.gainsboro} containerStyle={styles.backButton}
            onPress={() => props.navigation.goBack()} />
        <Video source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
            rate={1.0} volume={1.0} shouldCorrectPitch={true} isMuted={false} resizeMode="cover"
            shouldPlay isLooping style={styles.video} useNativeControls
        />
        <ScrollView nestedScrollEnabled>
            <CourseDetailInfo data={course} />
            <TopTabBarNavigation theme={theme} contents={course.contents} transcript={course.transcript} />
        </ScrollView>
    </View>
}

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    video: {
        height: 150
    },
    backButton: {
        position: "absolute",
        zIndex: 300,
        marginTop: 10,
        marginLeft: 10
    }
});