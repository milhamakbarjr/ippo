export type SurveyOption = {
  id: string;
  label: string;
  description?: string;
  /** Path to an icon SVG in /images/ */
  iconSrc?: string;
};

export const sourceOptions: SurveyOption[] = [
  { id: 'instagram', label: 'Instagram', iconSrc: '/images/instagram.svg' },
  { id: 'tiktok', label: 'TikTok', iconSrc: '/images/tiktok.svg' },
  { id: 'youtube', label: 'Youtube', iconSrc: '/images/youtube.svg' },
  { id: 'x', label: 'X', iconSrc: '/images/twitter.svg' },
  { id: 'whatsapp', label: 'Whatsapp group', iconSrc: '/images/whatsapp.svg' },
  { id: 'friends', label: 'Friends/family', iconSrc: '/images/users-01.svg' },
  { id: 'blog', label: 'News blog or article', iconSrc: '/images/announcement-01.svg' },
  { id: 'other', label: 'Other', iconSrc: '/images/search-refraction.svg' },
];

export const motivationOptions: SurveyOption[] = [
  { id: 'work-visa', label: 'To get work visa', iconSrc: '/images/briefcase-01.svg' },
  { id: 'travelling', label: 'Travelling', iconSrc: '/images/plane.svg' },
  { id: 'education', label: 'Prepare for higher education', iconSrc: '/images/graduation-hat-02.svg' },
  { id: 'other', label: 'Other', iconSrc: '/images/link-04.svg' },
  { id: 'self-improve', label: 'Self improve', iconSrc: '/images/user-up-01.svg' },
  { id: 'new-friend', label: 'Have new friend', iconSrc: '/images/users-01.svg' },
  { id: 'fun', label: 'Just for fun', iconSrc: '/images/puzzle-piece-02.svg' },
];

export const knowledgeOptions: SurveyOption[] = [
  { id: 'new', label: "I'm new to japanese" },
  { id: 'some-words', label: 'I know some common words' },
  { id: 'basic-convo', label: 'I can do basic conversation' },
  { id: 'various-topics', label: 'I can talk about various topics' },
  { id: 'most-topics', label: 'I can discuss most topics in detail' },
];

export const pathOptions: SurveyOption[] = [
  {
    id: 'from-scratch',
    label: 'From scratch',
    description: 'Take the easiest lesson',
  },
  {
    id: 'find-my-level',
    label: 'Find my level',
    description: 'Let me recommend where you should start learning',
  },
];
