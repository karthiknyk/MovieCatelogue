import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../constants/Color';

interface CustomInputProps {
    field: {
        name: string;
        value: string;
        onChange: (value: string) => void;
        onBlur: (value: string) => void;
    };
    form: {
        errors: { [key: string]: string };
        touched: { [key: string]: boolean };
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Updates a specific field's value

    };
    label: string;
    infoText: string;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    secureTextEntry?: boolean;
    mandate?: boolean;
    showInfo?: boolean;
    [key: string]: any;

}

const CustomInput: React.FC<CustomInputProps> = ({
    field,
    form,
    label,
    placeholder,
    customStyles,
    keyboardType = 'default',
    secureTextEntry = false,
    mandate = false, showInfo = false, infoText, ...inputProps
}) => {
    const { name, value, onChange, onBlur } = field;
    const error = form.errors[name];
    const isTouched = form.touched[name];
    const [secure, setSecure] = useState(secureTextEntry)
    const [inputHeight, setInputHeight] = useState(inputProps.numberOfLines * 40)
    // const [inputHeight, setInputHeight] = useState()

    const { setFieldValue } = form;

    return (
        <View style={styles.container}>

            <View style={[styles.input]}>

                <TextInput
                    style={[
                        styles.inputText,
                        inputProps.multiline && { height: inputHeight, textAlignVertical: 'top' },
                        isTouched && error ? styles.inputError : null, { flex: 1, },
                        // Platform.OS == 'ios' && {
                        //     height: 100, // Set a fixed height
                        //     textAlignVertical: "top"// Align text to the top
                        // },
                    ]}
                    placeholderTextColor={Color.lightGray2}
                    value={value}
                    // onChangeText={onChange(name)}
                    // onBlur={onBlur}
                    onChangeText={(text) => setFieldValue(name, text)}
                    onBlur={() => {
                        onBlur(name)
                    }}
                    placeholder={placeholder}
                    onContentSizeChange={(event) => {
                        const newheight = event.nativeEvent.contentSize.height;
                        if (newheight > inputHeight) {
                            setInputHeight(event.nativeEvent.contentSize.height)
                        }
                    }}
                    keyboardType={keyboardType}
                    secureTextEntry={secure}
                    {...inputProps}
                />
                {secureTextEntry &&
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        {secure ? (
                            <Feather name="eye-off" color={Color.grayText} size={20} />
                        ) : (
                            <Feather name="eye" color={Color.grayText} size={20} />
                        )}
                    </TouchableOpacity>
                }
            </View>


            {isTouched && error && <Text style={styles.error}>{error}</Text>}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    input: {
        borderRadius: 15,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingRight: 10,
        marginBottom: 4,
        elevation: 1, // For Android shadow,
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 14,
        height: 42,
        padding: 8,
        textAlign: 'justify',
        fontFamily: 'Roboto',
        color:Color.black
    },
    inputError: {
        borderColor: '#FF6F61',
    },
    error: {
        color: Color.danger_Red,
        fontSize: 12,
        marginTop: 5,
        textAlign:'center'
    },

});

export default CustomInput;
