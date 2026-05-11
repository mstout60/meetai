import { agentsRouter } from "@/modules/agents/server/procedures";

import { createTRPCRouter } from "../init";
import { meetinsRouter } from "@/modules/meetings/server/proedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetinsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
