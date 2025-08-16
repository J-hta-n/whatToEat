import { auth } from "@/lib/auth/config";
import { NextRequest } from "next/server";

export { auth as middleware } from "@/lib/auth/config";

export type RequestWithUserId = NextRequest & {
  userId?: string;
};

type Handler = (
  req: RequestWithUserId,
  ...args: any[]
) => Promise<Response> | Response;

/**
 * Auth middleware to append user ID to request object if user is logged in, else
 * pass through to access community resources for unauthenticated users.
 * @param handler
 * @returns
 */
export const withUserId = (handler: Handler) => {
  return auth(async function (
    req: NextRequest & { auth?: any },
    ...args: any[]
  ) {
    const requestWithUserId = req as RequestWithUserId;

    // Add only the user ID if authenticated
    if (req.auth?.user?.id) {
      requestWithUserId.userId = req.auth.user.id;
    }
    // If not authenticated, userId remains undefined (for community resources)

    // Pass the request and all additional arguments to the handler
    return await handler(requestWithUserId, ...args);
  });
};
