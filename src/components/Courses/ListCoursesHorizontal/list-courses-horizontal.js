import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';

import CourseBox from '../../common/course-box';
import ListEmptyBox from '../../common/list-empty-box';
import SectionHeader from '../../common/section-header';

const ListCoursesHorizontal = (props) => {
    const theme = props.theme;
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.requestData()
            .then(response => {
                setIsLoading(false);
                if (response.status === 200)
                    setData(response.data.payload);
                else
                    setErrorMessage(response.data.message);
            })
            .catch(error => {
                setIsLoading(false);
                setErrorMessage(error);
                props.requestDataError(error);
            })
    }, []);

    return <View style={styles.container}>
        <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
            rightButtonTitle={data && data.length > 0 ? "See all >" : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
            onPressRightButton={() => props.onPressHeaderButton(props.headerScreenName, data, theme, styles.list)} />
            {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
            : data ? data.length > 0 ?
                <FlatList style={props.style} horizontal={true} data={data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <CourseBox style={styles.item} data={item} navigation={props.navigation} 
                        onPress={() => props.onPressItem(props.screenName, item.id)} />} />
                : props.emptyListTitle ?
                    <ListEmptyBox theme={props.theme} icon={{name: props.emptyListIconName, size: 30}} content={props.emptyListTitle} />
                    : <Text style={theme ? theme.titleColor : null}>Nothing to show</Text>
            : <Text style={theme ? theme.titleColor : null}>{errorMessage}</Text>}
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
