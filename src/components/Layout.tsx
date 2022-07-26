import React from 'react';
import Head from 'next/head';
import { WithChildrenProps } from 'types';

type LayoutProps = WithChildrenProps;

export function Layout({ children }: LayoutProps) {
    return (
        <main className="flex flex h-screen w-screen grow flex-col flex-col items-center items-center justify-center justify-center overflow-clip bg-gradient-to-t from-zinc-50 to-white text-zinc-900 dark:bg-zinc-900">
            <Head>
                <title>hi</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {children}
        </main>
    );
}
