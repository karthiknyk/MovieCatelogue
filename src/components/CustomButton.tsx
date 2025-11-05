import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../constants/Color';

const CustomButton = ({ label, disabled, onPress, fontSize = 14, fontColor = Color.white, customStyle }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.8}
            style={[customStyle]}
        >
            <LinearGradient
                colors={[Color.orangeGradient1, Color.orangeGradient2]}
                style={styles.appButtonContainer}>
                <Text
                    style={[
                        styles.appButtonText,
                        { fontSize: fontSize, color: fontColor }
                    ]}>
                    {label.toUpperCase()}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    appButtonContainer: {
        height: 50,
        borderRadius: 15,
        // ✅ Center text perfectly
        justifyContent: 'center',
        alignItems: 'center',

        // Remove extra horizontal padding that was tilting text
        //   paddingHorizontal: 20,

        // Shadows
        elevation: 3, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    appButtonText: {
        fontSize: 14,
        color: Color.white,
        textAlign: 'center', // ✅ makes sure text itself is centered
        fontFamily:'Roboto',
        fontWeight:600
    },
});


export default CustomButton;
