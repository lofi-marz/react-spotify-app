import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SpotifyApiContextProvider, useLocalToken } from 'spotify-api';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    const [token, setToken] = useLocalToken();
    if (token && token.expiryDate < new Date()) {
        //TODO: Refresh token
        console.log('Refresh token!');
    }
    return (
        <QueryClientProvider client={queryClient}>
            <SpotifyApiContextProvider token={token}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SpotifyApiContextProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
