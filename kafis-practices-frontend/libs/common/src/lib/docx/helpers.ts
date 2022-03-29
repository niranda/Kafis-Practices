import { formatDate } from '@angular/common';
import { Paragraph } from "docx";
import { TextBuilder } from "./text.builder";

export function getP(height: number): Paragraph {
  return new Paragraph({
    children: [new TextBuilder('\u00A0').setFS(height).get()],
    spacing: { after: 0, before: 0 }
  });
}

export function getDateWithMonth(date: string): string {
  return formatDate(date, 'dd.MM', 'en-US');
}

export function getYear(date: string): string {
  return formatDate(date, 'yy', 'en-US');
}
