import { formatToJst, isToday, isYesterday, isLastWeek } from "@/utils/date";
import type { ConversationListResponse } from "@/types";
import { API_DOMAIN } from "@/config";

type ExternalApiResponseItem = {
  talk_id: string;
  title: string;
  status: string;
  last_message_at: string;
};

export default defineEventHandler<Promise<ConversationListResponse>>(
  async (): Promise<ConversationListResponse> => {
    const response = (await $fetch(
      `${API_DOMAIN}/conversation/list`
    )) as ExternalApiResponseItem[];
    return response.reduce(
      (acc, item) => {
        const { talk_id: id, title, status, last_message_at } = item;
        const lastUpdatedAt = formatToJst(new Date(last_message_at));
        const lastUpdatedAtDate = new Date(last_message_at);

        if (isToday(lastUpdatedAtDate)) {
          acc.today.push({ id, title, status, lastUpdatedAt });
        } else if (isYesterday(lastUpdatedAtDate)) {
          acc.yesterday.push({ id, title, status, lastUpdatedAt });
        } else if (isLastWeek(lastUpdatedAtDate)) {
          acc.lastWeek.push({ id, title, status, lastUpdatedAt });
        } else {
          acc.lastMonth.push({ id, title, status, lastUpdatedAt });
        }
        return acc;
      },
      {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
      } as ConversationListResponse
    );
  }
);
