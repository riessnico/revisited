import { z } from 'zod';
import ky from 'ky';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export type Nft = {
	identifier: string;
	collection: string;
	contract: string;
	token_standard: string;
	name: string;
	description: string;
	image_url: string;
	metadata_url: string;
	created_at: string;
	updated_at: string;
	is_disabled: boolean;
	is_nsfw: boolean;
};

export const itemRouter = createTRPCRouter({
	retrieve: publicProcedure
		.input(
			z.object({
				contract: z.string({
					required_error: 'It needs to be a string!',
					invalid_type_error: 'Invalid contract!',
				}),
				cursor: z.string().nullish(),
			}),
		)
		.query(async ({ input }) => {
			const searchParams = new URLSearchParams();

			if (input.cursor) searchParams.set('next', input.cursor);

			const { next, nfts } = await ky
				.get(
					`https://api.opensea.io/api/v2/chain/ethereum/contract/${input.contract}/nfts?next=${input.cursor}`,
					{
						headers: {
							accept: 'application/json',
							'x-api-key': process.env.OPENSEA_KEY,
						},
						searchParams,
					},
				)
				.json<{ next: string; nfts: Nft[] }>();

			return { next, nfts };
		}),
});
