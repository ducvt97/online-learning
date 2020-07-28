import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import ImageText from '../../common/image-text';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import UserServices from '../../../core/services/user-services';


const HomeTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton} 
                onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
            />,
            headerRight: () => <Avatar rounded source={authContext.state.userInfo && {uri: authContext.state.userInfo.avatar}} size="small"
                containerStyle={styles.headerButton} onPress={() => props.navigation.navigate(ScreenName.profile)}
            />
        });
    }, [{...theme}]);

    const onPressHeaderButton = (screenName, data, theme, style) => {
        props.navigation.navigate(screenName, { data: data, theme: theme, style: style});
    }

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
            <ImageText title="Build apps of the future" disableActiveOpacity
                imageSrc={require("../../../../assets/images/background/bg.jpg")}
                style={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]} />
            <View style={styles.sectionContainer}>
                <ListCoursesHorizontal navigation={props.navigation} theme={theme} headerTitle="Continue learning"
                    requestData={UserServices.getProcessCourse} requestDataError={UserServices.handleError}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.continueLearning}
                    emptyListIconName="school" emptyListTitle="Start learning to improve your skills." />
                <ListCoursesHorizontal navigation={props.navigation} theme={theme} headerTitle="Favorites"
                    requestData={UserServices.getFavoriteCourse} requestDataError={UserServices.handleError}
                    onPressHeaderButton={onPressHeaderButton} headerScreenName={ScreenName.favorites}
                    emptyListIconName="favorite" emptyListTitle="Like courses to quickly save courses for later." />
            </View>
        </ScrollView>
    )
}

export default HomeTab;

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10
    },
    sectionContainer: {
        marginVertical: 20
    }
});