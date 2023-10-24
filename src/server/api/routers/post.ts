import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: publicProcedure
		.input(z.object({ name: z.string().min(1), wallet: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.user.create({
				data: {
					name: input.name,
					wallet: input.wallet,
				},
			});
		}),
});
