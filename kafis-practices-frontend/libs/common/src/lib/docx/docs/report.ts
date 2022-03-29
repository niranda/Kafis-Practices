import { TableHelper } from './../table-helper';
import { AlignmentType, HeightRule, PageBreak, Paragraph, Table, TableCell, TableRow, VerticalAlign, WidthType } from "docx";
import { TextBuilder } from "../text.builder";
import { TableCellBuilder } from '../tablecell.builder';
import { range } from 'lodash';
import { ITableCellMarginOptions } from 'docx/build/file/table/table-cell/cell-margin/table-cell-margins';
import { AdminReportResponse } from '@practice/interfaces';

export interface ReportInputData extends AdminReportResponse { }

const spacing = {
  line: 265
}

export const getReport = (data: ReportInputData): any => ({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 1000,
          left: 1800,
          right: 800,
        }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: new TextBuilder(
          'ЗВІТ\n'
          + 'кафедри інформаційних систем про проведення переддипломної практики\n'
          + `студентів ${data.year} курсу першого (бакалаврського) рівня вищої освіти факультету\n`
          + `«Інформаційних технологій» спеціальності ${data.specialty} у ****/**** навч. році`
        ).setFS(14).getSplitted(),
        spacing
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: new TextBuilder(
          `\n\t1. ОРГАНІЗАЦІЯ ПРАКТИКИ\t`
          + `\n\t1.1. Переддипломна практика студентів ${data.year} курсу денної форми навчання спеціальності ${data.specialty} проведена відповідно до програми переддипломної практики та за робочим планом. Викладачі кафедри, відповідальні за проведення практики, провели для студентів інструктивні збори (дистанційно, за допомогою інструменту відеоконференції Zoom), де повідомили студентів про терміни проходження практики, порядок збору матеріалів за темами, оформлення звітів та строки і регламент захисту звітів. В зборах також взяли участь завідуючий кафедрою, керівники практики від кафедри та викладач-інструктор з кафедри «Природоохоронних технологій, екології та безпеки життєдіяльності», яким було проведено інструктаж з охорони праці студентів перед початком переддипломної практики. Керівники практики за місяць до початку практики погодили робочі програми практики, тематику, питання керівництва практикою від організацій і підприємств. Серед підприємств, на яких студенти проходили практику дистанційно, були такі як ${data.organizationsNames?.join(', ')} та інші.\t`
          + `\n\t1.2. Мали місце труднощі щодо укладання договорів на проведення практики з підприємствами й організаціями. Кафедра інформаційних систем разом зі студентами активно займалися питаннями підбору баз практики, у результаті чого були укладені договори і всі студенти були забезпечені базами практики.`
          + `\n\t1.3. Студенти проходили практику в ${data.organizationsAmount} організаціях та підприємствах Харкова, Харківської області та інших регіонів України. Усі бази практики відповідали спеціальності ${data.specialty}, а також мали в своєму складі підрозділи, що займаються питаннями, пов\'язаними з напрямками спеціальності, використовують сучасні засоби комп\'ютерної та комунікаційної техніки для організації автоматизованої обробки інформації. Це дозволило студентам виконати завдання передбачені програмою практики у повному обсязі. У процесі проходження практики студенти ознайомилися зі станом автоматизації інформаційних систем управління на об\'єктах, придбали практичні навички за вивченими дисциплінами, зібрали матеріали написання дипломного проекту.\t`
          + `\n\t1.4. Усіма студентами дотримувався встановлений на підприємствах (організаціях) режим роботи. Студенти виконували роботу аналітиків ІС, постановників економічних задач, тестувальників, програмістів та кінцевих користувачів інформаційних систем різного спрямування.\t`
          + `\n\t1.5. На всіх підприємствах до початку практики студенти пройшли інструктаж з охорони праці (дистанційно, за допомогою інструментів відеоконференції).`
          + `\n\t1.6. Розподіл студентів за підрозділами здійснювався виходячи з необхідності збору матеріалів.\t`
          + `\n\t1.7. За час проходження практики студентами було проаналізовано бізнес-процеси об’єктів управління за обраним модулем, наведено схему організаційної структури управління об’єктом, визначене місце функціонального підрозділу в системі управління, вивчено положення про функціональні підрозділи, проаналізована структура діючої інформаційної системи управління, охарактеризовано функціональну та забезпечувальну частини, з використанням CASE-інструментів виконано інформаційний аналіз, змодельована предметна область підсистеми та побудовано її комплексну модель за схемою «як є». Також були розроблені специфікації вимог до створюваного модулю, набуто навичок з експлуатації функціональних модулів фахівців різних сфер діяльності, а також практичних навичок з упровадження функціональної АІС з подальшим вивченням застосованих методів та підходів до проектування таких систем, їх супроводу та тестування.\t`
          + `\n\t1.8. З урахуванням потреб в удосконаленні організаційних положень проходження виробничої практики, керівники практики від університету і підприємств (організацій) спільно обговорювали можливі зміни в основних положеннях даного виду практики.\t`
          + `\n\t1.9. Керівниками практики від кафедри інформаційних систем проводився контроль за виконанням студентами завдань, програми практики, календарного графіку проходження практики, дотримання трудової дисципліни у вигляді консультаційного інструктажу.\t`
          + `\n\t1.11. Програма практики виконана у повному обсязі. Усі студенти пройшли переддипломну практику у встановлені строки та оформили звіти з практики. Захист звітів проходив на кафедрі (дистанційно, за допомогою інструменту відеоконференції Zoom).\t`
        ).setFS(14).getSplitted(),
        spacing
      }),
      new Paragraph({
        children: [
          new PageBreak(),
          ...new TextBuilder('\t2. ПІДСУМКИ ПРАКТИКИ\n').setFS(14).getSplitted()
        ]
      }),

      createTable(data),

      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: new TextBuilder(
          `\n\tПідсумки практики розглядалися на засіданні кафедри інформаційних систем. Намічені заходи щодо підбору баз виробничої практики і своєчасного складання договорів на ****/**** навчальний рік.\t`
          + `\n\tЗвіти керівників практики розглянуті і затверджені на засіданні кафедри інформаційних систем (протокол № 13  від 02 червня 2020 р.).\t\n\n`
        ).setFS(14).getSplitted(),
        spacing
      }),
      new Table({
        rows: [
          TableHelper.createRow([{
            content: new Paragraph({
              children: new TextBuilder('\tЗавідувач кафедри\n\tінформаційних систем').setFS(14).getSplitted()
            }),
            width: 75,
            valign: VerticalAlign.CENTER
          }, {
            content: new Paragraph({
              children: [new TextBuilder('Ушакова І.О.').setFS(14).get()]
            }),
            width: 25,
            valign: VerticalAlign.CENTER
          }])
        ]
      })
    ]
  }]
});

