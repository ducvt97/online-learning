import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

import AvatarTitle from './AvatarTitle/avatar-title';
import SectionHeader from '../../../common/section-header';

import InstructorServices from '../../../../core/services/instructor-service';
import { ScreenName } from '../../../../globals/constants';

const TopAuthors = (props) => {
    const theme = props.theme;
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        InstructorServices.getAll()
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
                InstructorServices.handleError(error);
            })
    }, []);

    const onPressHeaderRightButton = (data, theme, style) => {
        props.navigation.navigate(ScreenName.topInstructor, {data: data, theme: theme, style: style})
    }

    return <View style={styles.container}>
        <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
            rightButtonTitle={data && data.length > 0 ? "See all >" : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
            onPressRightButton={() => onPressHeaderRightButton(data, theme, styles.list)} />
        {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
            : data ? <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()}
                data={data} renderItem={({item}) =>
                    <AvatarTitle title={item["user.name"]} style={styles.item} titleStyle={theme ? theme.titleColor : null}
                        imageUrl={item["user.avatar"]} onPressItem={props.onPressItem} screenName={props.screenName} itemId={item.id} />}/>
            : <Text style={theme ? theme.titleColor : null}>{errorMessage}</Text>
        }
    </View>
}

export default TopAuthors;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    item: {
        marginRight: 15,
        marginBottom: 20
    },
    indicator: {
        alignItems: "center"
    },
    list: {
        paddingHorizontal: 10
    }
});
