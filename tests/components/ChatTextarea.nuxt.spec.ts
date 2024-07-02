// tests/components/SomeComponents.nuxt.spec.ts
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, cleanup, fireEvent } from '@testing-library/vue';
import ChatTextarea from "@/components/ChatTextarea.vue";

describe("ChatTextarea", () => {
    const findKey = "質問する";
    beforeEach(async() => {
        await renderSuspended(ChatTextarea, { props: {placeholder: findKey}});
    });

    afterEach(cleanup);

    it("テキストエリアが空であること", async () => {
        const textarea = screen.getByPlaceholderText(findKey) as HTMLInputElement;
        expect(textarea.value).toBe("");
    });

    it("ボタンが表示されないこと", async() => {
        const button = screen.getByText("送信").closest("button") as HTMLButtonElement;
        expect(button.style.display).toBe("none");
    });

    describe("テキストエリアに値を入力したとき", () => {
        const inputText = "てすと";
        beforeEach(async() => {
            const textarea = screen.getByPlaceholderText(findKey);
            await fireEvent.update(textarea, inputText);
        });

        it("入力した内容が反映されること", () => {
            const textarea = screen.getByPlaceholderText(findKey) as HTMLInputElement;
            expect(textarea.value).toBe(inputText);
        });

        it("ボタンが表示されること", async() => {
            const button = screen.getByText("送信").closest("button") as HTMLButtonElement;
            expect(button.style.display).not.toBe("none");
        });

        describe("送信ボタンを押下したとき", () => {
            beforeEach(async() => {
                const button = screen.getByText("送信").closest("button") as HTMLButtonElement;
                await fireEvent.click(button);
            });

            it("テキストエリアの値が空になること", () => {
                const textarea = screen.getByPlaceholderText(findKey) as HTMLInputElement;
                expect(textarea.value).toBe("");
            });
        });
    });
});
