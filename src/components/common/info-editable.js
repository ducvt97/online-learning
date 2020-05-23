import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CommonStyles from '../../globals/styles';
import { Text, Icon, Input } from 'react-native-elements';
import Colors from '../../globals/constants/colors';

const InfoEditable = (props) => {
    const [text, setText] = useState(props.text);
    const [draftText, setDraftText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const onPressEditButton = () => {
        setIsEditing(isEditing => !isEditing);
        setDraftText(draftText => text);
    }

    const onPressSaveButton = () => {
        setIsEditing(isEditing => !isEditing);
        setText(text => draftText);
    }

    const onPressCancelButton = () => {
        setIsEditing(isEditing => !isEditing);
        setDraftText(draftText => "");
    }

    const onChangetext = (text) => {
        setDraftText(draftText => text);
    }

    return isEditing ? 
        <View style={[props.style, styles.container]}>
            <Input multiline autoFocus value={draftText} containerStyle={styles.input} inputStyle={CommonStyles.titleColor} onChangeText={(text) => onChangetext(text)} />
            <View style={[styles.row, styles.buttonGroup]}>
                <Icon name="save" color={Colors.gainsboro} containerStyle={styles.button} onPress={() => onPressSaveButton()} />
                <Icon name="cancel" color={Colors.gainsboro} containerStyle={styles.button} onPress={() => onPressCancelButton()} />
            </View>
            
        </View>
        : <View style={[props.style, styles.container, styles.row]}>
            {props.big ? <Text h3 style={[CommonStyles.titleColor]}>{text}</Text>
                : <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeBig]}>{text}</Text>
            }
            <Icon name="edit" color={Colors.gainsboro} containerStyle={styles.button} onPress={() => onPressEditButton()} />
        </View>
}

export default InfoEditable;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    row: {
        flexDirection: "row"
    },
    buttonGroup: {
        alignSelf: "flex-end",
        marginRight: 20
    },
    input: {
        width: 250,
    },
    descriptionInput: {
        maxWidth: 250,
        minWidth: 100,
    },
    button: {
        marginLeft: 10
    }    
});