export interface Theme {
  background: string;
  ink: string;
  sage: string;
  oak: string;
  deepAnchor: string;
}

export interface Content {
  teacherName: string;
  role: string;
  subject: string;
  subtitle: string;
  date: string;
  venue: string;
  occasion: string;
  sectionLine: string;
  letterBody: string;
  theme: Theme;
  envelopeEyebrow: string;
  envelopeInstruction: string;
  tapToOpenText: string;
  eyebrowLabel: string;
  letterEyebrow: string;
  headlineHappy: string;
  headlineTeachersDay: string;
  dateLabel: string;
  venueLabel: string;
  occasionLabel: string;
  footerText: string;
  appTitle: string;
  appDescription: string;
}

export const content: Content = {
  teacherName: "Debjit Ghosh",
  role: "Faculty Mentor",
  subject: "CSE",
  subtitle: "Faculty Mentor · CSE",
  date: "September - 3, 2026",
  venue: "AU - 6, Room No. 4201",
  occasion: "Teacher's Day Celebration",
  sectionLine: "Section D · CSE Core · Batch 2026-2028",
  letterBody:
    "Some lessons live beyond the syllabus - the ones about patience, precision, and showing up for a problem until it makes sense. Section D carries a lot of what you taught us, sir. Today, we'd just like to say thank you, and ask you to join us as we celebrate it.",
  theme: {
    background: "#F2EAE0",
    ink: "#3A362F",
    sage: "#8A9683",
    oak: "#C89968",
    deepAnchor: "#1E332C",
  },
  envelopeEyebrow: "A SPECIAL INVITATION",
  envelopeInstruction: "Tap the envelope to reveal your invitation",
  tapToOpenText: "Tap to open",
  eyebrowLabel: "IN HONOUR OF TEACHER'S DAY",
  letterEyebrow: "IN HONOUR OF TEACHER'S DAY",
  headlineHappy: "Happy",
  headlineTeachersDay: "Teacher's Day",
  dateLabel: "DATE",
  venueLabel: "VENUE",
  occasionLabel: "OCCASION",
  footerText: "Created with gratitude & love",
  appTitle: "Teacher's Day Invitation | Debjit Ghosh",
  appDescription: "Personalized Teacher's Day invitation for Debjit Ghosh.",
};
