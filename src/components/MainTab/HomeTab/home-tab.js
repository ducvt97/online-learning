import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Tile, Icon, Avatar } from 'react-native-elements';

import SectionHome from './SectionHome/section-home';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName, Colors } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const HomeTab = (props) => {
    const {theme} = useContext(ThemeContext);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton} 
                onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
            />,
            headerRight: () => <Avatar rounded source={require("../../../../assets/avatar.jpg")} size="small" 
                containerStyle={styles.headerButton} onPress={() => props.navigation.navigate(ScreenName.profile)}
            />
        });
    }, [{...theme}]);

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
            <Tile featured titleNumberOfLines={2}
                imageSrc={require("../../../../assets/bg.jpg")}
                title={"Build apps of the future"}
                titleStyle={[{color: Colors.gainsboro}, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionHome navigation={props.navigation} />
        </ScrollView>
    )
}

export default HomeTab;

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10
    }
});