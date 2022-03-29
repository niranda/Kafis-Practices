import { TableHelper } from './../table-helper';
import { AlignmentType, Paragraph, Table, TabStopPosition, TabStopType, VerticalAlign, WidthType } from "docx"
import { TextBuilder } from "../text.builder"
import { SIDES } from '../common';
import { range } from 'lodash';
import { getP } from '../helpers';

export interface ContractInputData {
  company: string;
  person: string;
  specialty: string;
  studentName: string;
  year: string;
  startDate: string;
  endDate: string;
  signingYear: string;
  attorney: string;
}

export const getContract = (data: ContractInputData): any => ({
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
      // * head
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('ДОГОВІР № ____').setFS(14).get(),
          new TextBuilder('про проведення практики студентів').setFS(14).setBreak().get(),
          new TextBuilder('закладу вищої освіти').setFS(14).setBreak().get(),
        ],
      }),
      // * location <-> date
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('місто Харків').setBreak().get(),
          new TextBuilder('\t «____» ___________ ' + data.signingYear + ' p.').get(),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
      }),
      // * desc
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextBuilder('Ми, що нижче підписалися, з однієї сторони, ').setBreak().get(),
          new TextBuilder('ХАРКІВСЬКИЙ НАЦІОНАЛЬНИЙ ЕКОНОМІЧНИЙ УНІВЕРСИТЕТ ІМЕНІ СЕМЕНА КУЗНЕЦЯ ').setFS(14).get(),
          new TextBuilder('(далі – заклад вищої освіти) в особі проректора з навчально-методичної роботи Університету').get()
        ],
      }),
      getP(3),
      // * position
      TableHelper.createInputRow([
        {
          content: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('к.е.н., доц. Немашкало К.Р.').get(),
            ]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(посада, прізвище та ініціали)').setFS(8).get(),
            ],
          }),
        }
      ]),
      getP(3),
      // * disposition
      TableHelper.createInputRow([
        {
          content: new Paragraph({
            children: [
              new TextBuilder(' діючого на підставі\t\tдовіреності '+ data.attorney).get(),
            ]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(статут або доручення)').setFS(8).get(),
            ],
          }),
        }
      ]),
      getP(3),
      // * organisation
      TableHelper.createInputRow([
        {
          width: 24,
          content: new Paragraph({
            children: [
              new TextBuilder(' і, з другої сторони').get(),
            ]
          })
        },
        {
          width: 76,
          content: new Paragraph({
            children: [
              new TextBuilder(`  ${data.company}`).setFS(13).get(),
            ]
          }),
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(назва підприємства, організації, установи тощо)').setFS(8).get(),
            ]
          }),
        }
      ]),
      getP(3),
      // * organisation - position
      TableHelper.createInputRow([
        {
          width: 34,
          content: new Paragraph({
            children: [
              new TextBuilder(' (надалі–база практики) в особі').get(),
            ]
          })
        },
        {
          width: 56,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(посада)').setFS(8).get(),
            ]
          }),
        }
      ]),
      getP(3),
      // * organisation - fullname
      TableHelper.createInputRow([
        {
          width: 77,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(прізвище, ініціали)').setFS(8).get(),
            ]
          }),
        },
        {
          width: 23,
          content: new Paragraph({
            children: [
              new TextBuilder(', діючого на підставі').get(),
            ]
          })
        }
      ]),
      getP(3),
      // * organisation - disposition
      TableHelper.createInputRow([
        {
          width: 50,
          content: null,
          borders: [SIDES.BOTTOM],
          subContent: new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextBuilder('(статут підприємства, розпорядження, доручення)').setFS(8).get(),
            ]
          }),
        },
        {
          width: 50,
          content: new Paragraph({
            children: [
              new TextBuilder(' (далі – сторони), уклали між собою договір:').get(),
            ]
          })
        }
      ]),
      new Paragraph({
        children: [
          new TextBuilder('\t1.  База практики зобов\'язується:').setBold().get(),
        ],
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.1.  Прийняти студентів на практику згідно з календарним планом:\n').get()
        ]
      }),
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        rows: [
          TableHelper.createRow([
            {
              width: 4,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('№').get(),
                  new TextBuilder('з/п').setBreak().get()
                ]
              }),
              borders: true,
              margins: {
                bottom: 200
              }
            },
            {
              width: 20,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('Спеціальність').get(),
                  new TextBuilder('(освітня програма)').setBreak().get()
                ]
              }),
              borders: true
            },
            {
              width: 6,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('Курс').get(),
                ]
              }),
              borders: true
            },
            {
              width: 16,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('Вид практики').get(),
                ]
              }),
              borders: true
            },
            {
              width: 22,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('Кількість студентів/').get(),
                  new TextBuilder('прізвище та ініціали').setBreak().get(),
                ]
              }),
              borders: true
            },
            {
              width: 22,
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('Термін практики').get(),
                  new TextBuilder('(початок - кінець)').setBreak().get(),
                ]
              }),
              borders: true
            },
          ]),
          TableHelper.createRow([
            {
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder('1').get(),
                ]
              }),
              borders: true
            },
            {
              content: new Paragraph({
                children: [
                  new TextBuilder(data.specialty).get(),
                  new TextBuilder('').setBreak().get(),
                ]
              }),
              borders: true,
              margins: {
                left: 50
              }
            },
            {
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder(data.year).get(),
                ]
              }),
              borders: true
            },
            {
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder("переддипломна").get(),
                ]
              }),
              borders: true
            },
            {
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder(data.studentName).get(),
                ]
              }),
              borders: true
            },
            {
              content: new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextBuilder(data.startDate +'р.-' + data.endDate + 'р.').get(),
                ]
              }),
              borders: true
            },
          ]),
        ]
      }),
      new Paragraph(''),
      new Paragraph({
        children: [
          new TextBuilder('\t1.2.  Призначити наказом кваліфікованих фахівців для керівництва практикою.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.3.  Створити належні умови для виконання студентами програми практики, не допускати їх використання до зайняття посад та виконання робіт, що не відповідають програмі практики та майбутньому фаху.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.4.  Забезпечити студентам умови безпечної праці на конкретному робочому місці. Проводити обов’язкові інструктажі з охорони праці: ввідний та на робочому місці. У разі потреби навчати студентів-практикантів безпечних методів праці.').get(),

        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.5.  Надати студентам-практикантам можливість користуватися матеріально-технічними засобами та інформаційними ресурсами, необхідними для  виконання програми практики.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.6.  Забезпечити облік виходів на роботу студентів-практикантів. Про всі порушення трудової дисципліни, внутрішнього розпорядку та про інші порушення повідомляти заклад вищої освіти.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.7.  Після закінчення практики надати характеристику на кожного студента-практиканта, в котрій відобразити виконання програми практики, якість підготовленого ним звіту тощо.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t1.8.  Надавати студентам можливість збору інформації для курсових та дипломних робіт за результатами діяльності підприємства, яка не є комерційною таємницею, на підставі направлень кафедр.').get(),
        ]
      }),
      TableHelper.createInputRow([
        {
          width: 35,
          content: new Paragraph({
            children: [
              new TextBuilder('\t1.9.  Додаткові умови').get()
            ]
          })
        },
        {
          width: 65,
          content: null,
          borders: [SIDES.BOTTOM]
        }
      ]),
      // * 2
      new Paragraph({
        children: [
          new TextBuilder('\t2.  Заклад вищої освіти зобов’язується:').setBold().get(),
        ],
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t2.1.  До початку практики надати базі практики для погодження програму практики, а не пізніше ніж за тиждень – список студентів, яких направляють на практику.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t2.2.  Призначити керівниками практики кваліфікованих викладачів.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t2.3.  Забезпечити додержання студентами трудової дисципліни і правил внутрішнього трудового розпорядку. Брати участь у розслідуванні комісією бази практики нещасних випадків, якщо вони сталися зі студентами під час проходження практики.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t2.4.  Заклад вищої освіти зобов\'язується не розголошувати використану інформацію про діяльність підприємства через знищення курсових, дипломних робіт та звітів у встановленому порядку.').get(),
        ]
      }),
      // * 3
      new Paragraph({
        children: [
          new TextBuilder('\t3.  Відповідальність сторін за невиконання договору:').setBold().setBreak().get(),
        ],
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t3.1.  Сторони відповідають за невиконання покладених на них обов’язків щодо організації і проведення практики згідно із законодавством про працю в Україні.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t3.2.  Усі суперечки, що виникають між сторонами за договором, вирішуються у встановленому порядку.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t3.3.  Договір набуває сили після його підписання сторонами і діє до кінця практики згідно з календарним планом.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t3.4.  Договір складений у двох примірниках: по одному – базі практики і закладу вищої освіти.').get(),
        ]
      }),
      new Paragraph({
        children: [
          new TextBuilder('\t3.5.	Місцезнаходження:').get(),
          new TextBuilder('заклад вищої освіти:  ').setBreak().get(),
          new TextBuilder('61166, м. Харків, пр. Науки,9-А').setBold().setUnderline().get(),
          new TextBuilder('\t\t\t').setBreak().get(),
          new TextBuilder('ХАРКІВСЬКИЙ НАЦІОНАЛЬНИЙ ЕКОНОМІЧНИЙ УНІВЕРСИТЕТ').setFS(11).setBold().setUnderline().get(),
          new TextBuilder('\t\t\t').setBreak().get(),
          new TextBuilder('ІМЕНІ СЕМЕНА КУЗНЕЦЯ').setFS(11).setBold().setUnderline().get()
        ]
      }),

      new Paragraph(''),
      TableHelper.createInputRow([
        {
          width: 18,
          content: new Paragraph({
            children: [
              new TextBuilder('база практики:').get()
            ]
          })
        },
        {
          width: 82,
          content: null,
          borders: [SIDES.BOTTOM]
        }
      ]),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextBuilder('Підписи та печатки').setFS(14).get()
        ]
      }),

      new Paragraph(''),
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        rows: [
          TableHelper.createRow([
            {
              width: 50,
              content: new Paragraph({
                children: [
                  new TextBuilder('Заклад  вищої освіти:').get()
                ]
              })
            },
            {
              width: 50,
              content: new Paragraph({
                children: [
                  new TextBuilder('База практики:').get()
                ]
              })
            }
          ]),
          TableHelper.createRow([
            {
              content: new Paragraph({
                children: [
                  new TextBuilder('проректор з навчально-методичної').get(),
                  new TextBuilder('роботи Університету').setBreak().get()
                ]
              })
            },
            {
              content: null
            }
          ]),
          TableHelper.createRow([
            {
              content: TableHelper.createInputRow([
                {
                  content: new Paragraph({
                    children: [
                      new TextBuilder('к.е.н, доц. Немашкало К.Р.').setBreak().get()
                    ]
                  }),
                  borders: [SIDES.BOTTOM],
                  subContent: new Paragraph({
                    children: [
                      new TextBuilder('(посада, прізвище та ініціали)').get()
                    ]
                  })
                }
              ], 90)
            },
            {
              content: TableHelper.createInputRow([
                {
                  content: new Paragraph({ children: [new TextBuilder('').setBreak().get()] }),
                  borders: [SIDES.BOTTOM],
                  subContent: new Paragraph({
                    children: [
                      new TextBuilder('(посада, прізвище та ініціали)').get()
                    ]
                  })
                }
              ], 90)
            }
          ]),
          TableHelper.createRow([
            ...[1, 2].map(x => ({
              content: TableHelper.createInputRow([
                {
                  content: new Paragraph({ children: [new TextBuilder('').setBreak().get()] }),
                  borders: [SIDES.BOTTOM],
                  subContent: new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextBuilder(' (підпис)').get()
                    ]
                  })
                }
              ], 90)
            }))
          ]),
          TableHelper.createRow([
            ...range(2).map(x => ({
              content: new Paragraph({
                children: [
                  new TextBuilder('"____" ___________________ ' + data.signingYear + ' p.').setBreak().get()
                ]
              })
            }))
          ]),
          TableHelper.createRow([
            ...range(2).map(x => ({
              content: new Paragraph({
                children: [
                  new TextBuilder('\t  М.П.').setBreak().get()
                ]
              })
            }))
          ])
        ],
      }),
      new Paragraph({ children: [new TextBuilder('').setBreak(2).get()] }),
      new Table({
        width: {
          size: 75,
          type: WidthType.PERCENTAGE
        },
        rows: [
          TableHelper.createRow([
            {
              width: 40,
              content: new Paragraph({
                children: [
                  new TextBuilder(' Керівник виробничої').get(),
                  new TextBuilder(' практики').setBreak().get()
                ]
              }),
              borders: true,
              valign: VerticalAlign.CENTER
            },
            {
              width: 30,
              content: new Paragraph({
                children: [
                  new TextBuilder(' Степанова В.В.').get()
                ]
              }),
              borders: true,
              valign: VerticalAlign.CENTER
            },
            {
              width: 30,
              content: null,
              borders: true
            }
          ], 600),
          TableHelper.createRow([
            {
              content: new Paragraph({
                children: [
                  new TextBuilder(' Завідувач кафедри').get(),
                ]
              }),
              borders: true,
              valign: VerticalAlign.CENTER
            },
            {
              content: new Paragraph({
                children: [
                  new TextBuilder(' Ушакова І.О.').get()
                ]
              }),
              borders: true,
              valign: VerticalAlign.CENTER
            },
            {
              content: null,
              borders: true
            }
          ], 600)
        ]
      })
    ],
  }]
});
