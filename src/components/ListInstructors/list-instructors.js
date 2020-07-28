import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import SectionHeader from '../common/section-header';
import { CommonStyles } from '../../globals/styles';
import { Colors, ScreenName } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';

const ListInstructors = (props) => {
    const data = props.data || props.route.params.data;
    const {theme} = useContext(ThemeContext);

    const onPressItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const renderItem = ({ item }) => {
        return <ListItem containerStyle={styles.item} subtitleStyle={theme.textColor}
            titleStyle={[CommonStyles.fontWeightBold, theme.titleColor]}
            title={item["user.name"]}
            subtitle={item.major}
            leftAvatar={{ source: { uri: item["user.avatar"] } }}
            bottomDivider
            onPress={() => onPressItem(ScreenName.instructorDetail, item.id)}
        />
    }

    return <View style={[theme.background, props.style ? props.style : props.route ? props.route.params.style : {}]}>
        {props.headerTitle &&
            <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null}
                rightButtonTitle={data.length > 0 ? props.rightButtonTitle : null} rightButtonTitleStyle={theme ? theme.titleColor : null}
                onPressRightButton={props.onPressHeaderButton} />}
        {data && data.length > 0 ? <FlatList data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem} />
        : <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, styles.text]}>{props.emptyListText}</Text>}
    </View>;
}

export default ListInstructors;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    },
    text: {
        marginVertical: 5
    }
});
