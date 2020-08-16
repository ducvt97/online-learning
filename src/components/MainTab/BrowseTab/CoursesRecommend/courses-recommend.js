import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import CoursesServices from '../../../../core/services/courses-services';

const CoursesRecommend = (props) => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        // Get top course rating
        CoursesServices.getTopRate()
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

    return <View style={[styles.container, theme.background, CommonStyles.flex]}>
        {isLoading ? <ActivityIndicator color={theme.tintColor} /> 
            : data ? <ListCourses data={data} theme={theme} navigation={props.navigation} />
            : <Text style={[theme.titleColor, CommonStyles.fontSizeBig]}>{message}</Text>}
    </View>
}

export default CoursesRecommend;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    }
});
