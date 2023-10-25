import { userRouter } from '~/server/api/routers/user';
import { createTRPCRouter } from '~/server/api/trpc';
import { itemRouter } from '~/server/api/routers/item';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
