import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';

import SectionBrowse from './SectionBrowse/section-browse';
import { CommonStyles } from '../../../globals/styles';
import { Colors } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const BrowseTab = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled>
            <Tile featured title={"NEW RELEASE"}
                imageSrc={require("../../../../assets/images/background/bg.jpg")}
                titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <Tile featured title={"RECOMMENDED FOR YOU"}
                imageSrc={require("../../../../assets/images/background/bg.jpg")}
                titleStyle={[Colors.white, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <SectionBrowse {...props} />
        </ScrollView>
    )
}

export default BrowseTab;
