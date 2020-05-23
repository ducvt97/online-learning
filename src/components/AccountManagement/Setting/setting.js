import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { Colors } from '../../../globals/constants';

const Setting = (props) => {
    const [isStreamingEnabled, setIsStreamingEnabled] = useState(false);
    const [isDownloadingEnabled, setIsDownloadingEnabled] = useState(false);
    const toggleSwitchStreaming = () => setIsStreamingEnabled(previousState => !previousState);
    const toggleSwitchDownloading = () => setIsDownloadingEnabled(previousState => !previousState);

    return (
        <View style={CommonStyles.generalContainer}>
            <ScrollView>
                <ListItem title="Notifications" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]}
                    containerStyle={styles.item} chevron
                    badge={{ value: 3, textStyle: [CommonStyles.titleColor, CommonStyles.fontWeightBold], status:"error" }}    
                />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Require Wifi for streaming" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                    switch={{ trackColor: { false: Colors.dimGrey, true: Colors.dodgerBlue },
                        thumbColor: Colors.gainsboro,
                        ios_backgroundColor: Colors.dimGrey,
                        onValueChange: toggleSwitchStreaming,
                        value: isStreamingEnabled
                    }}
                />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Require Wifi for downloading" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                    switch={{ trackColor: { false: Colors.dimGrey, true: Colors.dodgerBlue },
                        thumbColor: Colors.gainsboro,
                        ios_backgroundColor: Colors.dimGrey,
                        onValueChange: toggleSwitchDownloading,
                        value: isDownloadingEnabled
                    }}
                />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Theme" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item} chevron />
                <Divider style={CommonStyles.divider} />
                <ListItem title="About" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item} chevron />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Version" titleStyle={[CommonStyles.titleColor, CommonStyles.fontSizeAverage]}
                    containerStyle={styles.item} rightTitle="v1.0.0" rightTitleStyle={CommonStyles.titleColor}
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