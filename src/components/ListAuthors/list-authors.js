import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors, ScreenName } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';

const ListAuthors = (props) => {
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
            onPress={() => onPressItem(ScreenName.authorDetail, item.id)}
        />
    }

    return data ? <View style={[styles.container, props.style || props.route ? props.route.params.style : {}]}>
        <FlatList data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem} />
    </View> : null;
}

export default ListAuthors;

const styles = StyleSheet.create({
    container: {
        // marginBottom: 40
    },
    item: {
        backgroundColor: Colors.transparent
    }
});
