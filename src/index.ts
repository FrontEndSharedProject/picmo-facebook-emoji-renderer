import type { Emoji, MessagesDataset } from "emojibase";
import { createPicker, Renderer } from "picmo";
import { FacebookEmojiRender } from "./render";
import './style.css'

type Options = {
  version: string;
  locale: string;
};

type UseFacebookEmojiReturnType = {
  emojiData: Emoji[];
  messages: MessagesDataset;
  FacebookEmojiRender: Renderer;
};

const defaultOptions: Options = {
  version: "14.0.0",
  locale: "zh",
};

export function useFacebookEmoji(
  options: Partial<Options>
): Promise<UseFacebookEmojiReturnType> {
  options = Object.assign({}, defaultOptions, options);

  return new Promise(async (res) => {
    const [facebookEmojiDataBaseRes, emojibaseDataRes, messageRes] =
      await Promise.all([
        fetch(
          `https://cdn.jsdelivr.net/npm/emoji-datasource@${options.version}/emoji.json`
        ).then((res) => res.json()),
        fetch(
          `https://cdn.jsdelivr.net/npm/emojibase-data@latest/${options.locale}/data.json`
        ).then((res) => res.json()),
        fetch(
          `https://cdn.jsdelivr.net/npm/emojibase-data@latest/${options.locale}/messages.json`
        ).then((res) => res.json()),
      ]);

    let facebookEmojisData:Emoji[] = [];

    emojibaseDataRes.map((emojiConfig:Emoji) => {
      let target = facebookEmojiDataBaseRes.find(
        (existedIcon:any) =>
          existedIcon.unified.toUpperCase() ===
          emojiConfig.hexcode.toUpperCase()
      );
      if (target && target.has_img_facebook) {
        facebookEmojisData.push(emojiConfig);
      }
    });

    res({
      emojiData: facebookEmojisData,
      messages: messageRes,
      FacebookEmojiRender: new FacebookEmojiRender(options.version),
    });
  });
}
