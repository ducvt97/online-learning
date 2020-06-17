import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';

const AuthorsList = (props) => {
    const {theme} = useContext(ThemeContext);

    const renderItem = ({ item }) => {
        return <ListItem containerStyle={styles.item} subtitleStyle={theme.textColor}
            titleStyle={[CommonStyles.fontWeightBold, theme.titleColor]}
            title={item.name}
            subtitle={item.courses + " courses"}
            leftAvatar={{ source: item.image }}
            bottomDivider
            onPress={() => props.onPressItem(props.screenName, item.id)}
        />
    }

    return (
        <View style={[props.style, styles.container]}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={props.data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default AuthorsList;

const styles = StyleSheet.create({
    container: {
        marginBottom: 40
    },
    item: {
        backgroundColor: Colors.transparent
    }
});
