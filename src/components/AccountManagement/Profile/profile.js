import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Avatar, Icon, Button, Text } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import InfoEditable from '../../common/info-editable';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName, Colors } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import UserServices from '../../../core/services/user-services';

const Profile = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);

    const changeName = (name) => {
        setIsLoading(true);
        return UserServices.updateProfile(name, authContext.state.userInfo.avatar, authContext.state.userInfo.phone)
            .then(response => {
                setIsLoading(false);
                if (response.status === 200)
                    authContext.updateProfile(response.data.payload);
                return { status: response.status, message: response.data.message };
            })
            .catch(error => {
                setIsLoading(false);
                UserServices.handleError(error);
                return { status: 503, message: error.message };
            });
    }

    const changePhone = (phone) => {
        setIsLoading(true);
        return UserServices.updateProfile(authContext.state.userInfo.name, authContext.state.userInfo.avatar, phone)
            .then(response => {
                setIsLoading(false);
                if (response.status === 200)
                    authContext.updateProfile(response.data.payload);
                return { status: response.status, message: response.data.message };
            })
            .catch(error => {
                setIsLoading(false);
                UserServices.handleError(error);
                return { status: 503, message: error.message };
            });
    }

    const onPressSignOut = () => {
        authContext.logout();
        props.navigation.dispatch(CommonActions.navigate({ name: ScreenName.startScreen }));
    }

    return <ScrollView style={theme.background}>
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <Spinner visible={isLoading} textContent="Updating..." textStyle={styles.indicatorText} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
            <View style={styles.container}>
                <Avatar rounded showAccessory source={authContext.state.userInfo && {uri: authContext.state.userInfo.avatar}} size="xlarge" />
                <InfoEditable style={CommonStyles.shortMarginVertical} big={true} text={authContext.state.userInfo && authContext.state.userInfo.name} theme={theme} onSave={changeName} />
                <View style={[CommonStyles.shortMarginVertical, styles.rowContainer]}>
                    <Icon name="phone" color={theme.tintColor} />
                    <InfoEditable text={authContext.state.userInfo && authContext.state.userInfo.phone} theme={theme} onSave={changePhone} />
                </View>
                <View style={[CommonStyles.shortMarginVertical, styles.container]}>
                    <View style={styles.rowContainer}>
                        <Icon name="mail" color={theme.tintColor} />
                        <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, styles.content]}>{authContext.state.userInfo && authContext.state.userInfo.email}</Text>
                    </View>
                    <Button title="Change email" type="clear" onPress={() => props.navigation.navigate(ScreenName.changeEmail)} />
                </View>
            </View>
            <Text h4 style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.shortMarginVertical]}>{authContext.state.userInfo && authContext.state.userInfo.type}</Text>
            <Text h4 style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>FAVORITE CATEGORIES</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{authContext.state.userInfo && authContext.state.userInfo.favoriteCategories}</Text>
            <Button title="Change password" buttonStyle={[CommonStyles.shortMarginVertical, styles.button]}
                titleStyle={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]} onPress={() => props.navigation.navigate(ScreenName.changePassword)} />
            <Button title="Sign out" type="outline" buttonStyle={[CommonStyles.shortMarginVertical, styles.button]}
                titleStyle={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]} onPress={onPressSignOut} />
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
        marginLeft: 10
    },
    indicatorText: {
        color: Colors.ghostWhite,
        fontSize: 30,
        fontWeight: "bold"
    }
});