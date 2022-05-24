import { Renderer, EmojiRecord, EmojiSelection } from "picmo";

export class FacebookEmojiRender extends Renderer {
  private version: string;
  constructor(version: string) {
    super();
    this.version = version;
  }

  render(record: EmojiRecord, classNames = "picmo-facebook-emoji") {
    return this.renderImage(classNames, () => {
      return this.getFacebookImageUrl(record);
    });
  }

  emit(record: EmojiRecord): EmojiSelection {
    return {
      url: this.getFacebookImageUrl(record),
      hexcode: record.hexcode,
      emoji: record.emoji,
      label: record.label,
    };
  }

  getFacebookImageUrl(record: EmojiRecord) {
    return `https://cdn.jsdelivr.net/npm/emoji-datasource-facebook@${
      this.version
    }/img/facebook/64/${record.hexcode.toLowerCase()}.png`;
  }
}
