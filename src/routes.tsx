import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    useDrawerStatus
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from './constants/Color';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import Animated from 'react-native-reanimated';
import Images from '../assets/images';
import { commonStyles } from './constants/CommonStyles';
import CenteredImage from './components/CenteredImage';
export const AuthContext = React.createContext();

function SplashScreen() {
    return (
       <CenteredImage/>
    );
}


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
    const { signOut } = React.useContext(AuthContext)

    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure to logout ?",
            [
                { text: "Cancel" },
                { text: 'OK', onPress: () => signOut() },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
            <DrawerContentScrollView {...props}>

                <DrawerItem
                    label="Logout"
                    icon={() => (
                        <MaterialCommunityIcons
                            size={25}
                            name={"logout"}
                            color={Color.Neon_orange}
                        />
                    )}
                    onPress={logout}
                    style={{borderWidth:1}}
                />

            </DrawerContentScrollView>
        </View>
    );
}

function HomeDrawer() {
    return (

        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}

            screenOptions={{
                drawerActiveBackgroundColor: Color.primaryColor,
                drawerActiveTintColor: Color.black,
                drawerPosition: "left",
                drawerLabelStyle: {
                    color: 'white',
                },
                drawerItemStyle: {
                    borderWidth: 1,
                    opacity: 0.6,
                    borderRadius: 0
                },


            }}>
            <Drawer.Screen
                name="Dashboard"
                component={Home}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: () => (
                        <View >
                            <Text style={[{ color: Color.black, paddingLeft: 8 }]}>Movie Catelogue</Text>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => navigation.openDrawer()}>
                            <Ionicons
                                name={"menu"}
                                size={25}
                                color={Color.brown_new}
                            />
                        </TouchableOpacity>
                    ),

                })}

            />
        </Drawer.Navigator>
    );
}

export default function Routes() {
    const [state, dispatch] = React.useReducer(
        (prevState, action): any => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }



            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data: any) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                const accessToken = data.accessToken;

                console.log(accessToken, 'accessToken')

                try {
                    await AsyncStorage.setItem("userToken", accessToken);
                } catch (e) {
                    // console.log(e);
                }
                dispatch({ type: 'SIGN_IN', token: accessToken });
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem('userToken');
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );



    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {state.isLoading ? (
                        // We haven't finished checking for the token yet
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="SignIn"
                            component={SignIn}
                            options={{
                                title: 'Sign in',
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Drawer" component={HomeDrawer} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
