import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import AvatarTitle from './AvatarTitle/avatar-title';

const TopAuthors = (props) => {
    return (
        <View style={styles.container}>
            <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()}
                data={props.data} renderItem={({item}) => <AvatarTitle title={item} style={styles.item} />}
            />
        </View>
    )
}

export default TopAuthors;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    item: {
        marginRight: 15,
        marginBottom: 20
    }
});
