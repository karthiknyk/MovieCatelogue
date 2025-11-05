import React, { useContext, useState } from "react"
import {  View, TouchableWithoutFeedback, Keyboard, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../routes";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Color from "../constants/Color";
import Images from "../../assets/images";


const validationSchema = Yup.object({
    mobileNumber: Yup.string()
        .min(10, "Mobile number must be at least 10 digits")
        .matches(/^[0-9]+$/, 'Mobile number must contain only digits').required("Mobile number is required"),
    password: Yup.string()
        .matches(/^\S*$/, "Password must not contain spaces")
        .min(6, ({ min }) => `Passowrd must be at least ${min} characters`)
        .required("Password is required")
});
const SignIn = () => {
    const { signIn } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const doSignIn = (values: any) => {
        setIsLoading(true)
        const { mobileNumber } = values
        console.log(mobileNumber, 'mobileNumber')
        signIn({ accessToken: mobileNumber})
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <ActivityIndicator />
        )
    }
    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', paddingHorizontal: 20, }}>

                    <View style={styles.centerView}>
                        <Image source={Images.app_logo} style={styles.appLogoView} />
                    </View>
                    <Text style={[styles.header, { color: Color.white }]}>LOGIN</Text>

                    <Formik
                        initialValues={{
                            mobileNumber: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            doSignIn(values)
                        }}>
                        {({ handleSubmit }) => (
                            <View>
                                <Field
                                    name="mobileNumber"
                                    component={CustomInput}
                                    label="Mobile Number"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    autoCapitalize="none"
                                    mandate={true}
                                    placeholder="Mobile number"
                                />

                                <Field
                                    name="password"
                                    component={CustomInput}
                                    label="Password"
                                    autoCapitalize={'none'}
                                    maxLength={16} // Additional prop
                                    secureTextEntry={true}
                                    mandate={true}
                                    placeholder="Password"
                                />
                                <View style={[styles.centerView]}>
                                    <View style={styles.row}>
                                        <Text style={[{ paddingRight: 4 }]}>
                                            New user ?
                                        </Text>
                                        <Text style={[{  textDecorationLine: 'underline', }]}>Sign Up</Text>
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <CustomButton
                                        label={'Submit'}
                                        onPress={handleSubmit as any}
                                        fontColor={Color.white}
                                        customStyle={{ borderRadius: 30, elevation: 1 }} />
                                </View>



                            </View>
                        )}
                    </Formik>

                </View>
            </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    appLogoView: {
        width: 120,
        height: 120,
        overflow: "hidden",
        borderColor: Color.black,
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden', // To apply rounded corners to the button
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 16,
        color: Color.white,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row'
    }
})

export default SignIn;
