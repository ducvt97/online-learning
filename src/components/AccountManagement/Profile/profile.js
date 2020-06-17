import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Icon, Button, Text } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import InfoEditable from '../../common/info-editable';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { AccountsContext } from '../../../contexts/accounts-context';

const Profile = (props) => {
    const {theme} = useContext(ThemeContext);
    const {authentication, setAuthenticated, setUser} = useContext(AuthenticationContext);
    const {getAccountById, changeAccountFullname, changeAccountEmail} = useContext(AccountsContext);
    const [user, setCurrentUser] = useState(authentication.user);

    useEffect(() => {
        setCurrentUser(authentication.user);
        console.log(authentication.user)
    }, [{...authentication}])

    const changeFullName = (newFullName) => {
        const status = changeAccountFullname(user.id, newFullName);
        if (status.status === 200) {
            const account = getAccountById(user.id);
            setUser(account);
        }
        return status;
    }

    const changeEmail = (newEmail) => {
        const status = changeAccountEmail(user.id, newEmail);
        if (status.status === 200) {
            const account = getAccountById(user.id);
            setUser(account);
        }
        return status;
    }

    const onPressSignOut = () => {
        setAuthenticated(false);
        setUser(null);
        props.navigation.dispatch(CommonActions.navigate({ name: ScreenName.startScreen }));
    }

    return <ScrollView style={theme.background}>
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <View style={styles.container}>
                <Avatar rounded showAccessory source={user.image} size="xlarge" />
                <InfoEditable style={CommonStyles.shortMarginVertical} big={true} text={user.fullName} theme={theme} onSave={changeFullName} />
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Icon name="mail" color={theme.tintColor} />
                    <InfoEditable style={CommonStyles.shortMarginVertical} text={user.email} theme={theme} onSave={changeEmail} />
                </View>
            </View>
            <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Username:</Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeBig, styles.content]}>{user.username}</Text>
            </View>
            <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>Password: </Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeBig, styles.content]}>******</Text>
                <Button type="clear" title={"Change password"} buttonStyle={styles.content} onPress={() => props.navigation.navigate(ScreenName.verifyPassword)} />
            </View>
            <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>Activity insights (last 30 days)</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>TOTAL ACTIVE DAYS</Text>
            <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{user.activity.activeDays} days</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST ACTIVE TIME OF DAY</Text>
            <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{user.activity.activeTimeOfDay}</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>MOST VIEWED SUBJECT</Text>
            <Text h4 style={[theme.titleColor, CommonStyles.shortMarginVertical]}>{user.activity.mostViewSubject}</Text>
            <Button title="Sign out" type="outline"
                buttonStyle={[CommonStyles.shortMarginVertical, styles.button]}
                titleStyle={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}
                onPress={onPressSignOut}
            />
        </View>
    </ScrollView>
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