import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import CoursesServices from '../../../../core/services/courses-services';
import { ScreenName } from '../../../../globals/constants';
import { LanguageContext } from '../../../../contexts/language-context';

const CoursesOfCategory = (props) => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        CoursesServices.searchByCategory(props.route.params.category.id)
            .then(response => {
                setIsLoading(false);
                if(response.status === 200)
                    setData(response.data.payload.rows);
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
        <Text style={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, theme.titleColor, styles.header]}>{langContext.state.translation["category"]} "{props.route.params.category.name}"</Text>
        {isLoading ? <ActivityIndicator color={theme.tintColor} /> 
            : data ? <ListCourses data={data} style={styles.list} navigation={props.navigation} theme={theme} screenName={ScreenName.courseDetail} />
            : <Text style={[theme.titleColor, CommonStyles.fontSizeBig]}>{message}</Text>}
    </View>
}

export default CoursesOfCategory;

const styles = StyleSheet.create({
    header: {
        marginVertical: 10
    },
    list: {
        marginBottom: 50
    }
});