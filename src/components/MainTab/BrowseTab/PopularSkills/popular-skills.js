import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, ActivityIndicator } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ImageText from '../../../common/image-text';

import { CommonStyles } from '../../../../globals/styles';
import { Colors, ScreenName } from '../../../../globals/constants';
import CategoryServices from '../../../../core/services/category-services';
import { LanguageContext } from '../../../../contexts/language-context';

const PopularSkills = (props) => {
    const theme = props.theme;
    const langContext = useContext(LanguageContext);
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get list categories
        CategoryServices.getAll()
            .then(response => {
                setIsLoading(false);
                if (response.status === 200)
                    setCategories(response.data.payload);
                else
                    setErrorMessage(response.data.message);
            })
            .catch(error => {
                setIsLoading(false);
                setErrorMessage(error);
                CategoryServices.handleError(error);
            })
    }, []);

    const onPressCategoryBtn = (item) => {
        props.navigation.navigate(ScreenName.coursesOfCategory, { category: item });
    }

    return <View>
        <SectionHeader title={langContext.state.translation["popularCategory"]} style={[theme ? theme.background : null, styles.header]} titleStyle={theme ? theme.titleColor : null} />
        {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
        : categories && categories.length > 0 ?
            <ScrollView horizontal={true}>
                <FlatList style={styles.listContainer} data={categories}
                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={Math.ceil(categories.length / 2)}
                    renderItem={({item}) => 
                        <ImageText title={item.name}
                            imageSrc={require("../../../../../assets/images/background/conference.jpg")}
                            style={[CommonStyles.imageButtonSmall, styles.item]}
                            titleStyle={[{color: Colors.gainsboro}, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}
                            onPress={() => onPressCategoryBtn(item)}
                        />
                    }
                />
            </ScrollView>
            : <Text style={theme ? theme.titleColor : null}>{errorMessage}</Text>}
    </View>
}

export default PopularSkills;

const styles = StyleSheet.create({
    header: {
        marginBottom: 10
    },
    listContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    item: {
        marginRight: 10,
        marginBottom: 10
    }
});
