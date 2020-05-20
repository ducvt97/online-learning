import React from 'react';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';

import SectionBrowse from './SectionBrowse/section-browse';
import CommonStyles from '../../../globals/styles';
import BrowseData from '../../../raw-data/browse';

const Browse = (props) => {
    return (
        <ScrollView style={CommonStyles.generalContainer}>
            <Tile 
                featured
                imageSrc={require("../../../../assets/bg.jpg")}
                title={"NEW" + "\n" + "RELEASE"}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <Tile 
                featured
                imageSrc={require("../../../../assets/bg.jpg")}
                title={"RECOMMENDED" + "\n" + "FOR YOU"}
                titleStyle={[CommonStyles.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionBrowse data={BrowseData} />
        </ScrollView>
    )
}

export default Browse;
