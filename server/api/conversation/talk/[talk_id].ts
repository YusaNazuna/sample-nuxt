import { API_DOMAIN } from "@/config";
import { TalkMessageType } from "@/types";
import type { ConversationTalkResponse } from "@/types";

type ExternalApiResponseItem = {
  user_id: number;
  talk_id: string;
  message_type: TalkMessageType;
  tokens: number;
  message: string;
  document_link_1: string;
  document_link_2: string;
  document_link_3: string;
};

export default defineEventHandler<Promise<ConversationTalkResponse>>(
  async (event): Promise<ConversationTalkResponse> => {
    const talkId = getRouterParam(event, "talk_id") as string;
    const response = (await $fetch(
      `${API_DOMAIN}/conversation/${talkId}`
    )) as ExternalApiResponseItem[];

    return response.map((item) => {
      const links = [
        item.document_link_1,
        item.document_link_2,
        item.document_link_3,
      ].filter(Boolean);
      return {
        id: item.talk_id,
        type: item.message_type,
        message: item.message,
        links: links
      };
    });
  }
);
