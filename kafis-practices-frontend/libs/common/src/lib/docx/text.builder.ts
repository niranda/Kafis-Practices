import { TextRun, UnderlineType } from "docx";
import { fsize } from "./common";
export const DEFAULT_TEXT_OPTIONS = { size: fsize(12) };

export class TextBuilder {
  private options: any;

  constructor(text: string) {
    this.options = Object.assign({ text }, DEFAULT_TEXT_OPTIONS);
  }

  public setBreak(amount: number = 1): this {
    this.options.break = amount;
    return this;
  }

  public setFS(pt: number): this {
    this.options.size = fsize(pt);
    return this;
  }

  public setUnderline(options = {
    type: UnderlineType.SINGLE,
  }): this {
    this.options.underline = options;
    return this;
  }

  public setBold(f: boolean = true): this {
    this.options.bold = f;
    return this;
  }

  public setItalic(): this {
    this.options.italics = true;
    return this;
  }

  public setSub(): this {
    this.options.subScript = true;
    return this;
  }

  public setSup(): this {
    this.options.superScript = true;
    return this;
  }

  public get(): TextRun {
    return new TextRun(this.options);
  }

  public getSplitted(delimeter = '\n'): TextRun[] {
    const text = this.options.text.split(delimeter);
    return text.map((t: string, i: number) => {
      const opt = this.options;
      opt.text = t;
      i > 0 && this.setBreak();
      return new TextRun(opt);
    });
  }
}
