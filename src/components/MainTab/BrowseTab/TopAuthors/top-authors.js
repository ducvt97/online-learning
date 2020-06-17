import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import AvatarTitle from './AvatarTitle/avatar-title';
import { ThemeContext } from '../../../../contexts/theme-context';

const TopAuthors = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()}
                data={props.data} renderItem={({item}) => 
                    <AvatarTitle title={item.name} style={styles.item} titleStyle={theme.titleColor} imageSrc={item.image}
                        onPressItem={props.onPressItem} screenName={props.screenName} itemId={item.id} />}
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
