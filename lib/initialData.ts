import {
  PartnerProfile,
  ActivityRule,
  LoggedActivity,
  RewardItem,
  RedemptionRecord,
  BadgeItem,
  MemoryItem,
  AdminSettingsConfig
} from '../types';

export const initialPartners: Record<'tauqeer' | 'shanzee', PartnerProfile> = {
  tauqeer: {
    id: 'tauqeer',
    name: 'Tauqeer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    role: 'The Romantic Gentleman 👦',
    points: 85,
    redeemedPoints: 65,
    pendingRewardsCount: 1,
    completedActivitiesCount: 12,
    currentStreak: 5,
    email: 'tauqeer@loveportal.com',
    favoriteColor: '#3B82F6'
  },
  shanzee: {
    id: 'shanzee',
    name: 'Shanzee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    role: 'The Lovely Queen 👧',
    points: 110,
    redeemedPoints: 40,
    pendingRewardsCount: 2,
    completedActivitiesCount: 16,
    currentStreak: 7,
    email: 'shanzee@loveportal.com',
    favoriteColor: '#EC4899'
  }
};

export const initialRules: ActivityRule[] = [
  {
    id: 'rule-1',
    title: 'Slept Without Calling',
    description: 'When a partner goes to sleep without saying goodnight on call.',
    defaultPoints: 5,
    category: 'calls',
    iconName: 'Moon'
  },
  {
    id: 'rule-2',
    title: "Didn't Say Good Morning",
    description: 'Forgot to text Good Morning after waking up.',
    defaultPoints: 2,
    category: 'messages',
    iconName: 'Sun'
  },
  {
    id: 'rule-3',
    title: "Didn't Say Good Night",
    description: 'Forgot to text Good Night before sleeping.',
    defaultPoints: 2,
    category: 'messages',
    iconName: 'Sparkles'
  },
  {
    id: 'rule-4',
    title: 'Missed Daily Call',
    description: 'Failed to answer or place the primary daily catch-up call.',
    defaultPoints: 5,
    category: 'calls',
    iconName: 'PhoneCall'
  },
  {
    id: 'rule-5',
    title: 'Ignored Messages',
    description: 'Left partner on read for over 3 hours without valid excuse.',
    defaultPoints: 3,
    category: 'messages',
    iconName: 'MessageSquare'
  },
  {
    id: 'rule-6',
    title: 'Forgot Anniversary',
    description: 'Forgot monthly or annual love milestone date.',
    defaultPoints: 20,
    category: 'milestones',
    iconName: 'Calendar'
  },
  {
    id: 'rule-7',
    title: 'Forgot Birthday',
    description: 'Forgot partner birthday celebration.',
    defaultPoints: 100,
    category: 'milestones',
    iconName: 'Gift'
  },
  {
    id: 'rule-8',
    title: "Didn't Video Call",
    description: 'Skipped weekly scheduled face-to-face video chat.',
    defaultPoints: 7,
    category: 'calls',
    iconName: 'Video'
  },
  {
    id: 'rule-9',
    title: "Didn't Send Reel/Meme",
    description: 'Zero funny memes or cute reels shared in a 24h window.',
    defaultPoints: 1,
    category: 'other',
    iconName: 'Smile'
  },
  {
    id: 'rule-10',
    title: "Didn't Wish Good Luck",
    description: 'Forgot to encourage partner before an important event or exam.',
    defaultPoints: 3,
    category: 'other',
    iconName: 'HeartHandshake'
  },
  {
    id: 'rule-11',
    title: "Didn't Update Location",
    description: 'Forgot to drop safe arrival update after traveling.',
    defaultPoints: 2,
    category: 'other',
    iconName: 'MapPin'
  }
];

