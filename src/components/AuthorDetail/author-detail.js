import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Divider, SocialIcon } from 'react-native-elements';

import Description from '../common/description';
import ListCourses from '../Courses/ListCourses/list-courses';

import { CommonStyles } from '../../globals/styles';
import { ThemeContext } from '../../contexts/theme-context';
import { CoursesContext } from '../../contexts/courses-context';
import { ScreenName } from '../../globals/constants';
import { AuthorsContext } from '../../contexts/authors-context';

const AuthorDetail = (props) => {
    const authorId = props.route.params.itemId;
    const {theme} = useContext(ThemeContext);
    const {getAuthorById, toggleFollowAuthor} = useContext(AuthorsContext);
    const {courses} = useContext(CoursesContext);
    const author = getAuthorById(authorId);
    const [followed, setFollowed] = useState(author.followed);

    const onPressFollow = () => {
        toggleFollowAuthor(authorId);
        setFollowed(!followed);
    }

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled >
            <View style={styles.container}>
                <Avatar rounded source={author.image} size="xlarge" />
                <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{author.name}</Text>
                <Text style={[theme.textColor, CommonStyles.fontSizeAverage]}>{author.organization}</Text>
                {followed ? <Button type="outline" title="Unfollow" containerStyle={CommonStyles.shortMarginVertical} buttonStyle={styles.button} onPress={onPressFollow} />
                : <Button title="Follow" containerStyle={CommonStyles.shortMarginVertical} buttonStyle={styles.button} onPress={onPressFollow} />}
            </View>
            <Description style={theme.textColor} content={author.description} />
            <View style={styles.rowContainer}>
                {author.links.linkedin !== "" && <SocialIcon light type="linkedin" iconColor={theme.tintColor} />}
                {author.links.twitter !== "" && <SocialIcon light type="twitter" iconColor={theme.tintColor} />}
                {author.links.facebook !== "" && <SocialIcon light type="facebook" iconColor={theme.tintColor} />}
            </View>
            <Divider style={CommonStyles.divider} />
            <ListCourses data={courses} theme={theme} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
        </ScrollView>
    )
}

export default AuthorDetail;

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
    button: {
        minWidth: 200,
        maxWidth: 250
    }
});