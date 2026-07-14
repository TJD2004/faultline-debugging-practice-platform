const ACHIEVEMENTS = [
  {
    "slug": "first-blood",
    "title": "Bug Hunter",
    "description": "Fix your first bug.",
    "criterionType": "total_solves",
    "threshold": 1,
    "icon": "bug"
  },
  {
    "slug": "ten-solves",
    "title": "Debugger",
    "description": "Fix 10 bugs.",
    "criterionType": "total_solves",
    "threshold": 10,
    "icon": "wrench"
  },
  {
    "slug": "fifty-solves",
    "title": "Error Detective",
    "description": "Fix 50 bugs.",
    "criterionType": "total_solves",
    "threshold": 50,
    "icon": "search"
  },
  {
    "slug": "polyglot-5",
    "title": "Polyglot",
    "description": "Solve challenges in 5 different languages.",
    "criterionType": "language_count",
    "threshold": 5,
    "icon": "languages"
  },
  {
    "slug": "polyglot-9",
    "title": "Code Surgeon",
    "description": "Solve challenges in 9 different languages.",
    "criterionType": "language_count",
    "threshold": 9,
    "icon": "stethoscope"
  },
  {
    "slug": "hard-5",
    "title": "Senior Debugger",
    "description": "Solve 5 Hard-difficulty challenges.",
    "criterionType": "hard_solves",
    "threshold": 5,
    "icon": "flame"
  },
  {
    "slug": "streak-7",
    "title": "Consistent",
    "description": "Maintain a 7-day streak.",
    "criterionType": "streak",
    "threshold": 7,
    "icon": "calendar"
  },
  {
    "slug": "xp-5000",
    "title": "Elite Engineer",
    "description": "Earn 5,000 total XP.",
    "criterionType": "xp_total",
    "threshold": 5000,
    "icon": "crown"
  }
];

module.exports = { ACHIEVEMENTS };
