import Head from "next/head";
import Image from "next/image";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "~/components/ui/card";

import metamask from "~/assets/MetaMask_Fox.svg";
import bg from "~/assets/pexels-michelangelo-buonarroti-8728382.jpg";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Head>
				<title>Enter the multiverse</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-row">
				<div className="h-screen w-full">
					<Image
						src={bg}
						alt="lau"
						layout="fill"
						objectFit="cover"
						style={{ maxWidth: "50%" }}
					/>
				</div>
				<div className="flex h-screen w-full items-center justify-center">
					<Card className="animate-enter-y w-[350px]">
						<CardHeader className="pb-10">
							<CardTitle className="self-center">The Way of Sea</CardTitle>
							<CardDescription className="self-center">
								Heal the ocean with the power of blockchain
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center gap-3 pb-10">
							<div>
								<div className="w-200 h-[1px] bg-slate-200"></div>
							</div>
							<Link href="/home">
								<div className="animate-gradient-x hover:animate-gradient-x-fast w-24 cursor-pointer rounded-full bg-gradient-to-r from-cyan-600 to-orange-500 p-4 transition-all hover:scale-125">
									<Image
										src={metamask as string}
										alt="metamask icon"
										className="h-16"
									/>
								</div>
							</Link>
						</CardContent>
						<CardFooter className="justify-center">
							<p className="text-xs">Built with 💙</p>
						</CardFooter>
					</Card>
				</div>
			</main>
		</>
	);
}
