import { createPicker } from "picmo";
import { useFacebookEmoji } from "../src";

(async () => {
  const { emojiData, messages, FacebookEmojiRender } = await useFacebookEmoji({
    version: "14.0.0",
    locale: "en",
  });

  const picker = createPicker({
    rootElement: document.body,
    renderer: FacebookEmojiRender,
    emojiData: emojiData,
    messages: messages,
    locale: "en",
  });
})();
