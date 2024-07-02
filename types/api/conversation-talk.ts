import { TalkMessageType } from "@/types";

export type ConversationTalkResponseItem = {
  id: string;
  type: TalkMessageType;
  message: string;
  links: string[];
};

export type ConversationTalkResponse = ConversationTalkResponseItem[];
