import * as React from "react";

import { ok as assert } from "assert";

import { FormattedReading } from "@/components/FormattedReading";
import { CourseDataLink } from "@/components/links/CourseDataLink";
import { default as ContentContributionsInHCI } from "@/content/ContributionsInHCI.mdx";
import { default as ContentNoReading } from "@/content/NoReading.mdx";
import { default as ContentVisionsOfHCI } from "@/content/VisionsOfHCI.mdx";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  AwayCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  OfficeHourCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const TIME_AND_LOCATION_LECTURE = {
  time: "10:00 to 11:20",
  location: "CSE2 G04",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.aways,
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.officeHours,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  assignments: { [key: string]: AssignmentCalendarItem };
  aways: AwayCalendarItem[];
  events: EventCalendarItem[];
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  studios: StudioCalendarItem[];
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2026-03-30", "Mon"),
    end: verifyCalendarDate("2026-06-12", "Fri"),
  },

  assignments: {
    projectProposal: {
      type: "assignment",
      title: "Project Proposal",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-04-19", "Sun"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246181",
    },
    projectMilestoneReport1: {
      type: "assignment",
      title: "Project Milestone Report",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-03", "Sun"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246177",
    },
    projectMilestoneReport2: {
      type: "assignment",
      title: "Project Milestone Report",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-24", "Sun"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246179",
    },
    projectFinalReport: {
      type: "assignment",
      title: "Project Final Report",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-06-08", "Mon"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246175",
    },
    // Copy-paste needed because typing currently cannot handle "dates"
    projectMilestoneMeetings1Tue: {
      type: "assignment",
      title: "Project Milestone Meetings",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-05", "Tue"),
    },
    projectMilestoneMeetings1Thu: {
      type: "assignment",
      title: "Project Milestone Meetings",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-07", "Thu"),
    },
    projectMilestoneMeetings2Tue: {
      type: "assignment",
      title: "Project Milestone Meetings",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-26", "Tue"),
    },
    projectMilestoneMeetings2Thu: {
      type: "assignment",
      title: "Project Milestone Meetings",
      link: SiteLinks.assignmentsProjectTop.href,
      date: verifyCalendarDate("2026-05-28", "Thu"),
    },

    // Reflection assignments.
    reflectionContribution: {
      type: "assignment",
      title: "Contribution Reflection",
      link: SiteLinks.assignmentsReflectionsContributionTop.href,
      date: verifyCalendarDate("2026-05-15", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246168",
    },
    reflectionMethod: {
      type: "assignment",
      title: "Method Reflection",
      link: SiteLinks.assignmentsReflectionsMethodTop.href,
      date: verifyCalendarDate("2026-05-15", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246171",
    },
    reflectionFraming: {
      type: "assignment",
      title: "Framing Reflection",
      link: SiteLinks.assignmentsReflectionsFramingTop.href,
      date: verifyCalendarDate("2026-05-29", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246170",
    },
    reflectionAdditional: {
      type: "assignment",
      title: "Additional Reflection",
      link: SiteLinks.assignmentsReflectionsTop.href,
      date: verifyCalendarDate("2026-06-05", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1881189/assignments/11246172",
    },
  },

  aways: [
    {
      date: verifyCalendarDate("2026-04-14", "Tue"),
      type: "away",
      title: "James Away",
    },
    {
      date: verifyCalendarDate("2026-04-16", "Thu"),
      type: "away",
      title: "James Away",
    },
    {
      date: verifyCalendarDate("2026-05-12", "Tue"),
      type: "away",
      title: "James Away",
    },
  ],

  events: [],

  holidays: [
    {
      date: verifyCalendarDate("2026-05-25", "Mon"),
      type: "holiday",
      title: "Memorial Day",
    },
  ],

  lectures: [
    // Week 1
    {
      date: verifyCalendarDate("2026-03-31", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Introductions and Overview",
      contentNonstandard: <ContentNoReading />,
    },
    {
      date: verifyCalendarDate("2026-04-02", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Visions of Human-Computer Interaction",
      contentNonstandard: (
        <ContentVisionsOfHCI
          readings={{
            visions: [
              {
                // Because this paper is reviewed in history discussion,
                // text below clarifies it can be read but will not be presented
                authorText: "Vannevar Bush",
                title: "As We May Think",
                publicationText: "The Atlantic. 1945",
                link: "https://theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
              },
              {
                authorText: "Mark Weiser",
                title: "The Computer for the 21st Century",
                publicationText: "Scientific American. 1991",
                link: "https://canvas.uw.edu/files/147527640",
              },
              {
                authorText: "James D. Hollan, Scott Stornetta",
                title: "Beyond Being There",
                publicationText: "CHI 1992",
                link: "https://canvas.uw.edu/files/147520024",
              },
              {
                authorText: "Pierre Wellner",
                title: "Interacting with Paper on the DigitalDesk",
                publicationText: "CACM. 1993",
                link: "https://canvas.uw.edu/files/147530376",
              },
              {
                authorText: "Benjamin B. Bederson, James D. Hollan",
                title:
                  "Pad++: A Zooming Graphical Interface for Exploring Alternate Interface Physics",
                publicationText: "UIST 1994",
                link: "https://canvas.uw.edu/files/147531035",
              },
              {
                authorText: "Hiroshi Ishii, Brygg Ullmer",
                title:
                  "Tangible Bits: Towards Seamless Interfaces between People, Bits and Atoms",
                publicationText: "CHI 1997",
                link: "https://canvas.uw.edu/files/147531323",
              },
              {
                authorText: "Eric Horvitz",
                title: "Principles of Mixed-Initiative User Interfaces",
                publicationText: "CHI 1999",
                link: "https://canvas.uw.edu/files/147531321",
              },
              {
                authorText:
                  "Ken Hinckley, Jeff Pierce, Mike Sinclair, Eric Horvitz",
                title: "Sensing Techniques for Mobile Interaction",
                publicationText: "UIST 2000",
                link: "https://canvas.uw.edu/files/147531290",
              },
              {
                authorText: "Saul Greenberg, Chester Fitchett",
                title:
                  "Phidgets: Easy Development of Physical Interfaces through Physical Widgets",
                publicationText: "UIST 2001",
                link: "https://canvas.uw.edu/files/147531234",
              },
              {
                authorText:
                  "Anthony LaMarca, Yatin Chawathe, Sunny Consolvo, Jeffrey Hightower, Ian Smith, James Scott, Timothy Sohn, James Howard, Jeff Hughes, Fred Potter, Jason Tabert, Pauline Powledge, Gaetano Borriello, Bill Schilit",
                title:
                  "Place Lab: Device Positioning Using Radio Beacons in the Wild",
                publicationText: "Pervasive 2005",
                link: "https://canvas.uw.edu/files/147531324",
              },
              {
                authorText:
                  "Jonathan Lester, Tanzeem Choudhury, Gaetano Borriello",
                title:
                  "A Practical Approach to Recognizing Physical Activities",
                publicationText: "Pervasive 2006",
                link: "https://canvas.uw.edu/files/147531325",
              },
              {
                authorText: "Bret Victor",
                title:
                  "Magic Ink: Information Software and the Graphical Interface",
                publicationText: "2006",
                link: "http://worrydream.com/MagicInk/",
              },
              {
                authorText:
                  "Michael S. Bernstein, Greg Little, Robert C. Miller, Björn Hartmann, Mark S. Ackerman, David R. Karger, David Crowell, Katrina Panovich",
                title: "Soylent: A Word Processor with a Crowd Inside",
                publicationText: "UIST 2010",
                link: "https://canvas.uw.edu/files/147531061",
              },
              {
                authorText:
                  "Chris Harrison, Hrvoje Benko, and Andrew D. Wilson",
                title: "OmniTouch: Wearable Multitouch Interaction Everywhere",
                publicationText: "UIST 2011",
                link: "https://canvas.uw.edu/files/147531284",
              },
            ],
          }}
        />
      ),
    },
    // Week 2
    {
      date: verifyCalendarDate("2026-04-07", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Contributions in Human-Computer Interaction",
      contentNonstandard: (
        <ContentContributionsInHCI
          readings={{
            framing: {
              authorText: "Jacob O. Wobbrock, Julie A. Kientz",
              title: "Research Contributions in Human-Computer Interaction",
              publicationText: "Interactions. 2016",
              link: "https://canvas.uw.edu/files/147531867",
            },
          }}
        />
      ),
      //   additionalResourceReadings: [
      //     {
      //       authorText: "Herbert A. Simon",
      //       title: "The Science of Design: Creating the Artificial",
      //       publicationText: "Design Issues, 1988",
      //       link: "https://canvas.uw.edu/files/109669331/",
      //     },
      //     {
      //       authorText: "Donald E. Stokes",
      //       title:
      //         "Pasteur’s Quadrant: Basic Science and Technological Innovation",
      //       publicationText: "Book Chapter, 1997",
      //       link: "https://canvas.uw.edu/files/109669330/",
      //     },
      //   ],
    },
    {
      date: verifyCalendarDate("2026-04-09", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Usability Evaluation Considered Harmful",
      readingsStandard: {
        framing: {
          authorText: "Saul Greenberg, Bill Buxton",
          title: "Usability Evaluation Considered Harmful (Some of the Time)",
          publicationText: "CHI 2008",
          link: "https://canvas.uw.edu/files/147531726",
        },
        instances: [
          {
            authorText: "Dan R. Olsen, Jr",
            title: "Evaluating User Interface Systems Research",
            publicationText: "UIST 2007",
            link: "https://canvas.uw.edu/files/147531664",
          },
          {
            authorText: "James Fogarty",
            title: "Code and Contribution in Interactive Systems Research",
            publicationText:
              "CHI 2017 Workshop on #HCI.Tools: Strategies and Best Practices for Designing, Evaluating, and Sharing Technical HCI Toolkits",
            link: "https://canvas.uw.edu/files/147531662",
          },
        ],
      },
    },
    // Week 3
    {
      dates: [
        verifyCalendarDate("2026-04-14", "Tue"),
        verifyCalendarDate("2026-04-16", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Office Hours for Project Groups",
    },
    // Week 4
    {
      date: verifyCalendarDate("2026-04-21", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Design Tools",
      readingsStandard: {
        framing: {
          authorText:
            "Mark W. Newman, James Lin, Jason I. Hong, James A. Landay",
          title:
            "DENIM: An Informal Web Site Design Tool Inspired by Observations of Practice",
          publicationText: "HCI. 2003",
          link: "https://canvas.uw.edu/files/148138315"
        },
        instances: [
          {
            authorText: "Jonathan Chen, Dongwook Yoon",
            title:
              "Exploring the Diminishing Allure of Paper and Low-Fidelity Prototyping Among Designers in the Software Industry: Impacts of Hybrid Work, Digital Tools, and Corporate Culture",
            publicationText: "CHI 2024",
            link: "https://canvas.uw.edu/files/148138253"
          },
          {
            authorText: "Peitong Duan, Jeremy Warner, Yang Li, Bjoern Hartmann",
            title:
              "Generating Automatic Feedback on UI Mockups with Large Language Models",
            publicationText: "CHI 2024",
            link: "https://canvas.uw.edu/files/147792902"
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2026-04-23", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Accessibility",
      guest: {
        name: "Martez Mott",
        link: "http://www.martezmott.com/",
      },
      readingsStandard: {
        framing: {
          authorText:
            "Jacob O. Wobbrock, Krzysztof Z. Gajos, Shaun K. Kane, Gregg C. Vanderheiden",
          title: "Ability-Based Design",
          publicationText: "CACM. 2018",
          link: "https://canvas.uw.edu/files/148167322",
        },
        instances: [
          {
            authorText: "Chen Liang, Yuxuan Liu, Martez Mott, Anhong Guo.",
            title: "HandProxy: Expanding the Affordances of Speech Interfaces in Immersive Environments with a Virtual Proxy Hand",
            publicationText: "IMWUT 2025",
            link: "https://canvas.uw.edu/files/148756863",
          },
          {
            authorText: "Jeremy Zhengqi Huang, Caluã de Lacerda Pataca, Liang-Yuan Wu, Dhruv Jain",
            title: "CapTune: Adapting Non-Speech Captions With Anchored Generative Models",
            publicationText: "ASSETS 2025",
            link: "https://canvas.uw.edu/files/148756860",
          },
        ],
      },
    },
    // Week 5
    {
      date: verifyCalendarDate("2026-04-28", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Interactive Devices and Fabrication",
      guest: {
        name: "Yiyue Luo",
        link: "https://yyueluo.com/",
      },
      readingsStandard: {
        framing: {
          authorText: "Hiroshi Ishii, Dávid Lakatos, Leonardo Bonanni, Jean-Baptiste Labrune",
          title: "Radical Atoms: Beyond Tangible Bits, Toward Transformable Materials",
          publicationText: "Interactions 2012",
          link: "https://canvas.uw.edu/files/148758208",
        },
        instances: [
          {
            authorText: "Junyi Zhu, Jackson C. Snowden, Joshua Verdejo, Emily Chen, Paul Zhang, Hamid Ghaednia, Joseph H. Schwab, Stefanie Mueller",
            title: "EIT-kit: An Electrical Impedance Tomography Toolkit for Health and Motion Sensing",
            publicationText: "UIST 2021",
            link: "https://canvas.uw.edu/files/148758207",
          },
          {
            authorText: "Yiyue Luo, Chao Liu, Young Joong Lee, Joseph DelPreto, Kui Wu, Michael Foshey, Daniela Rus, Tomás Palacios, Yunzhu Li, Antonio Torralba, Wojciech Matusik",
            title: "Adaptive Tactile Interaction Transfer via Digitally Embroidered Smart Gloves",
            publicationText: "Nature Communications 2024",
            link: "https://canvas.uw.edu/files/148758204",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2026-04-30", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Human-AI Interaction",
      guest: {
        name: "Kevin Feng",
        link: "https://kjfeng.me/",
      },
      readingsStandard: {
        framing: {
          authorText: "Eric Horvitz",
          title: "Principles of Mixed-Initiative User Interfaces",
          publicationText: "CHI 1999",
          link: "https://canvas.uw.edu/files/148138793",
        },
        instances: [
          {
            authorText: "Jeffrey Heer",
            title: "Agency plus Automation: Designing Artificial Intelligence into Interactive Systems",
            publicationText: "PNAS. 2019",
            link: "https://canvas.uw.edu/files/148758423",
          },
          {
            authorText: "K. J. Kevin Feng, Kevin Pu, Matt Latzke, Tal August, Pao Siangliulue, Jonathan Bragg, Daniel S. Weld, Amy X. Zhang, Joseph Chee Chang",
            title: "Cocoa: Co-Planning and Co-Execution with AI Agents",
            publicationText: "CHI 2026",
            link: "https://canvas.uw.edu/files/148758428",
          },
        ],
      },
    },
    // Week 7
    {
      date: verifyCalendarDate("2026-05-12", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      // tbd: true,
      title: "Research Topic: CSCW and Social Computing",
      guest: {
        name: "Mako Hill",
        link: "https://mako.cc/",
      },
      readingsStandard: {
        framing: {
          authorText: "Mark S. Ackerman",
          title:
            "The Intellectual Challenge of CSCW: The Gap Between Social Requirements and Technical Feasibility",
          publicationText: "HCI. 2000",
          // TODO: Set link to Spring 2026 Canvas file for this reading.
          // Previous URL:
          // "https://canvas.uw.edu/files/130016049/",
          link: "https://canvas.uw.edu/files/149562210",
        },
        // TODO: Select instance papers for Spring 2026.
        // instances: [
        //   {
        //     authorText:
        //       "Aaron Halfaker, R. Stuart Geiger, Jonathan T. Morgan, John Riedl",
        //     title:
        //       "The Rise and Decline of an Open Collaboration System: How Wikipedia’s Reaction to Popularity Is Causing Its Decline",
        //     publicationText: "American Behavioral Scientist 2012",
        //     // Previous URL:
        //     // "https://canvas.uw.edu/files/130016050/",
        //   },
        //   {
        //     authorText:
        //       "Morten Warncke-Wang, Rita Ho, Marshall Miller, Isaac Johnson",
        //     title:
        //       "Increasing Participation in Peer Production Communities with the Newcomer Homepage",
        //     publicationText: "CSCW 2023",
        //     // Previous URL:
        //     // "https://canvas.uw.edu/files/130016264/",
        //   },
        // ],
        instances: [
          {
            authorText: "Chenyan Jia, Michelle S. Lam, Minh Chau Mai, Jeffrey T. Hancock, Michael S. Bernstein.",
            title: "Embedding Democratic Values into Social Media AIs via Societal Objective Functions",
            publicationText: "CSCW 2024",
            link: "https://canvas.uw.edu/files/149562211",
          },
          {
            authorText: "Jack Bandy, Nicholas Diakopoulos",
            title: "More Accounts, Fewer Links: How Algorithmic Curation Impacts Media Exposure in Twitter Timelines",
            publicationText: "CSCW 2021",
            link: "https://canvas.uw.edu/files/149562214",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2026-05-14", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Research Through Design",
      guest: {
        name: "Audrey Desjardins",
        link: "http://audreydesjardins.com/",
      },
      readingsStandard: {
        framing: {
          authorText: "William Gaver",
          title: "What Should We Expect from Research through Design?",
          publicationText: "CHI 2012",
          link: "https://canvas.uw.edu/files/148762666",
        },
        instances: [
          {
            authorText: "Audrey Desjardins, Jena McWhirter, Justin Petelka, Chandler Simon, Yuna Shin, Ruby K Peven, Philbert Widjaja",
            title: "On the Making of Alternative Data Encounters: The Odd Interpreters",
            publicationText: "CHI 2023",
            link: "https://canvas.uw.edu/files/148762656",
          },
          {
            authorText: "Noura Howell, Audrey Desjardins, Sarah Fox",
            title: "Cracks in the Success Narrative: Rethinking Failure in Design Research through a Retrospective Trioethnography",
            publicationText: "ToCHI 2021",
            link: "https://canvas.uw.edu/files/148762672",
          },
        ],
      },
    },
    // Week 8
    {
      date: verifyCalendarDate("2026-05-19", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Research Topic: Interface Toolkits",
      readingsStandard: {
        framing: {
          authorText: "Brad Myers, Scott E. Hudson, Randy Pausch",
          title: "Past, Present, and Future of User Interface Software Tools",
          publicationText: "TOCHI 2000",
          link: "https://canvas.uw.edu/files/148138926"
        },
        instances: [
          {
            authorText:
              "Junhan Kong, Mingyuan Zhong, James Fogarty, Jacob O. Wobbrock",
            title:
              "The Ability-Based Design Mobile Toolkit (ABD-MT): Developer Support for Runtime Interface Adaptation Based on Users' Abilities",
            publicationText: "MobileHCI 2024",
            link: "https://canvas.uw.edu/files/147793060"
          },
          {
            authorText:
              "Josh Pollock, Catherine Mei, Grace Huang, Elliot Evans, Daniel Jackson, Arvind Satyanarayan",
            title: "Bluefish: Composing Diagrams with Declarative Relations",
            publicationText: "UIST 2024",
            link: "https://canvas.uw.edu/files/147793058"
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2026-05-21", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      // tbd: true,
      title: "Research Topic: Human-Agent Interaction",
      guest: {
        name: "Gagan Bansal",
        link: "https://gagb.github.io/",
      },
      readingsStandard: {
        framing: {
          authorText:
            "Gagan Bansal, Jennifer Wortman Vaughan, Saleema Amershi, Eric Horvitz, Adam Fourney, Hussein Mozannar, Victor Dibia, Daniel S. Weld",
          title: "Challenges in Human-Agent Communication",
          publicationText: "arXiv. 2024",
          link: "https://canvas.uw.edu/files/148138718"
        },
        // TODO: Decide Spring 2026 instance papers.
        // instances: [
        //   {
        //     authorText:
        //       "Adam Fourney, Gagan Bansal, Hussein Mozannar, Cheng Tan, Eduardo Salinas, Erkang (Eric) Zhu, Friederike Niedtner, Grace Proebsting, Griffin Bassman, Jack Gerrits, Jacob Alber, Peter Chang, Ricky Loynd, Robert West, Victor Dibia, Ahmed Awadallah, Ece Kamar, Rafah Hosn, Saleema Amershi",
        //     title:
        //       "Magentic-One: A Generalist Multi-Agent System for Solving Complex Tasks",
        //     publicationText: "arXiv. 2024",
        //     // Previous URL:
        //     // "https://canvas.uw.edu/files/129687809/",
        //   },
        // ],
        instances: [
          {
            authorText:
              "Hussein Mozannar, Gagan Bansal, Cheng Tan, Adam Fourney, Victor Dibia, Jingya Chen, Jack Gerrits, Tyler Payne, Matheus Kunzler Maldaner, Madeleine Grunde-McLaughlin, Eric Zhu, Griffin Bassman, Jacob Alber, Peter Chang, Ricky Loynd, Friederike Niedtner, Ece Kamar, Maya Murad, Rafah Hosn, Saleema Amershi",
            title:
              "Magentic-UI: Towards Human-in-the-loop Agentic Systems",
            publicationText: "arXiv 2025",
            link: "https://canvas.uw.edu/files/149561485"
          },
          {
            authorText:
              "Faria Huq, Zora Zhiruo Wang, Frank F. Xu, Tianyue Ou, Shuyan Zhou, Jeffrey P. Bigham, Graham Neubig",
            title: "COWPILOT: A Framework for Autonomous and Human-Agent Collaborative Web Navigation",
            publicationText: "NAACL 2025 Demo",
            link: "https://canvas.uw.edu/files/149561482"
          },
        ],
      },
    },
    // Week 10
    {
      date: verifyCalendarDate("2026-06-02", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      tbd: true,
      title: "Research Topic: HCI and Health",
      guest: {
        name: "Sean Munson",
        link: "https://www.smunson.com/",
      },
      readingsStandard: {
        framing: {
          authorText: "Petr Slovak, Sean A. Munson",
          title:
            "HCI Contributions in Mental Health: A Modular Framework to Guide Psychosocial Intervention Design",
          publicationText: "CHI 2024",          
        },
        // TODO: Decide Spring 2026 instance papers.
        instances: [],
      },
    },
    {
      date: verifyCalendarDate("2026-06-04", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      // tbd: true,
      title: "Research Topic: Sustained HCI Research in the World",
      guests: [
        {
          name: "Richard Li",
          link: "https://lichard49.github.io/",
        },
        // {
        //   name: "Esther Jang",
        //   link: "https://estherjang.com/",
        // },
      ],
      readingsStandard: {
        framing: {
          authorText: "Philip Guo",
          title:
            "Ten Million Users and Ten Years Later: Python Tutor’s Design Guidelines for Building Scalable and Sustainable Research Software in Academia",
          publicationText: "UIST 2021",
          link: "https://canvas.uw.edu/files/147793197",
        },
        instances: [
          {
            authorText:
              "Richard Li, Philip Vutien, Sabrina Omer, Michael Yacoub, George Ioannou, Ravi Karkar, Sean A. Munson, James Fogarty",
            title:
              "Deploying and Examining Beacon for At-Home Patient Self-Monitoring with Critical Flicker Frequency",
            publicationText: "CHI 2025",
            link: "https://canvas.uw.edu/files/148139389",
          },
          {
            authorText: "Shaan Chopra, Jeanne Carroll, Jessica Pater",
            title: "Providing Context to the “Unknown”: Patient and Provider Reflections on Connecting Personal Tracking, Patient-Reported Insights, and EHR Data within a Post-COVID Clinic",
            publicationText: "CSCW 2024",
            link: "https://canvas.uw.edu/files/148941111",
          },
        ],
      },
    },
    // Project Meetings, Week 6 and Week 9
    {
      dates: [
        verifyCalendarDate("2026-05-05", "Tue"),
        verifyCalendarDate("2026-05-07", "Thu"),
        verifyCalendarDate("2026-05-26", "Tue"),
        verifyCalendarDate("2026-05-28", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      type: "lecture",
      title: "Project Milestone Meetings",
    },
  ],

  officeHours: [],

  studios: [],
};

// ---------------------------------------------------------------------------
// Archived Winter 2025 research-topic lectures and readings
// Preserved here for reference when planning future offerings.
// ---------------------------------------------------------------------------

// Week 3 - Human-Computer Interaction History (Apr 14)
// contentNonstandard: <ContentNoReading />,
// additionalResourceReadings: [
//   {
//     authorText: "Jonathan Grudin",
//     title:
//       "A Moving Target - The Evolution of Human-Computer Interaction",
//     publicationText: "Book Chapter",
//     link: "https://canvas.uw.edu/files/128522161/",
//   },
// ],

// Week 4 - Participatory Approaches to AI
// {
//   date: verifyCalendarDate("2025-01-30", "Thu"),
//   timeAndLocation: TIME_AND_LOCATION_LECTURE,
//   type: "lecture",
//   title: "Research Topic: Participatory Approaches to AI",
//   guest: {
//     name: "Amy X. Zhang",
//     link: "https://homes.cs.washington.edu/~axz/",
//   },
//   readingsStandard: {
//     framing: {
//       authorText:
//         "Saleema Amershi, Maya Cakmak, W. Bradley Knox, Todd Kulesza",
//       title:
//         "Power to the People: The Role of Humans in Interactive Machine Learning",
//       publicationText: "AI Magazine. 2014",
//       link: "https://canvas.uw.edu/files/129241122/",
//     },
//     instances: [
//       {
//         authorText:
//           "Min Kyung Lee, Daniel Kusbit, Anson Kahng, Ji Tae Kim, Xinran Yuan, Allissa Chan, Daniel See, Ritesh Noothigattu, Siheon Lee, Alexandros Psomas, Ariel D. Procaccia",
//         title:
//           "WeBuildAI: Participatory Framework for Algorithmic Governance",
//         publicationText: "CSCW 2019",
//         link: "https://canvas.uw.edu/files/129241182/",
//       },
//       {
//         authorText:
//           "Mitchell L. Gordon, Michelle S. Lam, Joon Sung Park, Kayur Patel, Jeff Hancock, Tatsunori Hashimoto, Michael S. Bernstein",
//         title:
//           "Jury Learning: Integrating Dissenting Voices into Machine Learning Models",
//         publicationText: "CHI 2022",
//         link: "https://canvas.uw.edu/files/129241151/",
//       },
//     ],
//   },
// }

// Week 5 - Designing with Children
// {
//   date: verifyCalendarDate("2025-02-04", "Tue"),
//   timeAndLocation: TIME_AND_LOCATION_LECTURE,
//   type: "lecture",
//   title: "Research Topic: Designing with Children",
//   guest: {
//     name: "Jason Yip",
//     link: "https://bigyipper.com/",
//   },
//   readingsStandard: {
//     framing: {
//       authorText:
//         "Jason C. Yip, Kiley Sobel, Caroline Pitt, Kung Jin Lee, Sijin Chen, Kari Nasu, Laura R. Pina",
//       title:
//         "Examining Adult-Child Interactions in Intergenerational Participatory Design",
//       publicationText: "CHI 2017",
//       link: "https://canvas.uw.edu/files/129499290/",
//     },
//     instances: [
//       {
//         authorText:
//           "Kung Jin Lee, Wendy Roldan, Tian Qi Zhu, Harkiran Kaur Saluja, Sungmin Na, Britnie Chin, Yilin Zeng, Jin Ha Lee, Jason Yip",
//         title:
//           "The Show Must Go On: A Conceptual Model of Conducting Synchronous Participatory Design With Children Online",
//         publicationText: "CHI 2021",
//         link: "https://canvas.uw.edu/files/129499288/",
//       },
//       {
//         authorText:
//           "Elana B. Blinder, Marshini Chetty, Jessica Vitak, Zoe Torok, Salina Fessehazion, Jason Yip, Jerry Alan Fails, Elizabeth Bonsignore, Tamara Clegg",
//         title:
//           "Evaluating the Use of Hypothetical 'Would You Rather' Scenarios to Discuss Privacy and Security Concepts with Children",
//         publicationText: "CSCW 2024",
//         link: "https://canvas.uw.edu/files/129499286/",
//       },
//     ],
//   },
// }

// Week 7 - ICTD
// {
//   date: verifyCalendarDate("2025-02-20", "Thu"),
//   timeAndLocation: TIME_AND_LOCATION_LECTURE,
//   type: "lecture",
//   title:
//     "Research Topic: Information and Communication Technologies and Development",
//   guest: {
//     name: "Kurtis Heimerl",
//     link: "https://kurti.sh/",
//   },
//   readingsStandard: {
//     framing: {
//       authorText:
//         "Lilly Irani, Janet Vertesi, Paul Dourish, Kavita Philip, Rebecca E. Grinter",
//       title: "Postcolonial Computing: A Lens on Design and Development",
//       publicationText: "CHI 2010",
//       link: "https://canvas.uw.edu/files/130302270/",
//     },
//     instances: [
//       {
//         authorText:
//           "Eric Brewer, Michael Demmer, Melissa Ho, R. J. Honicky, Joyojeet Pal, Madelaine Plauche, Sonesh Surana",
//         title:
//           "The Challenges of Technology Research for Developing Regions",
//         publicationText: "IEEE Pervasive Computing. 2006",
//         link: "https://canvas.uw.edu/files/130302268/",
//       },
//       {
//         authorText: "Dhruv Agarwal, Mor Naaman, Aditya Vashistha",
//         title:
//           "AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances",
//         publicationText: "To Appear, CHI 2025",
//         link: "https://canvas.uw.edu/files/130302426/",
//       },
//     ],
//   },
// }

// Week 8 - Mental Health and Wellness
// {
//   date: verifyCalendarDate("2025-02-27", "Thu"),
//   timeAndLocation: TIME_AND_LOCATION_LECTURE,
//   type: "lecture",
//   title: "Research Topic: Mental Health and Wellness",
//   guest: {
//     name: "Mary Czerwinski",
//     link: "https://www.microsoft.com/en-us/research/people/marycz/",
//   },
//   readingsStandard: {
//     framing: {
//       authorText: "Petr Slovak, Sean A. Munson",
//       title:
//         "HCI Contributions in Mental Health: A Modular Framework to Guide Psychosocial Intervention Design",
//       publicationText: "CHI 2024",
//       link: "https://canvas.uw.edu/files/130268073/",
//     },
//     instances: [
//       {
//         authorText:
//           "Jessica Schroeder, Chelsey Wilkes, Kael Rowan, Arturo Toledo, Ann Paradiso, Mary Czerwinski, Gloria Mark, Marsha M. Linehan",
//         title:
//           "PocketSkills: A Conversational Mobile Web App to Support Dialectical Behavioral Therapy",
//         publicationText: "CHI 2018",
//         link: "https://canvas.uw.edu/files/130268124/",
//       },
//       {
//         authorText:
//           "Esther Howe, Jina Suh, Mehrab Bin Morshed, Daniel McDuff, Kael Rowan, Javier Hernandez, Marah Ihab Abdin, Gonzalo Ramos, Tracy Tran, Mary Czerwinski",
//         title:
//           "Design of Digital Workplace Stress-Reduction Intervention Systems: Effects of Intervention Type and Timing",
//         publicationText: "CHI 2022",
//         link: "https://canvas.uw.edu/files/130268146/",
//       },
//     ],
//   },
// }
