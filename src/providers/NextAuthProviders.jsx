
'use client'

import { SessionProvider } from 'next-auth/react';
import React from 'react';

const NextAuthProviders = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
};

export default NextAuthProviders;