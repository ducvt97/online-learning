import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Divider } from 'react-native-elements';

import LessonsTab from '../LessonsTab/lessons-tab';
import ExercisesTab from '../ExercisesTab/exercises-tab';

import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors } from '../../../globals/constants';
import { setCourseSection, setTotalLessons } from '../../../actions/course-detail-action';
import LessonServices from '../../../core/services/lesson-services';
import ExerciseServices from '../../../core/services/exercise-services';
import { LanguageContext } from '../../../contexts/language-context';

const Contents = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const [sectionsLoading, setSectionsLoading] = useState(true);
    const [errMsgSections, setErrMsgSections] = useState(null);
    const [exercisesLoading, setExercisesLoading] = useState(true);
    const [errMsgExercises, setErrMsgExercises] = useState(null);

    // Button group tab name
    const buttons = [langContext.state.translation["lesson"], langContext.state.translation["exercise"]];
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        if (props.state.userBuyCourse) {
            const loadSections = async () => {
                let sections = [];
                let totalLessons = 0;
                // For loop to get more information from each lesson
                for (const section of props.state.courseInfo.section) {
                    let lessons = [];
                    for (const lesson of section.lesson) {
                        let temp = {};
                        totalLessons += 1;
                        // Get user status of lesson
                        await LessonServices.getVideoStatus(props.state.courseInfo.id, lesson.id)
                            .then(response => {
                                if (response.status === 200)
                                    temp = {...temp, ...lesson, ...{
                                        currentTime: response.data.payload.currentTime,
                                        isFinish: response.data.payload.isFinish
                                    }};
                                else
                                    setErrMsgSections(response.data.message);
                            }).catch(error => {
                                setErrMsgSections(error.message);
                                LessonServices.handleError(error);
                            });
                        // Get exercises of lesson
                        await ExerciseServices.getByLessonId(lesson.id)
                            .then(response => {
                                if (response.status === 200)
                                    temp = {...temp, ...{ exercises: response.data.payload.exercises }};
                                else
                                    setErrMsgExercises(response.data.message);
                            }).catch(error => {
                                setErrMsgExercises(error.message);
                                ExerciseServices.handleError(error);
                            });
                        lessons.push(temp);
                    }
                    sections.push({...section, lesson: lessons});
                }
                setSectionsLoading(false);
                setExercisesLoading(false);
                setCourseSection(props.dispatch, sections);
                setTotalLessons(props.dispatch, totalLessons);
            }
            loadSections();
        }
    }, [props.state.userBuyCourse]);

    return <View style={[theme.background, CommonStyles.flex, CommonStyles.shortMarginVertical]}>
        <ButtonGroup buttons={buttons} onPress={setCurrentTab} selectedIndex={currentTab}
            containerStyle={[styles.btnGroupContainer, theme.navigationHeader]}
            selectedButtonStyle={[theme.navigationHeader, styles.selectedBtn]} innerBorderStyle={{ width: 0 }}
            textStyle={[CommonStyles.fontWeightBold, theme.textColor]} selectedTextStyle={theme.titleColor} />
        {currentTab === 0 ? <LessonsTab {...props} dataLoading={sectionsLoading} errMsgLoading={errMsgSections} />
        : <ExercisesTab {...props} dataLoading={exercisesLoading} errMsgLoading={errMsgExercises} />}
        <Divider style={CommonStyles.divider} />
    </View>
}

export default Contents;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnGroupContainer: {
        borderRadius: 0,
        marginHorizontal: -1,
        borderWidth: 0
    },
    selectedBtn: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.dodgerBlue
    }
});