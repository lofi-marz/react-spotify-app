import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import useLocalStorageSync from '../hooks/useLocalStorageSync';

const queryClient = new QueryClient();
export const SpotifyApiContext = React.createContext('');

function MyApp({ Component, pageProps }: AppProps) {
    const [token, setToken] = useLocalStorageSync('spotify-login-token', '');
    return (
        <QueryClientProvider client={queryClient}>
            <SpotifyApiContext.Provider
                value={token || ''}></SpotifyApiContext.Provider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}

export default MyApp;
