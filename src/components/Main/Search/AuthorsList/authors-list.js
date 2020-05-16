import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CommonStyles from '../../../../globals/styles';
import Colors from '../../../../globals/constants/colors';
import { ListItem } from 'react-native-elements';

const AuthorsList = (props) => {
    renderItem = ({ item }) => (
        <ListItem containerStyle={styles.item} subtitleStyle={CommonStyles.textColor}
            titleStyle={[CommonStyles.fontWeightBold, CommonStyles.titleColor]}
            title={item.name}
            subtitle={item.courses + " courses"}
            leftAvatar={{ source: require("../../../../../assets/avatar.jpg") }}
            bottomDivider
            chevron
        />
    )

    return (
        <View style={props.style}>
            <FlatList
                keyExtractor={(item) => item}
                data={props.data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default AuthorsList;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});