export const initialActivities: LoggedActivity[] = [
  {
    id: 'act-1',
    date: '2026-08-11',
    time: '23:15',
    responsiblePartner: 'tauqeer',
    earningPartner: 'shanzee',
    activityRuleId: 'rule-1',
    activityTitle: 'Slept Without Calling',
    points: 5,
    notes: 'Tauqeer slept early after tiring work shift without calling.',
    createdAt: '2026-08-11T23:15:00Z'
  },
  {
    id: 'act-2',
    date: '2026-08-10',
    time: '09:40',
    responsiblePartner: 'shanzee',
    earningPartner: 'tauqeer',
    activityRuleId: 'rule-2',
    activityTitle: "Didn't Say Good Morning",
    points: 2,
    notes: 'Shanzee woke up late and went straight to class.',
    createdAt: '2026-08-10T09:40:00Z'
  },
  {
    id: 'act-3',
    date: '2026-08-08',
    time: '18:30',
    responsiblePartner: 'tauqeer',
    earningPartner: 'shanzee',
    activityRuleId: 'rule-8',
    activityTitle: "Didn't Video Call",
    points: 7,
    notes: 'Missed Sunday evening virtual tea date.',
    createdAt: '2026-08-08T18:30:00Z'
  },
  {
    id: 'act-4',
    date: '2026-08-05',
    time: '21:00',
    responsiblePartner: 'shanzee',
    earningPartner: 'tauqeer',
    activityRuleId: 'rule-4',
    activityTitle: 'Missed Daily Call',
    points: 5,
    notes: 'Phone was on silent mode during study session.',
    createdAt: '2026-08-05T21:00:00Z'
  },
  {
    id: 'act-5',
    date: '2026-08-01',
    time: '12:00',
    responsiblePartner: 'tauqeer',
    earningPartner: 'shanzee',
    activityRuleId: 'rule-11',
    activityTitle: "Didn't Update Location",
    points: 2,
    notes: 'Forgot to notify after arriving home.',
    createdAt: '2026-08-01T12:00:00Z'
  }
];

export const initialRewards: RewardItem[] = [
  {
    id: 'rew-1',
    title: '🍕 Pizza Date',
    description: 'Unlimited slice pizza night at our favorite cozy pizzeria.',
    pointsRequired: 40,
    icon: '🍕',
    category: 'food',
    badge: 'Popular'
  },
  {
    id: 'rew-2',
    title: '🍿 Movie Night',
    description: 'Pick any movie with favorite snacks and warm blankets.',
    pointsRequired: 60,
    icon: '🍿',
    category: 'entertainment',
    badge: 'Cozy'
  },
  {
    id: 'rew-3',
    title: '🍔 Favorite Meal',
    description: 'Home-cooked or ordered luxury meal of choice.',
    pointsRequired: 50,
    icon: '🍔',
    category: 'food'
  },
  {
    id: 'rew-4',
    title: '🧋 Bubble Tea',
    description: 'Sweet boba treat with extra toppings delivered to door.',
    pointsRequired: 25,
    icon: '🧋',
    category: 'food'
  },
  {
    id: 'rew-5',
    title: '🍫 Chocolate Treat',
    description: 'Box of premium chocolates or handcrafted dessert.',
    pointsRequired: 15,
    icon: '🍫',
    category: 'food'
  },
  {
    id: 'rew-6',
    title: '🛍 Shopping Date',
    description: 'Full day shopping spree with partner carrying bags!',
    pointsRequired: 150,
    icon: '🛍',
    category: 'gifts',
    badge: 'Luxury'
  },
  {
    id: 'rew-7',
    title: '🎁 Surprise Gift',
    description: 'Special mystery wishlist item wrapped with love.',
    pointsRequired: 250,
    icon: '🎁',
    category: 'gifts',
    badge: 'Special'
  },
  {
    id: 'rew-8',
    title: '💌 Love Letter',
    description: 'Handwritten romantic letter expressing deep appreciation.',
    pointsRequired: 30,
    icon: '💌',
    category: 'romantic'
  },
  {
    id: 'rew-9',
    title: '🌹 Flowers',
    description: 'Fresh bouquet of red roses delivered unexpectedly.',
    pointsRequired: 80,
    icon: '🌹',
    category: 'romantic'
  },
  {
    id: 'rew-10',
    title: '💍 Special Surprise',
    description: 'The ultimate royal romantic experience & custom date.',
    pointsRequired: 500,
    icon: '💍',
    category: 'special',
    badge: 'Ultimate'
  }
];

