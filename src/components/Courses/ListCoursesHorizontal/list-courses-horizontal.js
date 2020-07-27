import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';

import CourseBox from '../../common/course-box';
import ListEmptyBox from '../../common/list-empty-box';
import SectionHeader from '../../common/section-header';
import { ScreenName } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';

const ListCoursesHorizontal = (props) => {
    const theme = props.theme;
    const [data, setData] = useState(props.data);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthenticationContext);

    useEffect(() => {
        if (!data)
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
                else setIsLoading(false);
    }, []);

    const onPressItem = (screenName, itemId) => {
        if (authContext.state.authenticated)
            props.navigation.navigate(screenName, { itemId: itemId });
        else
            alert("You have to login to see course detail.");
    }

    return <View style={[styles.container, props.style]}>
        {props.headerTitle ? <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
            rightButtonTitle={data && data.length > 0 ? "See all >" : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
            onPressRightButton={() => props.onPressHeaderButton(props.headerScreenName, data, theme, styles.list)} />
        : null}
        {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
        : data ? data.length > 0 ?
            <FlatList horizontal={true} data={data.length > 5 ? data.slice(0, 5) : data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CourseBox style={styles.item} data={item} navigation={props.navigation} 
                    onPress={() => onPressItem(ScreenName.courseDetail, item.id)} />} />
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
