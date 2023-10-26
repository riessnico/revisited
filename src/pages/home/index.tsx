import { useEffect, useState } from 'react';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { useInView } from 'react-intersection-observer';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '~/components/ui/card';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '~/components/ui/badge';
import { useAccount } from 'wagmi';
import { Button } from '~/components/ui/button';

export type ContractController = { contract: string };

const Page = () => {
	const { address } = useAccount();
	const { ref, inView } = useInView();
	const searchMutation = api.user.updateSearch.useMutation();
	const { data: user, refetch } = api.user.getUser.useQuery(
		{
			wallet: address as string,
		},
		{ enabled: !!address },
	);

	const [contractController, setContractController] =
		useState<ContractController>({
			contract: '',
		});

	const { data, fetchNextPage } = api.item.retrieve.useInfiniteQuery(
		{ contract: contractController.contract },
		{
			enabled: Boolean(contractController.contract),
			retry: false,
			getNextPageParam: (lastPage) => lastPage.next,
		},
	);

	useEffect(() => {
		if (inView) void fetchNextPage();
	}, [inView]);

	const { register, handleSubmit } = useForm<ContractController>();

	const onSubmit = (data: ContractController) => {
		setContractController({ contract: data.contract });
		searchMutation.mutate({ wallet: address as string });
		void refetch();
	};

	return (
		<div className="h-screen bg-white px-8 pt-12 dark:bg-slate-950 sm:px-12">
			{user?.name && address ? (
				<div className="pb-6">
					<h1 className="tracking text-4xl tracking-tight">
						Hello, {user.name}.
					</h1>
					<small>
						You have a record of {user.searches ?? '0'} searches with us 💙
					</small>
				</div>
			) : (
				<p className="pb-6">Please register yourself first!</p>
			)}
			<form className="flex gap-2 pb-8" onSubmit={handleSubmit(onSubmit)}>
				<Input placeholder="Search for an nft!👏" {...register('contract')} />
				<Button>Submit</Button>
			</form>
			<div className="grid grid-cols-fluid gap-6">
				{data?.pages.map(({ nfts, next }) => (
					<React.Fragment key={next}>
						{nfts.map((nft) => (
							<Card key={nft.identifier} className="animate-enter-y shadow-lg">
								<CardHeader className="pb-10">
									<CardTitle>{nft.name}</CardTitle>
									<CardDescription>{nft.description}</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col items-center justify-center gap-3 pb-10">
									<div className="relative w-fit">
										<Badge className="absolute right-2 top-2 z-10">
											{nft.token_standard.toUpperCase()}
										</Badge>
										<Image
											src={nft.image_url}
											alt="metamask icon"
											width={300}
											height={600}
										/>
									</div>
								</CardContent>
								<CardFooter className="justify-start">
									<Link
										className="text-xs underline opacity-50"
										target="_blank"
										href={`https://opensea.io/assets/ethereum/${nft.contract}/${nft.identifier}`}
									>
										See on OpenSea
									</Link>
								</CardFooter>
							</Card>
						))}
					</React.Fragment>
				))}
				{contractController.contract && (
					<h3 className="animate-pulse" ref={ref}>
						Loading more Nfts
					</h3>
				)}
			</div>
		</div>
	);
};

export default Page;
