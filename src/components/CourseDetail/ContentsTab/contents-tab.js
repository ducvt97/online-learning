import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors } from '../../../globals/constants';
import { setCurrentLesson } from '../../../actions/course-detail-action';
import LessonServices from '../../../core/services/lesson-services';
import Utilities from '../../../core/fwk/utilities';

const ContentsTab = (props) => {
    const {theme} = useContext(ThemeContext);

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

    const onPressItem = async (item) => {
        if (!item.isFinish)
            LessonServices.updateLessonStatus(item.id)
                .then(reponse => {})
                .catch(error => { LessonServices.handleError(error); });
        setCurrentLesson(props.dispatch, item);
    }

    const renderItem = (item, theme, currentPlaying) => {
        return <ListItem title={item.name} titleStyle={theme.titleColor} containerStyle={[styles.item, theme.background]}
            leftIcon={item.id === currentPlaying ? {name: "play-circle", color: Colors.dodgerBlue, size: 15, type: "font-awesome"}
                : item.isFinish ? {name: "check-circle", color: Colors.green, size: 15, type: "font-awesome"}
                : {name: "circle", color: Colors.darkGrey, size: 15, type: "font-awesome"}} titleProps={{numberOfLines: 1}}
            rightElement={item.id === currentPlaying ? <Text style={theme.textColor}>{Utilities.hourToTime(item.hours)}</Text> : null}
            onPress={() => onPressItem(item)}
        />
    }

    return <View style={[theme.background, styles.container]}>
        <FlatList data={props.state.courseSection} ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            keyExtractor={(item, index) => index.toString()} renderItem={({item}) => renderSection(item, theme)}
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} />
        <Divider style={CommonStyles.divider} />
    </View>
}

export default ContentsTab;

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