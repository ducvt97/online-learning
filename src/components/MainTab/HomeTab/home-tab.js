import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Tile, Icon, Avatar } from 'react-native-elements';

import SectionHome from './SectionHome/section-home';
import CommonStyles from '../../../globals/styles';
import HomeData from '../../../raw-data/home';
import { Colors } from '../../../globals/constants';
import { ScreenName } from '../../../globals/constants';


const HomeTab = (props) => {
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <Icon name="settings" color={Colors.white} size={30} containerStyle={styles.headerButton} 
                onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
            />,
            headerRight: () => <Avatar rounded source={require("../../../../assets/avatar.jpg")} size="small" 
                containerStyle={styles.headerButton} onPress={() => props.navigation.navigate(ScreenName.profile)}
            />
        });
    }, []);

    return (
        <ScrollView style={CommonStyles.generalContainer}>
            <Tile featured titleNumberOfLines={2}
                imageSrc={require("../../../../assets/bg.jpg")}
                title={"Build apps of the future"}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionHome data={HomeData} navigation={props.navigation} />
        </ScrollView>
    )
}

export default HomeTab;

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10
    }
});