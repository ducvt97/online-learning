import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { Colors } from '../../globals/constants';

const ImageText = (props) => {
    return <TouchableOpacity onPress={props.onPress} activeOpacity={props.disableActiveOpacity ? 1 : 0.4}>
        <ImageBackground source={props.imageSrc} style={[styles.container, props.style]} >
            <Text h4 style={styles.text}>{props.title}</Text>
        </ImageBackground>
    </TouchableOpacity>
}

export default ImageText;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: Colors.white,
        textAlign: "center"
    }
});