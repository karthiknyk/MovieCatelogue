import { View } from "react-native";

require('@testing-library/jest-native/extend-expect');

// SafeAreaContext mock
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// AsyncStorage mock
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Vector icons mock
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// ✅ Proper mock for Reanimated (no ReanimatedDataMock needed)
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Fix for newer versions where 'call' can throw undefined errors
  Reanimated.default.call = () => {};

  return Reanimated;
});

// ✅ Mock Gesture Handler (fixes RNGestureHandlerModule error)
jest.mock('react-native-gesture-handler', () => {
    const { View, TouchableOpacity } = require('react-native');
    return {
      GestureHandlerRootView: View,
      PanGestureHandler: View,
      TapGestureHandler: View,
      TouchableOpacity,
      Swipeable: View,
      DrawerLayout: View,
      State: {},
    };
  });


 // ✅ Mock Linear Gradient
 jest.mock('react-native-linear-gradient', () => {
    const React = require('react');
    const { View } = require('react-native');
    function MockLinearGradient(props: any) {
      return React.createElement(View, props);
    }
    return MockLinearGradient;
  });


  // Mock NavigationContainer
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
      }),
    };
  });

  jest.mock('@react-navigation/drawer', () => {
    return {
      createDrawerNavigator: jest.fn().mockReturnValue({
        Navigator: ({ children }: any) => children,
        Screen: ({ children }: any) => children,
      }),
      DrawerContentScrollView: ({ children }: any) => children,
      DrawerItem: ({ children }: any) => children,
    };
  });
  
  jest.mock('@react-navigation/native-stack', () => {
    return {
      createNativeStackNavigator: jest.fn().mockReturnValue({
        Navigator: ({ children }: any) => children,
        Screen: ({ children }: any) => children,
      }),
    };
  });