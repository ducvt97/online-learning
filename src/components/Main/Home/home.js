import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';

import SectionHome from './SectionHome/section-home';
import CommonStyles from '../../../globals/styles';
import HomeData from '../../../raw-data/home';

const Home = (props) => {
    return (
        <ScrollView style={CommonStyles.generalContainer}>
            <Tile 
                featured titleNumberOfLines={2}
                imageSrc={require("../../../../assets/bg.jpg")}
                title={"Build intelligent apps of the future"}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionHome data={HomeData} />
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});