import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import TabAll from '../TabAll/tab-all';
import ListCourses from '../../../Courses/ListCourses/list-courses';
import SectionHeader from '../../../common/section-header';
import AuthorsList from '../AuthorsList/authors-list';
import CommonStyles from '../../../../globals/styles';
import Colors from '../../../../globals/constants/colors';

const SearchResults = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = ["All", "Courses","Paths", "Authors"];
    const coursesData = props.data[0];
    const pathsData = props.data[1];
    const authorsData = props.data[2];

    const pressTab = (selectedIndex) => {
        if (selectedIndex != selectedTab) {
            setSelectedTab(selectedTab => selectedIndex);
        }
    }
    
    return (
        <View style={CommonStyles.flex}>
            <ButtonGroup buttons={tabs} onPress={pressTab} selectedIndex={selectedTab}
                containerStyle={styles.tabButton}
                textStyle={CommonStyles.fontWeightBold}
                selectedButtonStyle={styles.selectedTab}
                selectedTextStyle={styles.selectedTabText}
                disabledStyle={styles.disabledTab}
                disabledTextStyle={styles.disabledText}
            />
            <View style={[styles.container, CommonStyles.flex]}>
                {
                    selectedTab === 0 ? <TabAll data={props.data} />
                    : selectedTab === 1 ?
                        <View>
                            <SectionHeader title={coursesData.results + " Results"} />
                            <ListCourses data={coursesData.data[0].data} />
                        </View>
                    : selectedTab === 2 ?
                        <View>
                            <SectionHeader title={pathsData.results + " Results"} />
                            <ListCourses data={pathsData.data[0].data} />
                        </View>
                    : selectedTab === 3 ?
                        <View>
                            <SectionHeader title={authorsData.results + " Results"} />
                            <AuthorsList data={authorsData.data[0].data} />
                        </View>
                    : null
                }
            </View>
        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    tabButton: {
        backgroundColor: Colors.transparent,
        borderWidth: 0,
        borderBottomWidth: 1
    },
    selectedTab: {
        backgroundColor: Colors.transparent,
        borderBottomWidth: 3,
        borderBottomColor: Colors.dodgerBlue
    },
    selectedTabText: {
        color: Colors.white
    },
    disabledTab: {
        backgroundColor: Colors.transparent
    },
    disabledTabText: {
        color: Colors.gainsboro
    }
});