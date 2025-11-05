import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Movie } from '../types/Movie';
import Color from '../constants/Color';

interface Props {
    title: string;
    imagepath: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 3) - 12;

const MovieCard: React.FC<Props> = ({ item }: any) => (
    <View style={styles.card}>
        <Image
            source={{ uri: item.posterURL || 'https://via.placeholder.com/150' }}
            style={styles.image}
        />
        <Text numberOfLines={2} style={styles.title}>
            {item.title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        flex: 0.48,
        padding: 8,
        alignItems: 'center',
    },
    image: { width: '100%', height: 180, borderRadius: 8 },
    title: { color: Color.black, padding: 8, fontSize: 14, marginTop: 4, fontWeight: '600', textAlign: 'center' },
});

export default MovieCard;
