import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
		>
			<main className={inter.className}>
					<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
};

export default api.withTRPC(MyApp);
