import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchData from '../../../raw-data/search';
import ListCourses from '../../Courses/ListCourses/list-courses';
import SectionHeader from '../../common/section-header';
import CommonStyles from '../../../globals/styles';


const Download = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, CommonStyles.flex]}>
            <SectionHeader style={styles.header} title="Download" rightButtonTitle="Remove all" />
            <ListCourses data={SearchData[0].data[0].data} />
        </View>
    )
}

export default Download;

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    }
});
