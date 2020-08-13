import React, { useContext } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import CourseBox from '../../common/course-box';
import ListEmptyBox from '../../common/list-empty-box';
import SectionHeader from '../../common/section-header';
import { ScreenName } from '../../../globals/constants';
import { LanguageContext } from '../../../contexts/language-context';

const ListCoursesHorizontal = (props) => {
    const theme = props.theme;
    const data = props.data;

    const langContext = useContext(LanguageContext);

    const onPressItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, { itemId: itemId });
    }

    return <View style={[styles.container, props.style]}>
        {props.headerTitle ? <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
            rightButtonTitle={data && data.length > 0 ? `${langContext.state.translation["seeMore"]} >` : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
            onPressRightButton={() => props.onPressHeaderButton(props.headerScreenName, data, theme, styles.list)} />
        : null}
        {data ? data.length > 0 ?
            <FlatList horizontal={true} data={data.length > 5 ? data.slice(0, 5) : data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CourseBox style={styles.item} data={item} navigation={props.navigation} 
                    onPress={() => onPressItem(ScreenName.courseDetail, item.id)} />} />
            : props.emptyListTitle ?
                <ListEmptyBox theme={props.theme} icon={{name: props.emptyListIconName, size: 30}} content={props.emptyListTitle} />
                : <Text style={theme ? theme.titleColor : null}>{langContext.state.translation["nothingShow"]}</Text>
        : null}
    </View>
}

export default ListCoursesHorizontal;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    item: {
        marginRight: 10,
        marginBottom: 10
    },
    indicator: {
        alignItems: "center"
    },
    list: {
        paddingHorizontal: 10
    }
});
