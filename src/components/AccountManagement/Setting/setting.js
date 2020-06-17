import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';

const Setting = (props) => {
    const [isStreamingEnabled, setIsStreamingEnabled] = useState(false);
    const [isDownloadingEnabled, setIsDownloadingEnabled] = useState(false);
    const toggleSwitchStreaming = () => setIsStreamingEnabled(previousState => !previousState);
    const toggleSwitchDownloading = () => setIsDownloadingEnabled(previousState => !previousState);

    const {authentication} = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <ScrollView>
                {authentication.authenticated ? 
                    <View>
                        <ListItem title="Notifications" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]}
                        containerStyle={styles.item} chevron
                        badge={{ value: 3, textStyle: [theme.titleColor, CommonStyles.fontWeightBold], status:"error" }}
                        />
                        <Divider style={CommonStyles.divider} />
                        <ListItem title="Require Wifi for streaming" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                            switch={{ trackColor: { false: Colors.dimGrey, true: Colors.dodgerBlue },
                                thumbColor: Colors.gainsboro,
                                ios_backgroundColor: Colors.dimGrey,
                                onValueChange: toggleSwitchStreaming,
                                value: isStreamingEnabled
                            }}
                        />
                        <Divider style={CommonStyles.divider} />
                        <ListItem title="Require Wifi for downloading" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                            switch={{ trackColor: { false: Colors.dimGrey, true: Colors.dodgerBlue },
                                thumbColor: Colors.gainsboro,
                                ios_backgroundColor: Colors.dimGrey,
                                onValueChange: toggleSwitchDownloading,
                                value: isDownloadingEnabled
                            }}
                        />
                        <Divider style={CommonStyles.divider} />
                    </View>
                : null}
                <ListItem title="Theme" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item} onPress={()=>props.navigation.navigate(ScreenName.theme)} chevron />
                <Divider style={CommonStyles.divider} />
                <ListItem title="About" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item} chevron />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Version" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]}
                    containerStyle={styles.item} rightTitle="v1.0.0" rightTitleStyle={theme.titleColor}
                />
                <Divider style={CommonStyles.divider} />
            </ScrollView>
        </View>
    )
}

export default Setting;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});