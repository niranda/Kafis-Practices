import { Injectable } from '@angular/core';
import { Document, Packer } from "docx";
import { ContractInputData, getContract } from '../docx/docs/contract';
import { DiaryInputData, getDiary } from '../docx/docs/diary';
import { ReportInputData, getReport } from '../docx/docs/report';
import { OrderInputData, getOrder } from '../docx/docs/order';

@Injectable({
  providedIn: 'root'
})
export class DocBuilderService {

  constructor() { }

  public generateСontract(data: ContractInputData): Promise<Buffer> {
    const doc = new Document(getContract(data));
    return Packer.toBuffer(doc);
  }

  public generateDiary(data: DiaryInputData): Promise<Buffer> {
    const doc = new Document(getDiary(data));
    return Packer.toBuffer(doc);
  }

  public generateReport(data: ReportInputData): Promise<Buffer> {
    const doc = new Document(getReport(data));
    return Packer.toBuffer(doc);
  }

  public generateOrder(data: OrderInputData[]): Promise<Buffer> {
    return Packer.toBuffer(new Document(getOrder(data)));
  }

  public downloadDoc(buffer: Buffer, documentName: string = 'document', format: string = '.docx'): void {
    const blob = new Blob([buffer], { type: `application/${format}` });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = documentName + format;
    link.download = fileName;
    link.click();
  }

}
