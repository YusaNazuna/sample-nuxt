import { API_DOMAIN } from "@/config";
import type { H3Event, EventHandlerRequest } from "h3";
import type { ConversationQueryResponse } from "@/types";
import { TalkMessageType } from "@/types";

type ExternalApiRequestItem = EventHandlerRequest & {
  body: {
    userId: number;
    talkId: string;
    message: string;
  }
};

type ExternalApiResponseItem = {
  user_id: number;
  talk_id: string;
  tokens: number;
  output_message: string;
  links: string[];
};

export default defineEventHandler<Promise<ConversationQueryResponse>>(
  async (event: H3Event<ExternalApiRequestItem>): Promise<ConversationQueryResponse> => {
    const body = await readBody(event);

    const response = await $fetch(`${API_DOMAIN}/conversation/query`, {
      method: "post",
      body: {
        "user_id": body.userId,
        "talk_id": body.talkId || "new_talk",
        "input_message": body.message
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) as ExternalApiResponseItem;

    return {
      id: response.talk_id,
      type: TalkMessageType.Output,
      message: response.output_message,
      links: response.links
    };
  }
);
