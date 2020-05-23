import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Icon, Button, Text } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import CommonStyles from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import InfoEditable from '../../common/info-editable';
import ProfileData from '../../../raw-data/profile';

const Profile = (props) => {
    const data = ProfileData;
    return (
        <ScrollView style={styles.background}>
            <View style={CommonStyles.generalContainer}>
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
                    <Button type="clear" title={"Change password"} buttonStyle={styles.content} onPress={() => props.navigation.navigate(ScreenName.verifyPassword)} />
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
                    titleStyle={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}
                    onPress={() => props.navigation.dispatch(
                        CommonActions.navigate({
                            name: ScreenName.login
                        })
                    )}
                />
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
    background: {
        backgroundColor: Colors.black
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    content: {
        marginLeft: 20
    },
    button: {
        borderWidth: 3
    }
});