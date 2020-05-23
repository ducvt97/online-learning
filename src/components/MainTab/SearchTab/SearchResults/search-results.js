import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CommonStyles from '../../../../globals/styles';
import { Colors, ScreenName } from '../../../../globals/constants';
import { ListItem } from 'react-native-elements';

const SearchResults = (props) => {
    const data = ["react", "react-native", "reactjs", "react-redux"];
    
    const renderItem = ({item}) => (
        <ListItem containerStyle={styles.item} title={item}
            titleStyle={[CommonStyles.fontSizeAverage, CommonStyles.textColor]}
            onPress={() => props.navigation.navigate(ScreenName.searchResultsTabNavigation, {searchText: props.route.params.searchText})}
            leftIcon={{ name: "search", color: Colors.gainsboro }}
            bottomDivider
        />
    )

    return (
        <View style={CommonStyles.generalContainer}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});
