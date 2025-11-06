import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useGetMoviesQuery } from '../store/api/movieApi';
import Color from '../constants/Color';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Load 10 movies per batch
  const [search, setSearch] = useState('');

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetMoviesQuery({ page, limit });

  const [allMovies, setAllMovies] = useState<any[]>([]);

  // Load more when page changes
  React.useEffect(() => {
    if (data.length > 0) {
      setAllMovies((prev) =>
        page === 1 ? data : [...prev, ...data.filter((d) => !prev.some((p) => p.id === d.id))]
      );
    }
  }, [data, page]);

  // Filter movies by name
  const filteredMovies = useMemo(() => {
    const term = search.toLowerCase();
    return allMovies.filter((m) => m.title?.toLowerCase().includes(term));
  }, [allMovies, search]);

  // Load more when end reached
  const loadMore = useCallback(() => {
    if (!isFetching && data.length >= limit) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, data]);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor={Color.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        refreshControl={
          <RefreshControl refreshing={isFetching && page === 1} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          <View style={styles.center}>
            {isLoading ? (
              <ActivityIndicator testID="ActivityIndicator"  size="large" color="#007BFF" />
            ) : (
              <Text>No movies found.</Text>
            )}
          </View>
        }
        ListFooterComponent={
          isFetching && page > 1 ? (
            <View style={styles.footer}>
              <ActivityIndicator testID="ActivityIndicator"  size="small" color="#007BFF" />
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <MovieCard item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { marginBottom: 10 },
  searchInput: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    color: Color.black
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    flex: 0.48,
    padding: 8,
    alignItems: 'center',
  },
  image: { width: '100%', height: 180, borderRadius: 8 },
  title: { marginTop: 8, fontWeight: '600', textAlign: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingVertical: 10, alignItems: 'center' },
});

