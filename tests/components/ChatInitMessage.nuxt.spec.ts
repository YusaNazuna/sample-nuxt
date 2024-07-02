// tests/components/SomeComponents.nuxt.spec.ts
import { it, expect, afterEach } from "vitest";
import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, cleanup } from '@testing-library/vue';
import ChatInitMessage from "@/components/ChatInitMessage.vue";
import { describe } from "vitest";

describe("ChatInitMessage", () => {
    afterEach(cleanup);
    it("Sample Test", async () => {
        await renderSuspended(ChatInitMessage);
        expect(screen.getByText("こんにちは。探したいファイルについて質問してください。")).toBeDefined();
    });
});
