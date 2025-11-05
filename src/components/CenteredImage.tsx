import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import Images from '../../assets/images';

export default function CenteredImage() {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // animate the image appearing from the center
        scale.value = withDelay(300, withTiming(1, { duration: 600 }));
        opacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
            <Animated.Image
                source={Images.app_logo}
                style={[{ width: 100, height: 100 }, animatedStyle]}
                resizeMode="contain"
            />
        </View>
    );
}
