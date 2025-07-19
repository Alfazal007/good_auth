import { ConvexHttpClient } from "convex/browser";

const convexClient = new ConvexHttpClient(process.env.CONVEX_URL!);

export {
    convexClient
}
