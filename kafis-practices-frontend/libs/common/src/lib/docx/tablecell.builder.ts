import { isNil } from 'lodash-es';
import { BorderStyle, Paragraph, ShadingType, Table, TableCell, VerticalAlign, WidthType } from "docx";
import { SIDES } from "./common";
import { ITableCellMarginOptions } from 'docx/build/file/table/table-cell/cell-margin/table-cell-margins';

const DEFAULT_BORDER_OPTION = { style: BorderStyle.SINGLE, size: 5, color: '000000' };
const DEFAULT_BORDER_OPTIONS = {
  bottom: { style: BorderStyle.NIL, size: 0, color: '' },
  top: { style: BorderStyle.NIL, size: 0, color: '' },
  left: { style: BorderStyle.NIL, size: 0, color: '' },
  right: { style: BorderStyle.NIL, size: 0, color: '' },
};
export class TableCellBuilder {

  private options: any;

  constructor(content: Paragraph | Table = null) {
    this.options = {
      children: content ? [content] : [],
      borders: { ...DEFAULT_BORDER_OPTIONS },
    };
  }

  public setBorder(
    sides: SIDES[] = [SIDES.TOP, SIDES.RIGHT, SIDES.BOTTOM, SIDES.LEFT],
    option = DEFAULT_BORDER_OPTION
  ): this {
    const value = option;
    sides.forEach(side => {
      switch (side) {
        case SIDES.TOP:
          this.options.borders.top = value;
          break;
        case SIDES.RIGHT:
          this.options.borders.right = value;
          break;
        case SIDES.BOTTOM:
          this.options.borders.bottom = value;
          break;
        case SIDES.LEFT:
          this.options.borders.left = value;
          break;
      }
    });

    return this;
  }

  public setVerticalAlign(align?: VerticalAlign): this {
    if (isNil(align)) return this;
    this.options.verticalAlign = align;
    return this;
  }

  public setWidth(percentage: number): this {
    if (isNil(percentage)) return this;
    this.options.width = {
      size: percentage,
      type: WidthType.PERCENTAGE
    }
    return this;
  }

  public setMargins(options?: ITableCellMarginOptions): this {
    if (isNil(options)) return this;
    this.options.margins = options;
    return this;
  }

  public setColumnSpan(columnSpan: number): this {
    if (isNil(columnSpan)) return this;
    this.options.columnSpan = columnSpan;
    return this;
  }

  public setRowSpan(rowSpan: number): this {
    if (isNil(rowSpan)) return this;
    this.options.rowSpan = rowSpan;
    return this;
  }

  setShading(color?: string, shadingType = ShadingType.SOLID): this {
    if (isNil(color)) return this;
    this.options.shading = {
      type: shadingType,
      fill: color,
      color: color,
    }
    return this;
  }

  public get(): TableCell {
    return new TableCell(this.options);
  }
}
