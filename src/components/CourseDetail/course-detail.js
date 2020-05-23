import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

import CourseDetailInfo from './CourseDetailInfo/course-detail-info';
import CommonStyles from '../../globals/styles';
import CourseDetailData from '../../raw-data/course-detail';

const CourseDetail = (props) => {
    return (
        <View style={[CommonStyles.flex, styles.container]}>
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
    }
});