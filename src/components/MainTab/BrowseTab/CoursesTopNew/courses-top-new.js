import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import CoursesServices from '../../../../core/services/courses-services';
import { ScreenName } from '../../../../globals/constants';

const CoursesTopNew = (props) => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        CoursesServices.getTopNew()
            .then(response => {
                setIsLoading(false);
                if(response.status === 200)
                    setData(response.data.payload);
                else
                    setMessage(response.data.message);
            })
            .catch(error => {
                setIsLoading(false);
                setMessage(error);
                CoursesServices.handleError(error);
            })
    }, []);

    return <View style={[CommonStyles.shortPaddingHorizontal, theme.background, CommonStyles.flex]}>
        {isLoading ? <ActivityIndicator color={theme.tintColor} /> 
            : data ? <ListCourses data={data} navigation={props.navigation} theme={theme} screenName={ScreenName.courseDetail} />
            : <Text style={[theme.titleColor, CommonStyles.fontSizeBig]}>{message}</Text>}
    </View>
}

export default CoursesTopNew;
