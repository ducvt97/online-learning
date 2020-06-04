import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Icon, Button, Text } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import InfoEditable from '../../common/info-editable';
import ProfileData from '../../../raw-data/profile';
import { ThemeContext } from '../../../contexts/theme-context';

const Profile = (props) => {
    const data = ProfileData;

    const {theme} = useContext(ThemeContext);

    return (
        <ScrollView style={theme.background}>
            <View style={[CommonStyles.generalContainer, theme.background]}>
                <View style={styles.container}>
                    <Avatar rounded showAccessory source={require("../../../../assets/avatar.jpg")} size="xlarge" />
                    <InfoEditable style={CommonStyles.shortMarginVertical} big={true} text={data.name} titleStyle={theme.titleColor} tintColor={theme.tintColor} />
                    <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                        <Icon name="mail" color={theme.tintColor} />
                        <InfoEditable style={CommonStyles.shortMarginVertical} text={data.email} titleStyle={theme.titleColor} tintColor={theme.tintColor} />
                    </View>
                </View>
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Username:</Text>
                    <Text style={[theme.textColor, CommonStyles.fontSizeBig, styles.content]}>{data.username}</Text>
                </View>
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Password: </Text>
                    <Text style={[theme.textColor, CommonStyles.fontSizeBig, styles.content]}>******</Text>
                    <Button type="clear" title={"Change password"} buttonStyle={styles.content} onPress={() => props.navigation.navigate(ScreenName.verifyPassword)} />
                </View>
                <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>Activity insights (last 30 days)</Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>TOTAL ACTIVE DAYS</Text>
                <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.activeDays} days</Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST ACTIVE TIME OF DAY</Text>
                <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.activeTimeOfDay}</Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST VIEWED SUBJECT</Text>
                <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{data.activity.mostViewSubject}</Text>
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
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    content: {
        marginLeft: 20
    }
});