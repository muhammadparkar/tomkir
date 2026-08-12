export type PartnerId = 'tauqeer' | 'shanzee';

export interface PartnerProfile {
  id: PartnerId;
  name: string;
  avatar: string;
  role: string;
  points: number;
  redeemedPoints: number;
  pendingRewardsCount: number;
  completedActivitiesCount: number;
  currentStreak: number;
  email: string;
  favoriteColor: string;
}

export interface ActivityRule {
  id: string;
  title: string;
  description: string;
  defaultPoints: number;
  category: 'calls' | 'messages' | 'dates' | 'milestones' | 'other';
  iconName?: string;
}

export interface LoggedActivity {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string;
  responsiblePartner: PartnerId;
  earningPartner: PartnerId;
  activityRuleId: string;
  activityTitle: string;
  points: number;
  notes?: string;
  createdAt: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string; // emoji or image URL
  category: 'food' | 'entertainment' | 'romantic' | 'gifts' | 'special';
  badge?: string;
}

export interface RedemptionRecord {
  id: string;
  rewardId: string;
  rewardTitle: string;
  rewardIcon: string;
  redeemedBy: PartnerId;
  pointsUsed: number;
  date: string; // ISO string
  status: 'Unlocked' | 'Pending' | 'Fulfilled';
  remainingPointsAfter: number;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredMetric: 'first_redemption' | 'streak_7' | 'points_100' | 'king_tauqeer' | 'queen_shanzee' | 'romantic_pair' | 'activities_10';
  targetValue: number;
  unlockedAt?: string;
  progress: number; // 0 - 100
  isUnlocked: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  imageUrl: string;
  caption: string;
  heartLikes: number;
  likedBy: PartnerId[];
}

export interface EmailLog {
  id: string;
  timestamp: string;
  subject: string;
  recipient: string;
  sender: string;
  bodyHtml: string;
  status: 'Sent' | 'Simulated';
}

export interface AdminSettingsConfig {
  passcode: string;
  tauqeerEmail: string;
  shanzeeEmail: string;
  officialDate: string; // YYYY-MM-DD
  togetherSince: string; // YYYY-MM-DD
  smtpEnabled: boolean;
  emailNotifications: boolean;
}
