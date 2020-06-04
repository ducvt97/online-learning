import React from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Button, Tile } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';

const PopularSkills = (props) => {
    const skills = props.data.skills;
    const topics = props.data.topics;

    return (
        <View>
            <FlatList style={styles.listContainer} horizontal={true} data={skills}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => 
                    <Button title={item} buttonStyle={[CommonStyles.buttonListItem, styles.item]}
                        titleStyle={[{color: Colors.light}, CommonStyles.fontSizeSmall]}
                    />
                } 
            />
            <ScrollView horizontal={true}>
                <FlatList style={styles.listContainer}  data={topics}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={Math.ceil(topics.length / 2)}
                    renderItem={({item}) => 
                        <Tile featured title={item}
                            imageSrc={require("../../../../../assets/conference.jpg")}
                            containerStyle={[CommonStyles.imageButtonSmall, styles.item]}
                            imageContainerStyle={CommonStyles.imageButtonSmall}
                            titleStyle={[{color: Colors.gainsboro}, CommonStyles.fontSizeAverage]}
                        />
                    }
                />
            </ScrollView>
        </View>
    )
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