export const initialRedemptions: RedemptionRecord[] = [
  {
    id: 'red-1',
    rewardId: 'rew-4',
    rewardTitle: '🧋 Bubble Tea',
    rewardIcon: '🧋',
    redeemedBy: 'shanzee',
    pointsUsed: 25,
    date: '2026-08-09T16:20:00Z',
    status: 'Fulfilled',
    remainingPointsAfter: 110
  },
  {
    id: 'red-2',
    rewardId: 'rew-1',
    rewardTitle: '🍕 Pizza Date',
    rewardIcon: '🍕',
    redeemedBy: 'tauqeer',
    pointsUsed: 40,
    date: '2026-08-04T20:10:00Z',
    status: 'Fulfilled',
    remainingPointsAfter: 85
  },
  {
    id: 'red-3',
    rewardId: 'rew-5',
    rewardTitle: '🍫 Chocolate Treat',
    rewardIcon: '🍫',
    redeemedBy: 'shanzee',
    pointsUsed: 15,
    date: '2026-08-02T14:45:00Z',
    status: 'Fulfilled',
    remainingPointsAfter: 135
  }
];

export const initialBadges: BadgeItem[] = [
  {
    id: 'badge-1',
    title: '❤️ First Redemption',
    description: 'Unlocked your very first reward from the store.',
    icon: '❤️',
    requiredMetric: 'first_redemption',
    targetValue: 1,
    progress: 100,
    isUnlocked: true,
    unlockedAt: '2026-08-02'
  },
  {
    id: 'badge-2',
    title: '🔥 7 Day Streak',
    description: 'Maintained a 7-day streak of perfect communication.',
    icon: '🔥',
    requiredMetric: 'streak_7',
    targetValue: 7,
    progress: 100,
    isUnlocked: true,
    unlockedAt: '2026-08-07'
  },
  {
    id: 'badge-3',
    title: '💎 100 Points Club',
    description: 'Accumulated over 100 points in your love balance.',
    icon: '💎',
    requiredMetric: 'points_100',
    targetValue: 100,
    progress: 100,
    isUnlocked: true,
    unlockedAt: '2026-08-05'
  },
  {
    id: 'badge-4',
    title: '👑 Reward King',
    description: 'Tauqeer unlocked 5 major reward milestones.',
    icon: '👑',
    requiredMetric: 'king_tauqeer',
    targetValue: 5,
    progress: 60,
    isUnlocked: false
  },
  {
    id: 'badge-5',
    title: '👑 Reward Queen',
    description: 'Shanzee achieved top place on the love leaderboard.',
    icon: '👑',
    requiredMetric: 'queen_shanzee',
    targetValue: 1,
    progress: 100,
    isUnlocked: true,
    unlockedAt: '2026-08-01'
  },
  {
    id: 'badge-6',
    title: '🌹 Romantic Couple',
    description: 'Logged 20 beautiful activity interactions together.',
    icon: '🌹',
    requiredMetric: 'romantic_pair',
    targetValue: 20,
    progress: 85,
    isUnlocked: false
  }
];

export const initialMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'First Sunset Beach Walk',
    date: '2026-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    caption: 'Watching the golden sun set into the ocean while holding hands forever.',
    heartLikes: 24,
    likedBy: ['tauqeer', 'shanzee']
  },
  {
    id: 'mem-2',
    title: 'Late Night Coffee & Secrets',
    date: '2026-07-28',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    caption: 'Warm cappuccino on a chilly night, laughing until our stomachs hurt.',
    heartLikes: 18,
    likedBy: ['tauqeer', 'shanzee']
  },
  {
    id: 'mem-3',
    title: 'Surprise Flower Delivery',
    date: '2026-08-03',
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
    caption: 'When red roses showed up unexpectedly with the sweetest handwritten note.',
    heartLikes: 32,
    likedBy: ['shanzee', 'tauqeer']
  }
];

export const initialAdminConfig: AdminSettingsConfig = {
  passcode: '1234',
  tauqeerEmail: 'tauqeer@loveportal.com',
  shanzeeEmail: 'shanzee@loveportal.com',
  officialDate: '2026-10-06',
  togetherSince: '2026-06-24',
  smtpEnabled: false,
  emailNotifications: true
};
