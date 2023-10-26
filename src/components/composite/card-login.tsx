import Image from 'next/image';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '~/components/ui/card';

import metamask from '~/assets/MetaMask_Fox.svg';
import { cn } from '~/lib/utils';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

export interface CardLoginProps {
	className?: string;
}

const CardLogin = ({ className }: CardLoginProps) => {
	const { address } = useAccount();
	const [name, setName] = useState('');
	const createUserMutation = api.user.create.useMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = useForm<{ name: string }>();

	const { connect, connectors } = useConnect();

	const submit = (val: { name: string }) => {
		setName(val.name);
	};

	console.log(address);

	useEffect(() => {
		if (name && address) {
			createUserMutation.mutate({ name, wallet: address });
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			router.push('/home');
		}
	}, [name, address]);

	return (
		<Card className={cn('w-[350px] animate-enter-y shadow-lg', className)}>
			<CardHeader className="pb-7">
				<CardTitle>Get started</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
					repellat.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-[28px] pb-10">
				<form className="flex w-full gap-3" onSubmit={handleSubmit(submit)}>
					<Input
						disabled={isSubmitSuccessful}
						placeholder="Tell me your name"
						{...register('name')}
					/>
					<Button className="w-20" type="submit">
						{isSubmitSuccessful ? <Check /> : 'Enter'}
					</Button>
				</form>
				<button
					onClick={() => connect({ connector: connectors[0] })}
					className="w-24 animate-gradient-x cursor-pointer rounded-full bg-gradient-to-r from-cyan-600 via-purple-400 to-orange-500 p-4 transition-all hover:scale-125 hover:animate-gradient-x-fast"
				>
					<Image
						src={metamask as string}
						alt="metamask icon"
						className="h-16"
					/>
				</button>
			</CardContent>
			<CardFooter className="justify-center">
				<p className="text-xs">Built by nick :)</p>
			</CardFooter>
		</Card>
	);
};

export default CardLogin;
