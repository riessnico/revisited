import { ThemeProvider } from '~/components/theme-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function Layout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	const { setTheme, theme } = useTheme();

	return (
		<section>
			<Button
				onClick={() => console.log(theme)}
				className="absolute right-2 top-2"
			>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
			{children}
		</section>
	);
}
