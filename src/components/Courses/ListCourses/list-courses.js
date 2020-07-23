import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Divider } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import SectionHeader from '../../common/section-header';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const ListCourses = (props) => {
    const data = props.data || props.route.params.data;
    const theme = props.theme;

    const onPressItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <View style={props.style ? props.style : props.route ? props.route.params.style : {}}>
            {props.headerTitle &&
                <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
                    rightButtonTitle={data.length > 0 ? props.rightButtonTitle : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
                    onPressRightButton={props.onPressHeaderButton} />}
            {data && data.length > 0 ?
                <FlatList data={data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <ListCoursesItem data={item} style={styles.item}
                        onPress={() => onPressItem(ScreenName.courseDetail, item.id)}
                        theme={props.theme || props.route.params.theme} />}
                    ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />} />
            : <Text style={[theme ? theme.titleColor : {}, CommonStyles.fontSizeAverage, styles.text]}>{props.emptyListText}</Text>}
        </View>
    )
}

export default ListCourses;

const styles = StyleSheet.create({
    item: {
        marginVertical: 10
    },
    text: {
        marginVertical: 5
    }
});
