import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Icon, Button, Text } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import Colors from '../../../globals/constants/colors';
import InfoEditable from '../../common/info-editable';
import ProfileData from '../../../raw-data/profile';

const Profile = (props) => {
    const data = ProfileData;
    return (
        <ScrollView>
            <View style={[CommonStyles.generalContainer]}>
                <View style={styles.container}>
                    <Avatar rounded showAccessory source={require("../../../../assets/avatar.jpg")} size="xlarge" />
                    <InfoEditable style={CommonStyles.shortMarginVertical} big={true} text={data.name} />
                    <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                        <Icon name="mail" color={Colors.white} containerStyle={styles.button} />
                        <InfoEditable style={CommonStyles.shortMarginVertical} text={data.email} />
                    </View>
                </View>
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Username:</Text>
                    <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, styles.content]}>{data.username}</Text>
                </View>
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Password: </Text>
                    <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, styles.content]}>******</Text>
                    <Button type="clear" title={"Change password"} buttonStyle={styles.content} />
                </View>
                <Text h4 style={[CommonStyles.titleColor, CommonStyles.shortMarginVertical]}>Activity insights (last 30 days)</Text>
                <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>TOTAL ACTIVE DAYS</Text>
                <Text h4 style={[CommonStyles.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.activeDays} days</Text>
                <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST ACTIVE TIME OF DAY</Text>
                <Text h4 style={[CommonStyles.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.activeTimeOfDay}</Text>
                <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST VIEWED SUBJECT</Text>
                <Text h4 style={[CommonStyles.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.mostViewSubject}</Text>
                <Button title="Sign out" type="outline" 
                    buttonStyle={[CommonStyles.shortMarginVertical, styles.button]} 
                    titleStyle={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]} />
            </View>
        </ScrollView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        marginLeft: 20
    },
    button: {
        borderWidth: 3
    }
});