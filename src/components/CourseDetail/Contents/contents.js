import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors } from '../../../globals/constants';
import { setCourseSection } from '../../../actions/course-detail-action';
import LessonServices from '../../../core/services/lesson-services';
import ExerciseServices from '../../../core/services/exercise-services';
import LessonsTab from '../LessonsTab/lessons-tab';
import ExercisesTab from '../ExercisesTab/exercises-tab';

const Contents = (props) => {
    const {theme} = useContext(ThemeContext);
    const [sectionsLoading, setSectionsLoading] = useState(true);
    const [errMsgSections, setErrMsgSections] = useState(null);
    const [exercisesLoading, setExercisesLoading] = useState(true);
    const [errMsgExercises, setErrMsgExercises] = useState(null);

    const buttons = ["Lessons", "Exercises"];
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        if (props.state.userBuyCourse) {
            const loadSections = async () => {
                let sections = [];
                for (const section of props.state.courseInfo.section) {
                    let lessons = [];
                    for (const lesson of section.lesson) {
                        let temp = {};
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