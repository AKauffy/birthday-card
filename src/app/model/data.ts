export const GOAL = 25;
export const HER_NAME = 'Jade!';
export const YOUR_NAME = 'Ayden';

export interface Memory {
  season: string;
  date: string;
  title: string;
  text: string;
  photo: string;
}

export const MEMORIES: Memory[] = [
  {
    season: 'Spring',
    date: '[DATE]',
    title: 'How we met',
    text: '[A short memory about the first time you met.]',
    photo: 'photos/spring.svg'
  },
  {
    season: 'Summer',
    date: '[DATE]',
    title: 'Our first adventure',
    text: '[A favorite trip, hike, or moment outdoors.]',
    photo: 'photos/summer.svg'
  },
  {
    season: 'Autumn',
    date: '[DATE]',
    title: 'Where we are now',
    text: '[What you love about today, and what is ahead.]',
    photo: 'photos/autumn.svg'
  }
];

export const LETTER = `[YOUR LETTER. Line breaks are kept.]`;
