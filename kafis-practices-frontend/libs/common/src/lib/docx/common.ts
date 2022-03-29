import { Paragraph } from "docx";
import { TextBuilder } from "./text.builder";

export const fsize = (pt: number) => pt * 2;
export enum SIDES {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}
