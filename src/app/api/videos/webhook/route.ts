const SINGING_SECRET = process.env.MUX_WEBHOOK_SECRET;
import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

export const POST = async (request: Request) => {
  if (!SINGING_SECRET) {
    throw new Error("Missing MUX_WEBHOOK_SECRET");
  }
  const headerPayload = await headers();
  const muxSignature = headerPayload.get("mux-signature");

  if (!muxSignature) {
    return new Response("Missing Mux-Signature header", { status: 401 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  mux.webhooks.verifySignature(
    body,
    {
      "mux-signature": muxSignature,
    },
    SINGING_SECRET
  );

  switch (payload.type as WebhookEvent["type"]) {
    case "video.asset.created":
      const data = payload.data as VideoAssetCreatedWebhookEvent["data"];
      if(!data.upload_id){
        return new Response("Missing upload_id in webhook payload", { status: 400 });
      }
      await db.update(videos).set({
        muxAssetId: data.id,
        muxStatus:data.status
      }).where(eq(videos.muxUploadId,data.upload_id))
      break;
  }
  return new Response("Webhook processed successfully", { status: 200 });
};
