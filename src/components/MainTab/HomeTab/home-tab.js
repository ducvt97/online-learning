import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Tile, Icon, Avatar } from 'react-native-elements';

import ListCoursesHorizontal from '../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName, Colors } from '../../../globals/constants';
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

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
            <Tile featured titleNumberOfLines={2}
                imageSrc={require("../../../../assets/images/background/bg.jpg")}
                title={"Build apps of the future"}
                titleStyle={[{color: Colors.gainsboro}, CommonStyles.fontWeightBold]}
                containerStyle={[CommonStyles.imageButtonBig, CommonStyles.shortMarginVertical]}
                imageContainerStyle={CommonStyles.imageButtonBig}
            />
            <View style={styles.sectionContainer}>
                <ListCoursesHorizontal screenName={ScreenName.courseDetail} onPressItem={onPressListItem} theme={theme}
                    requestData={UserServices.getProcessCourse} requestDataError={UserServices.handleError}
                    emptyListIconName="school" emptyListTitle="Start learning to improve your skills."
                    headerTitle="Continue learning" />
                <ListCoursesHorizontal screenName={ScreenName.courseDetail} onPressItem={onPressListItem} theme={theme}
                    requestData={UserServices.getFavoriteCourse} requestDataError={UserServices.handleError}
                    emptyListIconName="bookmark" emptyListTitle="Use bookmarks to quickly save courses for later."
                    headerTitle="Bookmarks" />
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