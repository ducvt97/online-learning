import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import CommonStyles from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';

const AuthorsList = (props) => {
    const renderItem = ({ item }) => (
        <ListItem containerStyle={styles.item} subtitleStyle={CommonStyles.textColor}
            titleStyle={[CommonStyles.fontWeightBold, CommonStyles.titleColor]}
            title={item.name}
            subtitle={item.courses + " courses"}
            leftAvatar={{ source: require("../../../../../assets/avatar.jpg") }}
            bottomDivider
        />
    )

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
