import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors } from '../../../globals/constants';
import { setCurrentLesson } from '../../../actions/course-detail-action';
import LessonServices from '../../../core/services/lesson-services';
import Utilities from '../../../core/fwk/utilities';

const LessonsTab = (props) => {
    const {theme} = useContext(ThemeContext);

    // Render section course
    const renderSection = (section, theme) => {
        return <FlatList data={section.lesson} ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            keyExtractor={(item, index) => index.toString()} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
            renderItem={({item}) => renderItem(item, theme, props.state.currentLesson ? props.state.currentLesson.id : null)}
            ListHeaderComponent={() => renderSectionHeader(section, theme)} stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />} />
    }

    const renderSectionHeader = (section, theme) => {
        return <View style={[theme.background]}>
            <ListCoursesItem style={theme.background} theme={theme} noActiveOpacity useForHeader
                data={{title: section.name, imageUrl: props.state.courseInfo.imageUrl, totalHours: Utilities.hourToTime(section.sumHours)}} />
                <Divider style={CommonStyles.divider} />
        </View>
    }

    // Update time of last seen for video lesson
    const updateVideoCurrentTime = (lessonId, time) => {
        LessonServices.updateVideoCurrentTime(lessonId, time)
            .then(reponse => {})
            .catch(error => { LessonServices.handleError(error); });
    }

    // Press lesson to change current watching lesson
    const onPressItem = async (item) => {
        if (item.id !== props.state.currentLesson.id && item.id !== props.state.currentLesson.lessonId) {
            // Set learn status of lesson to finish if not
            if (!props.state.currentLesson.isFinish)
                LessonServices.updateLessonStatus(props.state.currentLesson.id || props.state.currentLesson.lessonId)
                    .then(reponse => {})
                    .catch(error => { LessonServices.handleError(error); });
            // Update time of last seen for video lesson base on player type (Youtube Player or Video Player)
            if (props.state.courseInfo.typeUploadVideoLesson === 1)
                props.videoPlayer.current.setOnPlaybackStatusUpdate(status => updateVideoCurrentTime(props.state.currentLesson.id || props.state.currentLesson.lessonId, status.positionMillis));
            else
                props.ytPlayer.current.getCurrentTime().then(async currentTime => updateVideoCurrentTime(props.state.currentLesson.id || props.state.currentLesson.lessonId, await Utilities.secondToMilsecond(currentTime)));
            setCurrentLesson(props.dispatch, item);
        }
    }

    // Render lesson
    const renderItem = (item, theme) => {
        return <ListItem title={item.name} titleStyle={theme.titleColor} containerStyle={[styles.item, theme.background]}
            leftIcon={item.id === props.state.currentLesson.id || item.id === props.state.currentLesson.lessonId
                ? {name: "play-circle", color: Colors.dodgerBlue, size: 15, type: "font-awesome"}
                : item.isFinish ? {name: "check-circle", color: Colors.green, size: 15, type: "font-awesome"}
                : {name: "circle", color: Colors.darkGrey, size: 15, type: "font-awesome"}} titleProps={{numberOfLines: 1}}
            rightElement={item.id === props.state.currentLesson.id || item.id === props.state.currentLesson.lessonId ?
                <Text style={theme.textColor}>{Utilities.hourToTime(item.hours)}</Text> : null}
            onPress={() => onPressItem(item)}
        />
    }

    return <View style={[theme.background, styles.container, CommonStyles.flex]}>
    {
        props.dataLoading ? <ActivityIndicator color={theme.tintColor} />
        : props.errMsgLoading ? <Text>{props.errMsgLoading}</Text>
            : <FlatList data={props.state.courseSection} ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
                keyExtractor={(item, index) => index.toString()} renderItem={({item}) => renderSection(item, theme)}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} />
    }
    </View>
}

export default LessonsTab;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    item: {
        paddingVertical: 0,
        paddingHorizontal: 5,
    },
    shortMarginLeft: {
        marginLeft: 10
    }
});