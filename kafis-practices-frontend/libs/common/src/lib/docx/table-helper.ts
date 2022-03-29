import { HeightRule, Paragraph, Table, TableRow, VerticalAlign, WidthType } from "docx";
import { ITableCellMarginOptions } from 'docx/build/file/table/table-cell/cell-margin/table-cell-margins';
import { isNil, range } from "lodash";
import { SIDES } from "./common";
import { TableCellBuilder } from "./tablecell.builder";
import { TextBuilder } from "./text.builder";

export interface InputColumnData extends SimpleColumnData {
  subContent?: Paragraph;
}

export interface SimpleColumnData {
  content: Paragraph | Table;
  width?: number;
  borders?: SIDES[] | boolean;
  margins?: ITableCellMarginOptions;
  subContent?: Paragraph;
  valign?: VerticalAlign;
}

export class TableHelper {
  public static createInputRow(columns: InputColumnData[], width: number = 100): Table {
    return new Table({
      width: {
        size: width,
        type: WidthType.PERCENTAGE
      },
      rows: [
        TableHelper.createRow(columns),
        new TableRow({
          children: columns.map(column => {
            return new TableCellBuilder(column.subContent).setWidth(column.width ?? 100).get();
          })
        })
      ]
    })
  }

  public static createRow(columns: SimpleColumnData[], height?: number): TableRow {
    const options = {
      children: columns.map(column => {
        let cellBuilder = new TableCellBuilder(column.content);

        if (column.borders) {
          cellBuilder = Array.isArray(column.borders) ? cellBuilder.setBorder(column.borders) : cellBuilder.setBorder()
        }

        cellBuilder.setVerticalAlign(column.valign).setMargins(column.margins);

        cellBuilder = column.width ? cellBuilder.setWidth(column.width) : cellBuilder;
        return cellBuilder.get();
      })
    };
    if (!isNil(height)) options['height'] = { value: height, rule: HeightRule.ATLEAST };
    return new TableRow(options);
  }

  public static createTextArea(rows: number, width: number, fontSize: number): Table {
    return new Table({
      width: {
        size: width,
        type: WidthType.PERCENTAGE
      },
      rows: [
        ...range(rows).map(_ => TableHelper.createRow([{
          width: 100,
          content: new Paragraph({ children: [new TextBuilder('\u00A0').setFS(fontSize).get()] }),
          borders: [SIDES.BOTTOM]
        }], 100)),
      ]
    })
  }
}
