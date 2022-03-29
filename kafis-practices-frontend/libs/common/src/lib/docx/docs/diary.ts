import { Student } from '@practice/interfaces';
import { TableCellBuilder } from './../tablecell.builder';
import {
  Paragraph,
  AlignmentType,
  ImageRun,
  PageBreak,
  Table,
  WidthType,
  VerticalAlign,
  TableCell,
  TableRow,
  HeightRule,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
  HorizontalPositionRelativeFrom,
  PageNumberFormat,
  Footer,
  PageNumber,
  TextRun,
} from 'docx';
import { TableHelper } from './../table-helper';
import { TextBuilder } from './../text.builder';
import { fsize, SIDES } from '../common';
import { logoBase64 } from './res/logo';
import { Buffer } from 'buffer';
import { getDateWithMonth, getP, getYear } from '../helpers';
import { range } from 'lodash';
import { ITableCellMarginOptions } from 'docx/build/file/table/table-cell/cell-margin/table-cell-margins';

export interface DiaryInputData {
  student: Student
}

const LOGO = Buffer.from(logoBase64, 'base64');

const gradeLevelTranslates = ['бакалавр', 'бакалавр', 'магістр'];

function hasLargeName(name: string): boolean {
  return name.length > 40;
}

export const getDiary = (data: DiaryInputData): any => ({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 1200,
          left: 1000,
          right: 1300
        },
      },
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('МІНІСТЕРСТВО ОСВІТИ І НАУКИ УКРАЇНИ').setFS(16).setBold().setBreak().get(),
          ...new TextBuilder('\n\nХАРКІВСЬКИЙ НАЦІОНАЛЬНИЙ ЕКОНОМІЧНИЙ\nУНІВЕРСИТЕТ ІМЕНІ СЕМЕНА КУЗНЕЦЯ\n').setFS(14).setBold().getSplitted(),
        ]
      }),
      new Paragraph({
        children: [...new TextBuilder('\"Немає поганих професій,\nале є такі,\nякими ми поступаємося іншим"\n\n\t\t\t(М. Замакоїс).')
          .setBold().setItalic().getSplitted(),
        new ImageRun({
          data: LOGO,
          transformation: {
            width: 155,
            height: 155,
          },
          floating: {
            horizontalPosition: {
              align: HorizontalPositionAlign.RIGHT,
              relative: HorizontalPositionRelativeFrom.MARGIN
            },
            verticalPosition: {
              align: VerticalPositionAlign.CENTER,
              relative: VerticalPositionRelativeFrom.PARAGRAPH
            }
          }
        })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('61166, м. Харків, пр. Науки, 9-А,').setFS(14).setBold().setBreak(5).setSub().get(),
          new TextBuilder('тел.: 702-07-17, 702-04-59').setFS(14).setBold().setBreak().setSub().get(),
          new TextBuilder('www.hneu.edu.ua').setFS(14).setBold().setBreak().setSub().get(),
        ]
      }),

      TableHelper.createInputRow([{
        content: null,
        borders: [SIDES.BOTTOM],
      }]),

      // * -------------------------------------------------------------- DIARY face
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: new TextBuilder('ЩОДЕННИК ПРАКТИКИ\n ').setFS(26).setBold().setBreak().getSplitted()
      }),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 11,
          content: new Paragraph({
            children: [new TextBuilder('студента').setFS(14).get()]
          }),
        },
        {
          width: 79,
          content: new Paragraph({
            children: [new TextBuilder(data.student.fullName).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(прізвище, ім’я, по батькові)').get()]
          })
        }
      ]),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 12,
          content: new Paragraph({
            children: [new TextBuilder('факультет').setFS(14).get()]
          }),
        },
        {
          width: 78,
          content: new Paragraph({
            children: [new TextBuilder('Інформаційних технологій').setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
        }
      ]),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 10.5,
          content: new Paragraph({
            children: [new TextBuilder('кафедра').setFS(14).get()]
          }),
        },
        {
          width: 79.5,
          content: new Paragraph({
            children: [new TextBuilder('Інформаційних систем').setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
        }
      ]),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 42,
          content: new Paragraph({
            children: [new TextBuilder('освітньо-кваліфікаційний рівень').setFS(14).get()]
          }),
        },
        {
          width: 58,
          content: new Paragraph({
            children: [new TextBuilder(gradeLevelTranslates[data.student.gradeLevel]).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
        }
      ]),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 43,
          content: new Paragraph({
            children: [new TextBuilder('напрям підготовки /спеціальність').setFS(14).get()]
          }),
        },
        {
          width: 57,
          content: new Paragraph({
            children: [new TextBuilder(data.student.specialty).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(шифр і назва)').get()]
          })
        }
      ]),

      getP(2),
      TableHelper.createInputRow([
        {
          width: 7,
          content: new Paragraph({
            children: [new TextBuilder('курс').setFS(14).get()]
          }),
        },
        {
          width: 40,
          content: new Paragraph({
            children: [new TextBuilder(data.student.year.toString()).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
        },
        {
          width: 10,
          content: new Paragraph({
            children: [new TextBuilder(', група').setFS(14).get()]
          }),
        },
        {
          width: 43,
          content: new Paragraph({
            children: [new TextBuilder(data.student.groupCode).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
        }
      ]),
    ]
  },
  {
    properties: {
      page: {
        margin: {
          top: 1200,
          left: 1200,
          right: 1200
        },
        pageNumbers: {
          start: 2,
          formatType: PageNumberFormat.DECIMAL,
        },
      },
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                children: [
                  PageNumber.CURRENT,
                ], size : fsize(14),
              }),
            ],
          }),
        ],
      }),
    },

    // * --------------------------------------------------------------------------- 2
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('РОЗПОРЯДЖЕННЯ  НА  ПРАКТИКУ').setBold().get()
        ]
      }),

      TableHelper.createInputRow([
        {
          width: 10,
          content: new Paragraph({
            children: [new TextBuilder('Студент').get()]
          }),
        },
        {
          width: 90,
          content: new Paragraph({
            children: [new TextBuilder(data.student.fullName).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(прізвище, ім’я, по батькові)').get()]
          })
        }
      ]),

      getP(5),
      TableHelper.createInputRow([
        {
          width: 18,
          content: new Paragraph({
            children: [new TextBuilder('направляється на ').get()]
          }),
        },
        {
          width: 60,
          content: new Paragraph({
            children: [new TextBuilder('переддипломну').get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(вид практики)').get()]
          })
        },
        {
          width: 12,
          content: new Paragraph({
            children: [new TextBuilder(' практику в').get()]
          }),
        },
      ]),

      getP(5),
      TableHelper.createInputRow([
        {
          width: 5,
          content: new Paragraph({
            children: [new TextBuilder('місто ').get()]
          }),
        },
        {
          width: 30,
          content: new Paragraph({
            children: [new TextBuilder(data.student.organization.city).get()]
          }),
          borders: [SIDES.BOTTOM],
        },
        {
          width: 3,
          content: new Paragraph({
            children: [new TextBuilder(' на').get()]
          }),
        },
        {
          width: 42,
          content: hasLargeName(data.student.organization.name) ? null : new Paragraph({
            children: [new TextBuilder(data.student.organization.name).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(назва підприємства)').get()]
          }),
        },
      ]),
      getP(5),
      TableHelper.createInputRow([{
        content: hasLargeName(data.student.organization.name) ? new Paragraph({
          children: [new TextBuilder(data.student.organization.name).get()]
        }) : null,
        borders: [SIDES.BOTTOM],
      }]),

      getP(1),
      TableHelper.createInputRow([
        {
          width: 22,
          content: new Paragraph({
            children: [new TextBuilder('Термін практики: з ').get()]
          }),
        },
        {
          width: 30,
          content: new Paragraph({
            children: [new TextBuilder(getDateWithMonth(data.student.practiceDates.startDate)).get()]
          }),
          borders: [SIDES.BOTTOM],
        },
        {
          width: 4,
          content: new Paragraph({
            children: [new TextBuilder(' по').get()]
          }),
        },
        {
          width: 34,
          content: new Paragraph({
            children: [new TextBuilder(getDateWithMonth(data.student.practiceDates.endDate)).get()]
          }),
          borders: [SIDES.BOTTOM],
        },
        {
          width: 10,
          content: new Paragraph({
            children: [new TextBuilder('20' + getYear(data.student.practiceDates.endDate) + 'р.').get()]
          }),
        },
      ]),
      new Paragraph({
        children: [new TextBuilder('(включаючи проїзд туди й назад).').get()]
      }),
      getP(8),
      TableHelper.createInputRow([
        {
          width: 31,
          content: new Paragraph({
            children: [new TextBuilder('Керівник практики від ЗВО').get()]
          }),
        },
        {
          width: 69,
          content: new Paragraph({
            children: [new TextBuilder(data.student.teacher.position + ' ' + data.student.teacher.fullName).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            children: [new TextBuilder('(посада, прізвище, ім’я, по батькові)').get()]
          })
        },
      ]),
      getP(5),
      TableHelper.createInputRow([{
        content: null,
        borders: [SIDES.BOTTOM],
      }]),

      new Paragraph({
        children: new TextBuilder('Печатка\n\u00A0\u00A0ЗВО').setFS(11).getSplitted()
      }),

      TableHelper.createInputRow([
        {
          width: 20,
          content: new Paragraph({
            children: [new TextBuilder('Декан факультету').get()]
          }),
        },
        {
          width: 80,
          content: new Paragraph({
            children: [new TextBuilder('\t\tКоц Г.П.').get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(підпис,   прізвище,  ім\'я,   по   батькові)').get()]
          })
        },
      ]),
      getP(10),
      TableHelper.createInputRow([{
        content: null,
        borders: [SIDES.BOTTOM],
      }]),

      getP(10),
      TableHelper.createInputRow([
        {
          width: 42,
          content: new Paragraph({
            children: [new TextBuilder('Керівник практики від підприємства').get()]
          }),
        },
        {
          width: 58,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder('(посада,   прізвище,  ім\'я,   по   батькові)').get()]
          })
        },
      ]),
      getP(10),
      TableHelper.createInputRow([{
        content: null,
        borders: [SIDES.BOTTOM],
      }]),

      new Paragraph({
        children: [new TextBuilder('Прибув на підприємство\n').get()]
      }),
      new Paragraph({
        children: new TextBuilder('Печатка\nпідпри-\nємства').setFS(11).setBreak().getSplitted()
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextBuilder('"____"_______________________20____р.').get()]
      }),

      TableHelper.createInputRow([{
        content: new Paragraph({ children: [new TextBuilder('').setBreak(2).get()] }),
        subContent: new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextBuilder('(посада, підпис, прізвище, ініціали відповідальної особи)').get()]
        }),
        borders: [SIDES.BOTTOM],
      }]),
      new Paragraph({
        children: [new TextBuilder('Вибув з підприємства\n').get()]
      }),
      new Paragraph({
        children: new TextBuilder('Печатка\nпідпри-\nємства').setFS(11).setBreak().getSplitted()
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextBuilder('"____"_______________________20____р.').get()]
      }),
      TableHelper.createInputRow([{
        content: new Paragraph({ children: [new TextBuilder('').setBreak(2).get()] }),
        subContent: new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextBuilder('(посада, підпис, прізвище, ініціали відповідальної особи)').get()]
        }),
        borders: [SIDES.BOTTOM],
      }]),

      // * --------------------------------------------------------------------------- 3
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new PageBreak(),
          new TextBuilder('1. Основні положення практики').setBold().setFS(14).get()
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.1. Студент до відбуття на практику повинен прослухати інструктаж керівника практики та отримати:').setFS(14).setBreak().get(),
        ],
      }),
      new Paragraph({
        children: new TextBuilder('оформлений  щоденник;\nіндивідуальні  завдання з практики;\nдва примірники календарного графіка проходження практики (один — для студентів і один — для керівника практики від підприємства);\nнаправлення  на практику;\nнаправлення  на поселення в гуртожиток  (у разі потреби).').setFS(14).setBreak().getSplitted()
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.2. Студент, прибувши на підприємство, повинен подати керівникові від підприємства щоденник, пройти інструктаж з техніки безпеки й пожежної профілактики, ознайомитися з робочим місцем, правилами експлуатації устаткування та уточнити план проходження практики.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.3. Під час проходження практики студент зобов\'язаний суворо додержувати правил внутрішнього розпорядку  підприємства.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.4. Звіт про практику студент складає відповідно до календарного графіка проходження практики й додаткових вказівок керівників практики від ХНЕУ й від підприємства.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.5. Практика студента оцінюється за 100-бальною системою й  враховується при призначенні стипендії нарівні з іншими дисциплінами навчального плану.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t1.6. Студент, що не виконав вимог практики й дістав негативний відгук про роботу або незадовільну оцінку під час захисту звіту, направляється повторно на практику під час канікул.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('').setBreak(13).get(),
        ]
      }),

      // * --------------------------------------------------------------------------- 4
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new PageBreak(),
          new TextBuilder('2. Календарний графік проходження практики').setBold().setFS(14).get()
        ]
      }),
      getP(11),
      createScheduleTable(),

      getP(5),
      TableHelper.createInputRow([
        {
          width: 60,
          content: new Paragraph({
            children: new TextBuilder('\u00A0\u00A0\u00A0\u00A0Керівник практики:\n\u00A0\u00A0\u00A0\u00A0від закладу вищої освіти ')
              .setFS(11).getSplitted()
          }),
          valign: VerticalAlign.CENTER
        },
        {
          width: 15,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(підпис)').setFS(8).setSup().get()
            ]
          }),
        },
        {
          width: 2,
          content: null
        },
        {
          width: 31,
          content: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder(data.student.teacher.fullName).setFS(10).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(прізвище та ініціали)').setFS(8).setSup().get()
            ]
          }),
          valign: VerticalAlign.BOTTOM,
        }
      ], 66),
      getP(5),
      TableHelper.createInputRow([
        {
          width: 64,
          content: new Paragraph({
            children: new TextBuilder('\u00A0\u00A0\u00A0\u00A0від підприємства, організації, установи ')
              .setFS(11).getSplitted()
          }),
          valign: VerticalAlign.CENTER
        },
        {
          width: 12,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(підпис)').setFS(8).setSup().get()
            ]
          }),
        },
        {
          width: 2,
          content: null
        },
        {
          width: 22,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(прізвище та ініціали)').setFS(8).setSup().get()
            ]
          }),
        }
      ], 66),


      // * --------------------------------------------------------------------------- 5
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new PageBreak(),
          new TextBuilder('3. Робочі записи під час практики').setBold().setFS(14).get()
        ]
      }),
      TableHelper.createTextArea(40, 100, 14),

      // * --------------------------------------------------------------------------- 6
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new PageBreak(),
          new TextBuilder('4. Відгук і оцінка роботи студента на практиці').setBold().setFS(14).get()
        ]
      }),
      TableHelper.createInputRow([
        {
          content: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder(data.student.organization.name).setFS(14).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder(' (назва підприємства, організації, установи)').setFS(9).get()]
          })
        }
      ]),
      TableHelper.createTextArea(40, 100, 12),
      getP(1),
      TableHelper.createInputRow([
        {
          width: 75,
          content: new Paragraph({
            children: [
              new TextBuilder('Підпис керівника практики від підприємства/організації/установи ').get()
            ]
          }),
          subContent: new Paragraph({
            children: [
              new TextBuilder('Печатка').setFS(11).get()]
          }),
          valign: VerticalAlign.CENTER
        },
        {
          width: 25,
          content: new Paragraph({ children: [new TextBuilder('').get()] }),
          borders: [SIDES.BOTTOM],
        }
      ]),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextBuilder('«____»________________20___року').get()
        ]
      }),

      // * --------------------------------------------------------------------------- 7
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new PageBreak(),
          new TextBuilder('5. Відгук осіб, які перевіряли проходження практики').setBold().setFS(14).get()
        ]
      }),
      TableHelper.createTextArea(16, 100, 14),


      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('6. Висновок керівника практики від закладу вищої освіти про проходження практики')
            .setBold().setBreak().setFS(14).get()
        ]
      }),
      TableHelper.createTextArea(16, 100, 14),

      new Paragraph({
        children: [
          new TextBuilder('\u00A0\u00A0\u00A0\u00A0Дата складання заліку „___”_______________20____року').setFS(10).get(),
        ]
      }),
      TableHelper.createInputRow([
        {
          width: 55,
          content: new Paragraph({
            children: new TextBuilder('\u00A0\u00A0\u00A0\u00A0Оцінка:\n\u00A0\u00A0\u00A0\u00A0за шкалою університету').setFS(10).getSplitted()
          })
        },
        {
          width: 45,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(словами)').setFS(8).setSup().get()
            ]
          })
        }
      ], 45),

      new Paragraph({
        children: [
          new TextBuilder('\u00A0\u00A0\u00A0\u00A0Керівник практики від закладу вищої освіти').setFS(10).get()
        ]
      }),
      TableHelper.createInputRow([
        {
          width: 10,
          content: null
        },
        {
          width: 25,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(підпис)').setFS(8).setSup().get()
            ]
          })
        },
        {
          width: 5,
          content: null
        },
        {
          width: 60,
          content: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextBuilder(data.student.teacher.fullName).setFS(10).get()]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(прізвище та ініціали)').setFS(8).setSup().get()
            ]
          })
        }
      ], 30),
    ]
  },
  {
    properties: {
      page: {
        margin: {
          top: 1200,
          left: 1200,
          right: 1200
        },
      },
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                children: [
                  '',
                ]
              }),
            ],
          }),
        ],
      }),
    },
    // * --------------------------------------------------------------------------- end
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('7. Правила ведення й оформлення щоденника').setBold().setFS(14).get()
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.1. Щоденник — основний документ студента   під  час  проходження практики.').setFS(14).setBreak().get(),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.2. Коли студент проходить практику за межами міста, у якому знаходиться університет, щоденник для нього є також посвідченням про відрядження, що підтверджує тривалість перебування студента на практиці.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.3. Під час практики студент щодня повинен записувати в щоденник усе, що він зробив за день для виконання календарного графіка проходження практики. Докладні записи веде в робочих зошитах, які є продовженням щоденника.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.4. Не рідше як раз на тиждень студент зобов\'язаний подавати щоденник на перегляд керівникам практики від університету й від підприємства, які перевіряють щоденник, дають письмові зауваження, додаткові завдання й підписують записи, що їх зробив студент.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.5. Після закінчення практики щоденник разом із звітом має бути переглянутий керівниками практики, які складають відгуки й підписують його.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\t7.6. Оформлений щоденник разом із звітом студент повинен здати на кафедру.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('\tБез заповненого щоденника практика не зараховується.').setFS(14).setBreak().get(),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.END,
        children: [
          new TextBuilder('Зам. 56. Тир. 3000. ХНЕУ ім. С. Кузнеця, 2020.').setFS(12).setBreak(20).get(),
        ]
      }),
    ]
  }]
});

