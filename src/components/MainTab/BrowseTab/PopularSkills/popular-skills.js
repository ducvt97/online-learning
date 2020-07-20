import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Button, Tile } from 'react-native-elements';

import SectionHeader from '../../../common/section-header';
import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';
import CategoryServices from '../../../../core/services/category-services';

const PopularSkills = (props) => {
    const theme = props.theme;
    const skills = ["Angular", "JavaScript", "C#", "Java", "React", "VueJS"];
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, [])

    return <View>
        <SectionHeader style={theme ? theme.background : null} title={props.headerTitle} titleStyle={theme ? theme.titleColor : null} />
        <FlatList style={styles.listContainer} horizontal={true} data={skills}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
            renderItem={({item}) => 
                <Button title={item} buttonStyle={[CommonStyles.buttonListItem, styles.item]}
                    titleStyle={[{color: Colors.light}, CommonStyles.fontSizeSmall]} /> }
        />
        {isLoading ? <ActivityIndicator color={theme ? theme.tintColor : null} style={styles.indicator} />
        : categories && categories.length > 0 ?
            <ScrollView horizontal={true}>
                <FlatList style={styles.listContainer} data={categories}
                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={Math.ceil(categories.length / 2)}
                    renderItem={({item}) => 
                        <Tile featured title={item.name}
                            imageSrc={require("../../../../../assets/images/background/conference.jpg")}
                            containerStyle={[CommonStyles.imageButtonSmall, styles.item]}
                            imageContainerStyle={CommonStyles.imageButtonSmall}
                            titleStyle={[{color: Colors.gainsboro}, CommonStyles.fontSizeAverage]}
                        />
                    }
                />
            </ScrollView>
            : <Text style={theme ? theme.titleColor : null}>{errorMessage}</Text>}
    </View>
}

export default PopularSkills;

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    item: {
        marginRight: 10,
        marginBottom: 10
    }
});
