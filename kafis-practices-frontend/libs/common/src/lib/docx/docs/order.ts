import { GradeLevel } from '@practice/enums';
import { PageBreak, TabStopPosition, TabStopType, VerticalAlign } from 'docx';
import { TableHelper } from './../table-helper';
import { TextBuilder } from './../text.builder';

import { blazonBase64 } from './res/blazon';
import { Buffer } from 'buffer';
import { AlignmentType, ImageRun, Paragraph, Table, WidthType } from 'docx';
import { AdminOrderResponse } from '@practice/interfaces';
import { SIDES } from '../common';
import { getP } from '../helpers';
import { formatDate } from '@angular/common';

const BLAZON = Buffer.from(blazonBase64, 'base64');
export interface OrderInputData extends AdminOrderResponse { }

export const getOrder = (data: OrderInputData[]): any => ({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 1500,
          left: 1500,
          right: 900,
        }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: BLAZON,
            transformation: {
              width: 104 / 2.2,
              height: 146 / 2.2,
            }
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextBuilder('МІНІСТЕРСТВО ОСВІТИ І НАУКИ УКРАЇНИ').setFS(16).setBold().get()]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: new TextBuilder('\nХАРКІВСЬКИЙ НАЦІОНАЛЬНИЙ ЕКОНОМІЧНИЙ\nУНІВЕРСИТЕТ ІМЕНІ СЕМЕНА КУЗНЕЦЯ').setFS(14).setBold().getSplitted()
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: new TextBuilder('\nНАКАЗ\n').setFS(16).setBold().getSplitted()
      }),
      new Table({
        rows: [
          TableHelper.createRow([
            {
              width: 33,
              content: new Paragraph({
                children: [
                  new TextBuilder('31.03.2020').setFS(13.5).setUnderline().get(),
                  ...new TextBuilder('\n\nПро проведення практики\n').setFS(12).getSplitted()
                ]
              })
            },
            {
              width: 33,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('м. Харків').setFS(10).get(),
                ]
              })
            },
            {
              width: 33,
              content: new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextBuilder('№408–C').setFS(13.5).setUnderline().get(),
                ]
              })
            }
          ])
        ]
      }),
      // * student list
      ...data.reduce((res, item, i) => res.concat(getStudentList(item, i + 1)), []),
      getP(14),
      getP(14),
      getP(14),
      getNum(data.length + 1),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: new TextBuilder(
          '\nЗАБЕЗПЕЧИТИ:\t\n\nМОСКВИЧ М.М., інженеру І категорії з охорони праці відділу охорони праці, '
          + 'БУЦУ Ю.В., завідувачу кафедри природоохоронних технологій, екології та безпеки життєдіяльності проведення інструктажу студентам з техніки безпеки та охороні праці перед початком практики.\t\n'
        ).setFS(14).getSplitted()
      }),
      getNum(data.length + 2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: new TextBuilder(
          '\n\nКерівникам практики ПРОВЕСТИ інструктаж студентів про порядок проходження практики, ЗАБЕЗПЕЧИТИ завданням та необхідними документами відповідно до програми практики.\t\n'
          + 'До 27.04.2020 р. ПОДАТИ керівнику виробничої практики ЧЕПЕЛЬ І.В. графік від’їзду викладачів на бази практики, згідно з навчальним навантаженням в індивідуальних планах.\t\n'
          + 'Керівникам практики до початку проведення практики виїхати на підприємства для організації необхідної підготовки до приїзду студентів-практикантів і своєчасного початку практики.\t\n'
        ).setFS(14).getSplitted()
      }),
      getNum(data.length + 3),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        children: new TextBuilder(
          '\n\nКонтроль за виконанням наказу ПОКЛАСТИ на заступника керівника (проректора з науково-педагогічної роботи) АФАНАСЬЄВА М.В.'
          + '\n\n\n' + 'Ректор\tВ. С. Пономаренко'
        ).setFS(14).getSplitted()
      }),
      new Paragraph({
        children: [new PageBreak()]
      }),
      getP(270),
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        rows: [
          ['Заступник керівника\n(проректор \nз науково-педагогічної роботи)', 'М. В. Афанасьєв'],
          ['Завідувач кафедри інформаційних систем\nк.е.н., доц.', 'І.О. Ушакова'],
          ['Завідувач кафедри природоохоронних\nтехнологій, екології та безпеки\nжиттєдіяльності', 'Ю. В. Буц'],
          ['Інженер І категорії з охорони\nпраці відділу охорони праці', 'М.М. Москвич'],
          ['Юрисконсульт І категорії', 'Я. О. Чуприна'],
          ['Керівник виробничої практики', 'І. В.Чепель'],
        ].map(line => TableHelper.createRow([
          {
            width: 50,
            content: new Paragraph({
              children: new TextBuilder(line[0]).setFS(14).setBreak().getSplitted()
            })
          },
          {
            width: 18,
            content: null,
            borders: [SIDES.BOTTOM]
          },
          {
            width: 30,
            content: new Paragraph({
              children: [new TextBuilder(`\u00A0\u00A0\u00A0\u00A0${line[1]}`).setFS(14).get()]
            }),
            valign: VerticalAlign.BOTTOM
          }
        ]))
      })
    ]
  }]
});

function getNum(n: number): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: new TextBuilder(`\n§ ${n}`).setFS(14).getSplitted()
  });
}

function getStudentList(data: AdminOrderResponse, num: number): any {
  return [
    getNum(num),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      children: new TextBuilder(
        '\nНАПРАВИТИ:\t\n\n'
        + `Студентів ${data.year} курсу ${getGradeLevel(data.gradeLevel)} рівня вищої освіти факультету «Інформаційних технологій» `
        + `спеціальності ${data.specialty}, `
        + `освітньо-професійної програми «${data.specialization}»  `
        + `на підприємства та установи для проходження переддипломної  практики з ${formatDate(data.startDate, 'dd.MM.yy', 'en-US')} по ${formatDate(data.endDate, 'dd.MM.yy', 'en-US')} `
        + `згідно з навчальним планом:`
      ).setFS(14).getSplitted()
    }),
    ...data.studentOrders.reduce((res, studentOrder) => {
      return res.concat([
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextBuilder(studentOrder.organizationName).setFS(14).setBreak(2).get()
          ]
        }),
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE
          },
          rows: studentOrder.students.map((student, i) => TableHelper.createRow([
            {
              width: 5,
              content: new Paragraph({
                children: [new TextBuilder(`${i + 1}.`).setFS(14).get()]
              }),
            },
            {
              width: 40,
              content: new Paragraph({
                children: [new TextBuilder(upperFirstWord(student.studentName)).setFS(14).get()]
              }),
            },
            {
              width: 55,
              content: new Paragraph({
                children: [new TextBuilder(`- керівник, ${student.teacherPosition} ${student.teacherName}`).setFS(14).get()]
              }),
            }
          ]))
        })
      ]);
    }, [])
  ];
}

function upperFirstWord(line: string): string {
  const splitted = line.split(' ');
  return splitted[0].toUpperCase() + ' ' + splitted[1] + ' ' + splitted[2];
}

function getGradeLevel(level: GradeLevel): string {
  switch (level) {
    case 1:
      return 'першого (бакалаврського)'
    case 2:
      return 'першого (скорочений термін навчання) (бакалаврського)'
    case 3:
      return 'другого (магістерського)'
  }
}
