import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CommonStyles } from '../../globals/styles';
import { Text, Icon, Input } from 'react-native-elements';

const InfoEditable = (props) => {
    const [text, setText] = useState(props.text);
    const [draftText, setDraftText] = useState(props.text);
    const [isEditing, setIsEditing] = useState(false);
    const theme = props.theme;

    const onPressEditButton = () => {
        setIsEditing(!isEditing);
        setDraftText(text);
    }

    const onPressSaveButton = async (onSave) => {
        try {
            const status = await onSave(draftText);
            if (status.status === 200) {
                setIsEditing(!isEditing);
                setText(draftText);
            }
            alert(status.message);
        } catch (error) {
            console.log(error);
        }
    }

    const onPressCancelButton = () => {
        setIsEditing(!isEditing);
        setDraftText(props.text);
    }

    return isEditing ? 
        <View style={[styles.container, props.style]}>
            <Input multiline autoFocus value={draftText} numberOfLines={1} containerStyle={styles.input} inputStyle={theme ? theme.titleColor : null} onChangeText={(text) => setDraftText(text)} />
            <View style={[styles.row, styles.buttonGroup]}>
                <Icon name="save" color={theme ? theme.tintColor : null} containerStyle={styles.button} onPress={() => onPressSaveButton(props.onSave)} />
                <Icon name="cancel" color={theme ? theme.tintColor : null} containerStyle={styles.button} onPress={() => onPressCancelButton()} />
            </View>
            
        </View>
        : <View style={[props.style, styles.container, styles.row]}>
            {props.big ? <Text h3 style={theme ? theme.titleColor : {}}>{text}</Text>
                : <Text numberOfLines={1} style={[theme ? theme.titleColor : {}, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{text}</Text>
            }
            <Icon name="edit" color={theme ? theme.tintColor : null} containerStyle={styles.button} onPress={() => onPressEditButton()} />
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
        width: 250
    },
    descriptionInput: {
        maxWidth: 250,
        minWidth: 100,
    },
    button: {
        marginLeft: 10
    }    
});