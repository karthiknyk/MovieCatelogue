import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../screens/Home';
import { useGetMoviesQuery } from '../store/api/movieApi';

jest.mock('../store/api/movieApi');

describe('Home Screen', () => {
  const mockMovies = [
    { id: 1, title: 'Inception' },
    { id: 2, title: 'Interstellar' },
    { id: 3, title: 'Tenet' },
  ];

  beforeEach(() => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });
  });

  it('renders movies correctly', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeTruthy();
    expect(screen.getByText('Inception')).toBeTruthy();
    expect(screen.getByText('Interstellar')).toBeTruthy();
  });

  it('filters movies by search term', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.changeText(input, 'Inception');

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeTruthy();
      expect(screen.queryByText('Interstellar')).toBeNull();
    });
  });

  it('shows loading spinner when loading', () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('shows "No movies found" when no data available', () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByText('No movies found.')).toBeTruthy();
  });
});
