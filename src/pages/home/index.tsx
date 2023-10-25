import { useCallback, useEffect, useState } from 'react';
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

export type ContractController = { contract: string };

const Page = () => {
	const { ref, inView } = useInView();
	const [page, setPage] = useState(0);

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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContractController>();

	const onSubmit = (data: ContractController) => {
		setContractController({ contract: data.contract });
	};

	return (
		<div className="px-8 pt-12 sm:px-12">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('contract')} />
				<input type="submit" />
			</form>
			<div className="grid-cols-fluid grid gap-8">
				{data?.pages.map(({ nfts, next }) => (
					<React.Fragment key={next}>
						{nfts.map((nft) => (
							<Card key={nft.identifier} className="animate-enter-y">
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
