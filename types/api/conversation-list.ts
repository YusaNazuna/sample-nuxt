import type { SideMenuDateKey } from "@/types";

export type ConversationListResponseItem = {
  id: string;
  title: string;
  status: string;
  lastUpdatedAt: string;
};

export type ConversationListResponse = {
  [K in SideMenuDateKey]: ConversationListResponseItem[];
};
