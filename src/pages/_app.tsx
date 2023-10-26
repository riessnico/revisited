import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const inter = Inter({ subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
	const { chains, publicClient, webSocketPublicClient } = configureChains(
		[mainnet],
		[publicProvider()],
	);

	// Set up wagmi config
	const config = createConfig({
		autoConnect: true,
		connectors: [new MetaMaskConnector({ chains })],
		publicClient,
		webSocketPublicClient,
	});

	return (
		<WagmiConfig config={config}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
			>
				<main className={inter.className}>
					<Component {...pageProps} />
				</main>
			</ThemeProvider>
		</WagmiConfig>
	);
};

export default api.withTRPC(MyApp);