function createTable(data: ReportInputData): Table {
  const createCell = (opt?: ICellOptions): TableCell => {
    opt = Object.assign({ text: '', valign: VerticalAlign.CENTER }, opt);
    return new TableCellBuilder(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: new TextBuilder(opt.text).setFS(12).getSplitted(),
      })
    ).setWidth(opt.width)
      .setBorder()
      .setVerticalAlign(opt.valign)
      .setMargins(opt.margins)
      .setColumnSpan(opt.columnSpan)
      .setRowSpan(opt.rowSpan).get();
  };

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE
    },
    rows: [
      new TableRow({
        children: [
          createCell({ text: 'Усього\nпроходили\nпрактику', width: 15, rowSpan: 2 }),
          createCell({ text: 'Звіти захистили з оцінками', width: 70, columnSpan: 11 }),
          createCell({ text: 'Не\nзахистили', width: 15, rowSpan: 2 }),
        ],
        height: {
          value: 400,
          rule: HeightRule.ATLEAST
        }
      }),
      new TableRow({
        children: [
          'Усього',
          '90-\n100\n(A)',
          '%',
          '82-\n89\n(B)',
          '%',
          '74-\n81\n(C)',
          '%',
          '64-\n73\n(D)',
          '%',
          '60-\n63\n(E)',
          '%',
        ].map((v, i) => createCell({
          text: String(v),
          width: i === 0 ? 10 : (65 / 10),
          margins: {
            top: 80,
            bottom: 80
          },
          valign: VerticalAlign.TOP
        })),
        height: {
          value: 1000,
          rule: HeightRule.ATLEAST
        }
      }),
      new TableRow({
        children: [
          data.allStudentsAmount,
          data.successfulStudentsAmount,
          ...(data.studentsGradesSummary.reduce((gradeSummaries, currentGradeSummaries) => {
            gradeSummaries.push(currentGradeSummaries.amount, currentGradeSummaries.percent);
            return gradeSummaries;
          }, [])),
          data.failedStudentsAmount
        ].map(v => createCell({ text: String(v) }))
      })
    ]
  });
}

interface ICellOptions {
  text?: string;
  width?: number;
  columnSpan?: number;
  rowSpan?: number;
  margins?: ITableCellMarginOptions;
  valign?: VerticalAlign
}
