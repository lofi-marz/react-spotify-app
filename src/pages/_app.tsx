import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StoredToken, useLocalToken } from '../spotify-api';

const queryClient = new QueryClient();
export const SpotifyApiContext = React.createContext<StoredToken | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
    const [token, setToken] = useLocalToken();
    if (token && token.expiryDate < new Date()) {
        //TODO: Refresh token
        console.log('Refresh token!');
    }
    return (
        <QueryClientProvider client={queryClient}>
            <SpotifyApiContext.Provider value={token}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SpotifyApiContext.Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
