import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import SectionHeader from '../../../common/section-header';
import NotFoundView from '../NotFoundView/not-found-view';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { Colors, ScreenName } from '../../../../globals/constants';
import { SearchContext } from '../../../../contexts/search-context';

const SearchAuthorsTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const {searches} = useContext(SearchContext);

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const renderItem = ({ item }) => (
        <ListItem containerStyle={styles.item} subtitleStyle={theme.textColor}
            titleStyle={[CommonStyles.fontWeightBold, theme.titleColor]}
            title={item.name} subtitle={item.courses + " courses"}
            onPress={() => onPressListItem(ScreenName.authorDetail, item.id)}
            leftAvatar={{ source: require("../../../../../assets/avatar.jpg") }}
            bottomDivider
        />
    )

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            {props.data.length > 0 ? <SectionHeader title={props.data.length + " Results"} titleStyle={theme.titleColor} />
                : <NotFoundView theme={theme} showIcon subtitle={`We couldn't find any matches for "${searches.currentSearchText}"`} />}
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={props.data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default SearchAuthorsTab;

const styles = StyleSheet.create({
    container: {
        marginBottom: 40
    },
    item: {
        backgroundColor: Colors.transparent
    }
});