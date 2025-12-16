export interface Story {
  id: number;
  title: string;
  personName: string;
}

export interface Landmark {
  id: number;
  division: string;
  color: string;
  position: { left: string; top: string };
  personName: string;
  personTitle: string;
  audioFile: string;
  moreStories: Story[];
}

export const LANDMARKS: Landmark[] = [
  {
    id: 1,
    division: 'Dhaka',
    color: '#FF9800',
    position: { left: '54%', top: '50%' },
    personName: 'Abdul Karim',
    personTitle: 'Entrepreneur, Dhaka',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 11, title: 'Digital Banking Success', personName: 'Rahim Khan' },
      { id: 12, title: 'Women Empowerment', personName: 'Fatima Begum' },
      { id: 13, title: 'Agricultural Growth', personName: 'Kamal Hassan' }
    ]
  },
  {
    id: 2,
    division: 'Chittagong',
    color: '#8BC34A',
    position: { left: '78%', top: '68%' },
    personName: 'Nazrul Islam',
    personTitle: 'Businessman, Chittagong',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 21, title: 'Port City Business', personName: 'Shahid Ahmed' },
      { id: 22, title: 'Export Success', personName: 'Sultana Razia' }
    ]
  },
  {
    id: 3,
    division: 'Rajshahi',
    color: '#2196F3',
    position: { left: '28%', top: '35%' },
    personName: 'Habibur Rahman',
    personTitle: 'Farmer, Rajshahi',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 31, title: 'Mango Export', personName: 'Abdus Salam' },
      { id: 32, title: 'Agricultural Tech', personName: 'Rafiq Uddin' }
    ]
  },
  {
    id: 4,
    division: 'Khulna',
    color: '#E91E63',
    position: { left: '26%', top: '64%' },
    personName: 'Jahangir Alam',
    personTitle: 'Fishery Owner, Khulna',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 41, title: 'Shrimp Export', personName: 'Monir Hossain' },
      { id: 42, title: 'Tourism Growth', personName: 'Rashed Kabir' }
    ]
  },
  {
    id: 5,
    division: 'Sylhet',
    color: '#F44336',
    position: { left: '76%', top: '28%' },
    personName: 'Moinul Islam',
    personTitle: 'Tea Garden Owner, Sylhet',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 51, title: 'Tea Industry', personName: 'Ashraf Ali' },
      { id: 52, title: 'Tourism Dev', personName: 'Selim Ahmed' }
    ]
  },
  {
    id: 6,
    division: 'Barisal',
    color: '#1565C0',
    position: { left: '46%', top: '76%' },
    personName: 'Golam Mostafa',
    personTitle: 'Rice Farmer, Barisal',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 61, title: 'Rice Production', personName: 'Nurul Haque' },
      { id: 62, title: 'River Transport', personName: 'Jalal Uddin' }
    ]
  },
  {
    id: 7,
    division: 'Rangpur',
    color: '#8BC34A',
    position: { left: '36%', top: '15%' },
    personName: 'Aminul Haque',
    personTitle: 'Tobacco Farmer, Rangpur',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 71, title: 'Diversification', personName: 'Hafiz Rahman' },
      { id: 72, title: 'Dairy Farm', personName: 'Mukul Hossain' }
    ]
  },
  {
    id: 8,
    division: 'Mymensingh',
    color: '#4CAF50',
    position: { left: '58%', top: '40%' },
    personName: 'Shafiqul Islam',
    personTitle: 'Textile Worker, Mymensingh',
    audioFile: '/sample-audio.mp3',
    moreStories: [
      { id: 81, title: 'Garment Growth', personName: 'Rubel Khan' },
      { id: 82, title: 'Education Impact', personName: 'Nasrin Akter' }
    ]
  }
];
