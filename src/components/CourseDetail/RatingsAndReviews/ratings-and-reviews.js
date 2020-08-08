import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';
import { Rating, Divider, Button } from 'react-native-elements';

import AvatarTitle from '../../MainTab/BrowseTab/TopInstructors/AvatarTitle/avatar-title';
import { CommonStyles } from '../../../globals/styles';
import CoursesServices from '../../../core/services/courses-services';
import { setUserRatingCourse } from '../../../actions/course-detail-action';
import { LanguageContext } from '../../../contexts/language-context';

const RatingsAndReviews = (props) => {
    const theme = props.theme;
    const langContext = useContext(LanguageContext);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [isEditReview, setIsEditReview] = useState(false);

    const renderItem = ({item}) => (
        <View style={[styles.row, props.style]}>
            <AvatarTitle imageUrl={item.user.avatar} title={item.user.name} style={styles.column} size="medium" titleStyle={theme.textColor} />
            <View>
                <View style={styles.row}>
                    <Rating tintColor={theme.backgroundColor} imageSize={15} fractions={0.75} startingValue={item.averagePoint}
                        style={styles.column} readonly />
                    <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeSmall]}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
                <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeAverage, styles.content]}>{item.content}</Text>
            </View>
        </View>
    )

    const onPressSubmitReview = () => {
        setReviewLoading(true);
        if (!rating || rating === 0){
            setReviewLoading(false);
            alert(langContext.state.translation["ratingValidationText"]);
        } else
            CoursesServices.ratingCourse(props.state.courseInfo.id, rating, review)
                .then(response => {
                    setReviewLoading(false);
                    setIsEditReview(false);
                    if (response.status === 200)
                        setUserRatingCourse(props.dispatch, response.data.payload);
                    else
                        alert(response.data.message);
                }).catch(error => {
                    setReviewLoading(false);
                    setIsEditReview(false);
                    alert(error.message);
                    CoursesServices.handleError(error);
                })
    }

    const onPressEditReview = () => {
        setRating((props.state.userRatingCourse.formalityPoint + props.state.userRatingCourse.contentPoint + props.state.userRatingCourse.presentationPoint) / 3);
        setReview(props.state.userRatingCourse.content);
        setIsEditReview(true);
    }

    return <View style={[styles.container, props.style]}>
        {props.state.userBuyCourse ? <View style={{marginBottom: 20}}>
            <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["yourReview"]}</Text>
            {props.state.userRatingCourse ? !isEditReview ?
                <View>
                    <Rating tintColor={theme.backgroundColor} imageSize={40} fractions={2} readonly
                        startingValue={(props.state.userRatingCourse.formalityPoint + props.state.userRatingCourse.contentPoint + props.state.userRatingCourse.presentationPoint) / 3} />
                    <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeBig, {textAlign: "center"}]}>{props.state.userRatingCourse.content}</Text>
                    <Button title={`${langContext.state.translation["edit"]} ${langContext.state.translation["review"]}`} containerStyle={styles.button} loading={reviewLoading} onPress={onPressEditReview} />
                </View>
                : <View>
                    <Rating tintColor={theme.backgroundColor} imageSize={40} fractions={2} onFinishRating={rating => setRating(rating)}
                        startingValue={(props.state.userRatingCourse.formalityPoint + props.state.userRatingCourse.contentPoint + props.state.userRatingCourse.presentationPoint) / 3} />
                    <TextInput style={[CommonStyles.input, theme.inputBackground, styles.input]} multiline onChangeText={text => setReview(text)} value={review} />
                    <View style={[styles.row, {justifyContent: "flex-end"}]}>
                        <Button title={langContext.state.translation["cancel"]} containerStyle={styles.submitButton} type="outline" onPress={() => setIsEditReview(false)} />
                        <Button title={langContext.state.translation["review"]} containerStyle={styles.submitButton} disabled={!review ? true : false} loading={reviewLoading} onPress={onPressSubmitReview} />
                    </View>
                </View>
            : <View>
                <Rating tintColor={theme.backgroundColor} imageSize={40} fractions={2} startingValue={0} onFinishRating={rating => setRating(rating)} />
                <TextInput style={[CommonStyles.input, theme.inputBackground, styles.input]} multiline onChangeText={text => setReview(text)} />
                <Button title={langContext.state.translation["review"]} containerStyle={styles.submitButton} disabled={!review ? true : false} loading={reviewLoading} onPress={onPressSubmitReview} />
            </View>}
        </View> : null}
        <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{langContext.state.translation["ratingAndReview"]}</Text>
        <FlatList data={props.state.courseInfo.ratings.ratingList}
            ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            keyExtractor={(item, index) => index.toString()} renderItem={renderItem}
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} />
    </View>
}

export default RatingsAndReviews;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    column: {
        marginRight: 10
    },
    content: {
        marginTop: 5
    },
    input: {
        minHeight: 80,
        maxHeight: 150,
        paddingVertical: 2,
        fontSize: 14
    },
    submitButton: {
        width: 80,
        alignSelf: "flex-end",
        marginLeft: 10
    },
    button: {
        width: 200,
        alignSelf: "center"
    }
});
