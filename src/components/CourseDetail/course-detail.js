import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';

import CourseDetailInfo from './CourseDetailInfo/course-detail-info';

import { CommonStyles } from '../../globals/styles';
import CourseDetailData from '../../raw-data/course-detail';
import { Colors } from '../../globals/constants';

const CourseDetail = (props) => {
    return (
        <View style={[CommonStyles.flex, styles.container]}>
            <Icon name="close" size={30} color={Colors.gainsboro} containerStyle={styles.backButton}
                onPress={() => props.navigation.goBack()} />
            <Video
                source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                rate={1.0}
                volume={1.0}
                shouldCorrectPitch={true}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.video}
                useNativeControls
            />
            <CourseDetailInfo data={CourseDetailData} />
        </View>
    )
}

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    video: {
        height: 250
    },
    backButton: {
        position: "absolute",
        zIndex: 300,
        marginTop: 10,
        marginLeft: 10
    }
});