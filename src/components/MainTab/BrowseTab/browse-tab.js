import React from 'react';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';

import SectionBrowse from './SectionBrowse/section-browse';
import CommonStyles from '../../../globals/styles';
import BrowseData from '../../../raw-data/browse';

const BrowseTab = (props) => {
    return (
        <ScrollView style={CommonStyles.generalContainer}>
            <Tile featured title={"NEW RELEASE"}
                imageSrc={require("../../../../assets/bg.jpg")}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <Tile featured title={"RECOMMENDED FOR YOU"}
                imageSrc={require("../../../../assets/bg.jpg")}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionBrowse data={BrowseData} navigation={props.navigation} />
        </ScrollView>
    )
}

export default BrowseTab;
