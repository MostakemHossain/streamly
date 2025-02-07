import { z } from "zod";
import { createTRPCRouter, protectProcedure } from "../init";
export const appRouter = createTRPCRouter({
  hello: protectProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      console.log(opts.ctx.user);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
