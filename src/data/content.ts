export interface Theme {
  sandBeige: string;
  oatMilk: string;
  softSage: string;
  lightOakWood: string;
  stoneGray: string;
  deepBark: string;
  cream: string;
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
  unlockLabel: string;
  eyebrowLabel: string;
  mentorEyebrowLabel: string;
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
  role: "Faculty & Mentor",
  subject: "CSE",
  subtitle: "Faculty Mentor · CSE",
  date: "September 3, 2026",
  venue: "AU - 6, Room No. 4201",
  occasion: "Teacher's Day Celebration",
  sectionLine: "Section D · CSE Core · Batch 2026-2028",
  letterBody:
    "They say true understanding isn't memorized, it's built — one clean step leading to the next until the whole pattern makes sense. You showed us how to break things down, trace the logic calmly, and trust the process even when it looked messy. Section D warmly invites you to celebrate this Teacher's Day with us, sir.",
  theme: {
    sandBeige: "#C9B8A8",
    oatMilk: "#F1E9DD",
    softSage: "#8A9A82",
    lightOakWood: "#B98F62",
    stoneGray: "#A8A29A",
    deepBark: "#4A3F33",
    cream: "#FAF6EF",
  },
  envelopeEyebrow: "A SPECIAL INVITATION",
  envelopeInstruction: "Tap the singing bowl to open your invitation",
  tapToOpenText: "Tap to sound the bowl",
  unlockLabel: "Tap to sound the bowl and enter",
  eyebrowLabel: "IN HONOUR OF TEACHER'S DAY",
  mentorEyebrowLabel: "HONOURING OUR MENTOR",
  letterEyebrow: "IN HONOUR OF TEACHER'S DAY",
  headlineHappy: "Happy",
  headlineTeachersDay: "Teacher's Day",
  dateLabel: "DATE",
  venueLabel: "VENUE",
  occasionLabel: "OCCASION",
  footerText: "Section D warmly awaits your presence",
  appTitle: "Teacher's Day Invitation | Debjit Ghosh",
  appDescription: "A warm and mindful Teacher's Day invitation for Debjit Ghosh from Section D.",
};
