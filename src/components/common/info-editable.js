import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CommonStyles } from '../../globals/styles';
import { Text, Icon, Input } from 'react-native-elements';
import { Colors } from '../../globals/constants';

const InfoEditable = (props) => {
    const [text, setText] = useState(props.text);
    const [draftText, setDraftText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const theme = props.theme;

    const onPressEditButton = () => {
        setIsEditing(isEditing => !isEditing);
        setDraftText(draftText => text);
    }

    const onPressSaveButton = (onSave) => {
        const status = onSave(draftText);
        if (status.status === 200) {
            setIsEditing(isEditing => !isEditing);
            setText(text => draftText);
        }
        alert(status.message);
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
            <Input multiline autoFocus value={draftText} containerStyle={styles.input} inputStyle={theme ? theme.titleColor : null} onChangeText={(text) => onChangetext(text)} />
            <View style={[styles.row, styles.buttonGroup]}>
                <Icon name="save" color={Colors.gainsboro} containerStyle={styles.button} onPress={() => onPressSaveButton(props.onSave)} />
                <Icon name="cancel" color={Colors.gainsboro} containerStyle={styles.button} onPress={() => onPressCancelButton()} />
            </View>
            
        </View>
        : <View style={[props.style, styles.container, styles.row]}>
            {props.big ? <Text h3 style={props.titleStyle}>{text}</Text>
                : <Text style={[props.titleStyle, CommonStyles.fontSizeBig]}>{text}</Text>
            }
            <Icon name="edit" color={props.tintColor} containerStyle={styles.button} onPress={() => onPressEditButton()} />
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