import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../../../globals/constants/colors';
import SearchData from '../../../raw-data/search';
import ListCourses from '../../Courses/ListCourses/list-courses';
import SectionHeader from '../../common/section-header';
import CommonStyles from '../../../globals/styles';


const Download = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, CommonStyles.flex]}>
            <SectionHeader title="Download" rightButtonTitle="Remove all" />
            <ListCourses data={SearchData[0].data[0].data} />
        </View>
    )
}

export default Download;

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 30,
        backgroundColor: Colors.boldGrey
    },
    buttonCancel: {
        marginTop: 10,
        marginRight: 5
    }
});
