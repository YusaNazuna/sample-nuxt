import { API_DOMAIN } from "@/config";
import type { H3Event, EventHandlerRequest } from "h3";

type ExternalApiRequestItem = EventHandlerRequest & {
  body: {
    id: string;
    title: string;
  }
};

export default defineEventHandler(
  async (event: H3Event<ExternalApiRequestItem>) => {
    const body = await readBody(event);

    await $fetch(`${API_DOMAIN}/conversation/update-title`, {
      method: "put",
      body: {
        "talk_id": body.id,
        "title": body.title,
        // [ 以下は仮項目 ]
        "status": 0,
        "last_message_at": "2024-02-15T10:17:35.552203"
      }
    });

    return {};
  }
);
