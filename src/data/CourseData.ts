import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

const LINK_CANVAS = "https://canvas.uw.edu/courses/1881189";

export const courseData = {
  // Link to Canvas.
  linkCanvas: {
    href: LINK_CANVAS,
  },

  // Link to Canvas discussion.
  linkCanvasDiscussion: {
    href: LINK_CANVAS ? LINK_CANVAS + "/discussion_topics" : undefined,
  },

  // Link to Canvas discussion for project ideas.
  linkCanvasDiscussionProjectIdeas: {
    href: LINK_CANVAS ? LINK_CANVAS + "/discussion_topics/10393806" : undefined,
  },

  // Link to Canvas file folder of project samples.
  linkCanvasProjectProposalSamples: {
    href: LINK_CANVAS
      ? LINK_CANVAS + "/files/folder/project_samples"
      : undefined,
  },

  // Link to course GitHub.
  linkGitHub: {
    href: "https://github.com/uwcse510/web-cse510-26sp",
  },

  // Google Form: conference paper selections for Contributions in HCI class session.
  linkFormContributionsInHCIConferencePapers: {
    href: "https://forms.gle/PQMjo2YiwydvZPwAA",
  },

  // Link to UW COVID guidelines.
  linkUniversityCovidGuidelines: {
    href: "https://www.ehs.washington.edu/covid-19-prevention-and-response/covid-19-illness-and-exposure-guidance",
  },

  // Link to UW syllabus guidelines.
  linkUniversitySyllabusGuidelines: {
    href: "https://registrar.washington.edu/curriculum/syllabus-guidelines",
  },

  // Link to course Drive.
  linkDrive: {
    href: "https://drive.google.com/drive/folders/1ncai7HbvIhGcb-u496GCqdfi70LM_kqW?usp=sharing",
  },

  linkDriveVisionsSignup: {
    href: "https://docs.google.com/document/d/1fhMmLwfje_1fz6aePjR3IPsAw8MzFMWG-CqcD7AHz1o/edit?usp=sharing",
  },

  linkDriveVisionsSlides: {
    href: "https://docs.google.com/presentation/d/18_KIqC-kujUd1WKWfMmO2M6xv5D098Ih4oC6ihIAMgA/edit?usp=sharing",
  },

  linkDrivePresentationSignup: {
    href: "https://docs.google.com/spreadsheets/d/1pa33MwUUe7crzLCCz75YRirtxaa6VhX_KQ6kfYf0sWU/edit?usp=sharing",
  },

  linkDrivePresentationDraftSlides: {
    href: "https://forms.gle/D4UPta2rG4YmeBTC8",
  },

  linkDrivePresentationGroupFeedback: {
    href: "https://forms.gle/osKa9sMVbEDCLDys7",
  },

  // Link to project proposal document.
  linkDriveProposalDocument: {
    href: "https://docs.google.com/document/d/19ZT3K_pA_gxL-BZkwmPeou6DsmuFGE6XyDXW-maJpO8/edit?usp=sharing",
  },

  linkDriveProjectGroupOfficeHoursSignup: {
    href: "https://docs.google.com/document/d/1uV_ZG2Xvi-YtHPtSJ-FM9UgDO_obtYCg6fe6LcHuBcQ/edit?usp=sharing",
  },

  // Link to project milestone meeting signup.
  linkDriveProjectMilestoneMeetings1Signup: {
    href: "https://docs.google.com/document/d/1LZgKwTYgMZNWorroYvSwL_dNZBgpD4SJmhOAVl1PmKU/edit?usp=sharing",
  },

  // Link to project milestone meeting signup.
  linkDriveProjectMilestoneMeetings2Signup: {
    href: "https://docs.google.com/document/d/1-XLvrPnubCw35nUBJaBa8OfZKMLOWPmOVKJH_vwsZWs/edit?usp=sharing",
  },

  linkProjectFinalReportCHIFormat: {
    href: "https://chi2026.acm.org/chi-publication-formats/",
  },

  // Reading on paper writing
  readingWobbrockPaperWriting: {
    authorText: "Jacob O. Wobbrock",
    title: "Catchy Titles are Good: But Avoid Being Cute",
    publicationText: "2015",
    link: "https://faculty.washington.edu/wobbrock/pubs/Wobbrock-2015.pdf",
  },

  // Readings on contribution
  readingContributionWobbrockKientz: {
    authorText: "Jacob O. Wobbrock, Julie A. Kientz",
    title: "Research Contributions in Human-Computer Interaction",
    publicationText: "Interactions. 2016",
    link: "https://canvas.uw.edu/files/147531867",
  },

  readingContributionFogarty: {
    authorText: "James Fogarty",
    title: "Code and Contribution in Interactive Systems Research",
    publicationText:
      "CHI 2017 Workshop on #HCI.Tools: Strategies and Best Practices for Designing, Evaluating, and Sharing Technical HCI Toolkits",
    link: "https://canvas.uw.edu/files/147531662",
  },

  // Readings on methods
  readingMethodsWaysOfKnowing: {
    authorText: "Judith S. Olson, Wendy A. Kellogg",
    title: "Ways of Knowing in HCI",
    publicationText: "2014",
    link: "https://canvas.uw.edu/files/148139224",
  },

  readingMethodsExperimentDesignAndStatisticalAnalysis: {
    authorText: "Jacob O. Wobbrock",
    title: "Experiment Design and Statistical Analysis in HCI",
    publicationText: "2024",
    link: "https://canvas.uw.edu/files/148139079",
  },

  readingMethodsBraunAndClarke2012: {
    authorText: "Victoria Braun, Victoria Clarke",
    title: "Thematic Analysis",
    publicationText: "In APA Handbook of Research Methods in Psychology. 2012",
    link: "https://canvas.uw.edu/files/148139264",
  },

  readingMethodsTerryHayfieldClarkeBraun2017: {
    authorText: "Gareth Terry, Nikki Hayfield, Victoria Clarke, Virginia Braun",
    title: "Thematic Analysis",
    publicationText:
      "In The SAGE Handbook of Qualitative Research in Psychology. 2017",
    link: "https://canvas.uw.edu/files/148139324",
  },

  readingMethodsByrne2022: {
    authorText: "David Byrne",
    title:
      "A Worked Example of Braun and Clarke's Approach to Reflexive Thematic Analysis",
    publicationText: "Quality & Quantity. 2021",
    link: "https://canvas.uw.edu/files/148139309",
  },
} as const;
