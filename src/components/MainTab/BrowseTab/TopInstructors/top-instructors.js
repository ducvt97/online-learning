import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

import AvatarTitle from './AvatarTitle/avatar-title';
import SectionHeader from '../../../common/section-header';

import InstructorServices from '../../../../core/services/instructor-service';
import { ScreenName } from '../../../../globals/constants';
import { LanguageContext } from '../../../../contexts/language-context';

const TopInstructors = (props) => {
    const theme = props.theme;
    const langContext = useContext(LanguageContext);
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

    const onPressItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const onPressHeaderRightButton = (data, theme, style) => {
        props.navigation.navigate(ScreenName.topInstructor, {data: data, theme: theme, style: style})
    }

    return <View style={styles.container}>
        <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
            rightButtonTitle={data && data.length > 0 ? `${langContext.state.translation["seeMore"]} >` : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
            onPressRightButton={() => onPressHeaderRightButton(data, theme, styles.list)} />
        {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
            : data ? <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()}
                data={data.length > 10 ? data.slice(0, 10) : data}
                renderItem={({item}) =>
                    <AvatarTitle title={item["user.name"]} style={styles.item} titleStyle={theme ? theme.titleColor : null} size="large"
                        imageUrl={item["user.avatar"]} onPressItem={() => onPressItem(ScreenName.instructorDetail, item.id)} itemId={item.id} />}/>
            : <Text style={theme ? theme.titleColor : null}>{errorMessage}</Text>
        }
    </View>
}

export default TopInstructors;

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