function createScheduleTable(): Table {
  const createCell = (opt?: ICellOptions): TableCell => {
    opt = Object.assign({ text: '', bold: false, fontSize: 8, alignment: AlignmentType.CENTER }, opt);
    return new TableCellBuilder(
      new Paragraph({
        alignment: opt.alignment,
        children: new TextBuilder(opt.text).setFS(opt.fontSize).setBold(opt.bold).getSplitted(),
      })
    ).setWidth(opt.width)
      .setBorder()
      .setVerticalAlign(VerticalAlign.CENTER)
      .setMargins(opt.margins)
      .setShading(opt.fillColor)
      .setColumnSpan(opt.columnSpan)
      .setRowSpan(opt.rowSpan).get();
  };

  const createCellFromText = (text: string, position: number): TableCell => {
    return createCell({
      text,
      alignment: position === 1 ? AlignmentType.LEFT : AlignmentType.CENTER,
      margins: position === 1 ? { left: 100, right: 100, top: 10, bottom: 10 } : null
    });
  }

  const WEEKS_AMOUNT = 15;
  const WEEKS_WIDTH = 56;
  const ROWS_AMOUNT = 24;

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE
    },
    rows: [
      new TableRow({
        children: [
          createCell({ text: '№\nз/п', width: 4, rowSpan: 2, bold: true, fillColor: 'C0C0C0' }),
          createCell({ text: 'Назви робіт', width: 35, rowSpan: 2, bold: true, fillColor: 'C0C0C0' }),
          createCell({ text: 'Тижні проходження практики', width: WEEKS_WIDTH, columnSpan: WEEKS_AMOUNT, bold: true, fillColor: 'C0C0C0' }),
          createCell({ text: 'Відмітки про\nвиконання', width: 12, rowSpan: 2, bold: true, fillColor: 'C0C0C0' }),
        ],
        height: {
          value: 500,
          rule: HeightRule.ATLEAST
        }
      }),
      new TableRow({
        children: range(WEEKS_AMOUNT).map(v => createCell({
          text: String(v + 1),
          width: WEEKS_WIDTH / (WEEKS_AMOUNT - 1),
          bold: true,
          margins: {
            top: 80,
            bottom: 80
          },
          fillColor: 'C0C0C0'
        })),
      }),
      new TableRow({
        children: range(WEEKS_AMOUNT + 3).map(c => createCell({ text: String(c + 1), fillColor: 'C0C0C0' }))
      }),
      new TableRow({
        children: [
          '1',
          'Проходження інструктажу з техніки безпеки',
          'Х',
          ...range(WEEKS_AMOUNT).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '2',
          'Ознайомлення з об’єктом управління та його організаційною структурою управління',
          'Х',
          ...range(WEEKS_AMOUNT).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '3',
          'Створення моделей організаційної структури об\'єкта управління з використанням  CASE-засобів',
          'Х',
          ...range(WEEKS_AMOUNT).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '4',
          'Ознайомлення з функціями конкретних підрозділів, які будуть автоматизовані в дипломному проекті',
          'Х',
          ...range(WEEKS_AMOUNT).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '5',
          'Виконання аналізу бізнес-процесів предметної області конкретного об\'єкта управління з виконанням CASE-засобів',
          '',
          'Х',
          ...range(WEEKS_AMOUNT - 1).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '6',
          'Ознайомлення з існуючими аналогами, які реалізують функції предметної області, використовуючи ресурси мережі Інтернет',
          '',
          'Х',
          ...range(WEEKS_AMOUNT - 1).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '7',
          'Виконання порівняльного аналізу знайдених аналогів та розроблення пропозицій щодо удосконалення функцій предметної обласні для об\'єкту управління',
          '',
          'Х',
          ...range(WEEKS_AMOUNT - 1).map(v => '')
        ].map(createCellFromText)
      }),
      new TableRow({
        children: [
          '8',
          'Оформлення звіту згідно з ДСТУ',
          '',
          'Х',
          ...range(WEEKS_AMOUNT - 1).map(v => '')
        ].map(createCellFromText)
      }),
      ...range(ROWS_AMOUNT).map(r => new TableRow({
        children: range(WEEKS_AMOUNT + 3).map(c => createCell())
      }))
    ]
  });
}

interface ICellOptions {
  text?: string;
  width?: number;
  fontSize?: number;
  alignment?: AlignmentType,
  columnSpan?: number;
  rowSpan?: number;
  bold?: boolean;
  margins?: ITableCellMarginOptions;
  fillColor?: string;
}
