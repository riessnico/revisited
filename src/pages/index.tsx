import Head from 'next/head';
import Image from 'next/image';

import bg from '~/assets/pexels-michelangelo-buonarroti-8728382.jpg';
import { Sun, Moon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from 'next-themes';
import CardLogin from '~/components/composite/card-login';

export default function Home() {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<Head>
				<title>Enter the multiverse</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className="absolute right-2 top-2 z-10"
			>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
			<article className="flex">
				<div className="relative h-screen w-full">
					<Image
						src={bg}
						alt="lau"
						layout="fill"
						objectFit="cover"
						className="z-[-1]"
						style={{}}
					/>
					<CardLogin className="absolute bottom-0 w-full flex-col md:hidden" />
				</div>
				<div className="hidden h-screen w-full  items-center justify-center bg-white dark:bg-slate-950 md:flex">
					<CardLogin />
				</div>
			</article>
		</>
	);
}
