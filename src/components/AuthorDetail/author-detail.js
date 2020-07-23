import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';

import Description from '../common/description';
import ListCourses from '../Courses/ListCourses/list-courses';

import { CommonStyles } from '../../globals/styles';
import { ThemeContext } from '../../contexts/theme-context';
import { ScreenName, Colors } from '../../globals/constants';
import InstructorServices from '../../core/services/instructor-service';
import Spinner from 'react-native-loading-spinner-overlay';

const AuthorDetail = (props) => {
    const instructorId = props.route.params.itemId;
    const [instructor, setInstructor] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        InstructorServices.getDetailById(instructorId)
            .then(reponse => {
                setIsLoading(false);
                if (reponse.status === 200)
                    setInstructor(reponse.data.payload);
                else
                    setMessage(reponse.data.message);
            })
            .catch(error => {
                setIsLoading(false);
                setMessage(error);
                InstructorServices.handleError(error);
            })
    }, []);

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled >
        {isLoading ? <Spinner visible={isLoading} textContent="Loading..." textStyle={styles.indicatorText} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
        : instructor ? <View style={{paddingBottom: 20}}>
            <View style={styles.container}>
                <Avatar rounded source={{uri: instructor.avatar}} size="xlarge" />
                <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{instructor.name}</Text>
                {instructor.major ? <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]}>{instructor.major}</Text> : null}
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Icon name="mail" color={theme.tintColor} style={styles.icon} />
                    <Text style={[theme.textColor, CommonStyles.fontSizeAverage]}>{instructor.email}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Icon name="phone" color={theme.tintColor} style={styles.icon} />
                    <Text style={[theme.textColor, CommonStyles.fontSizeAverage]}>{instructor.phone}</Text>
                </View>
            </View>
            <Description style={CommonStyles.shortMarginVertical} content={instructor.intro} theme={theme} />
            {instructor.skills ? <View>
                <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}>Skills</Text>
                <FlatList data={instructor.skills} keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.skill]}>&#8226; {item}</Text>} />
            </View>: null}
            <Divider style={CommonStyles.divider} />
            <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}>Courses</Text>
            <ListCourses data={instructor.courses} theme={theme} screenName={ScreenName.courseDetail} />
        </View>
        : <Text>{message}</Text>}
    </ScrollView>
}

export default AuthorDetail;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    icon: {
        marginRight: 10
    },
    skill: {
        marginVertical: 3,
        marginLeft: 5
    },
    indicatorText: {
        color: Colors.ghostWhite,
        fontSize: 30,
        fontWeight: "bold"
    }
});