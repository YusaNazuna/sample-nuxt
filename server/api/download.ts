import { API_DOMAIN } from "@/config";
import { encode } from "urlencode";

export default defineEventHandler(
  async (event) => {
    const body = await readBody(event);
    const path = encode(body["path"]);
    return (await $fetch(
      `${API_DOMAIN}/download/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/force-download"
        }
      }
    ));
  }
);
