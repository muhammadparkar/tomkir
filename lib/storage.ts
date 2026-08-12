import {
  PartnerProfile,
  ActivityRule,
  LoggedActivity,
  RewardItem,
  RedemptionRecord,
  BadgeItem,
  MemoryItem,
  AdminSettingsConfig,
  EmailLog
} from '../types';

import {
  initialPartners,
  initialRules,
  initialActivities,
  initialRewards,
  initialRedemptions,
  initialBadges,
  initialMemories,
  initialAdminConfig
} from './initialData';

const STORAGE_KEYS = {
  PARTNERS: 'love_portal_partners',
  RULES: 'love_portal_rules',
  ACTIVITIES: 'love_portal_activities',
  REWARDS: 'love_portal_rewards',
  REDEMPTIONS: 'love_portal_redemptions',
  BADGES: 'love_portal_badges',
  MEMORIES: 'love_portal_memories',
  ADMIN_CONFIG: 'love_portal_admin_config',
  EMAIL_LOGS: 'love_portal_email_logs'
};

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const Storage = {
  getPartners(): Record<'tauqeer' | 'shanzee', PartnerProfile> {
    return getItem(STORAGE_KEYS.PARTNERS, initialPartners);
  },
  savePartners(partners: Record<'tauqeer' | 'shanzee', PartnerProfile>) {
    setItem(STORAGE_KEYS.PARTNERS, partners);
  },

  getRules(): ActivityRule[] {
    return getItem(STORAGE_KEYS.RULES, initialRules);
  },
  saveRules(rules: ActivityRule[]) {
    setItem(STORAGE_KEYS.RULES, rules);
  },

  getActivities(): LoggedActivity[] {
    return getItem(STORAGE_KEYS.ACTIVITIES, initialActivities);
  },
  saveActivities(activities: LoggedActivity[]) {
    setItem(STORAGE_KEYS.ACTIVITIES, activities);
  },

  getRewards(): RewardItem[] {
    return getItem(STORAGE_KEYS.REWARDS, initialRewards);
  },
  saveRewards(rewards: RewardItem[]) {
    setItem(STORAGE_KEYS.REWARDS, rewards);
  },

  getRedemptions(): RedemptionRecord[] {
    return getItem(STORAGE_KEYS.REDEMPTIONS, initialRedemptions);
  },
  saveRedemptions(redemptions: RedemptionRecord[]) {
    setItem(STORAGE_KEYS.REDEMPTIONS, redemptions);
  },

  getBadges(): BadgeItem[] {
    return getItem(STORAGE_KEYS.BADGES, initialBadges);
  },
  saveBadges(badges: BadgeItem[]) {
    setItem(STORAGE_KEYS.BADGES, badges);
  },

  getMemories(): MemoryItem[] {
    return getItem(STORAGE_KEYS.MEMORIES, initialMemories);
  },
  saveMemories(memories: MemoryItem[]) {
    setItem(STORAGE_KEYS.MEMORIES, memories);
  },

  getAdminConfig(): AdminSettingsConfig {
    return getItem(STORAGE_KEYS.ADMIN_CONFIG, initialAdminConfig);
  },
  saveAdminConfig(config: AdminSettingsConfig) {
    setItem(STORAGE_KEYS.ADMIN_CONFIG, config);
  },

  getEmailLogs(): EmailLog[] {
    return getItem(STORAGE_KEYS.EMAIL_LOGS, []);
  },
  saveEmailLogs(logs: EmailLog[]) {
    setItem(STORAGE_KEYS.EMAIL_LOGS, logs);
  },

  exportFullBackup(): string {
    const data = {
      partners: this.getPartners(),
      rules: this.getRules(),
      activities: this.getActivities(),
      rewards: this.getRewards(),
      redemptions: this.getRedemptions(),
      badges: this.getBadges(),
      memories: this.getMemories(),
      adminConfig: this.getAdminConfig(),
      emailLogs: this.getEmailLogs(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  importFullBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.partners) this.savePartners(data.partners);
      if (data.rules) this.saveRules(data.rules);
      if (data.activities) this.saveActivities(data.activities);
      if (data.rewards) this.saveRewards(data.rewards);
      if (data.redemptions) this.saveRedemptions(data.redemptions);
      if (data.badges) this.saveBadges(data.badges);
      if (data.memories) this.saveMemories(data.memories);
      if (data.adminConfig) this.saveAdminConfig(data.adminConfig);
      if (data.emailLogs) this.saveEmailLogs(data.emailLogs);
      return true;
    } catch (e) {
      console.error('Failed to import backup JSON', e);
      return false;
    }
  },

  resetAllToDefaults() {
    this.savePartners(initialPartners);
    this.saveRules(initialRules);
    this.saveActivities(initialActivities);
    this.saveRewards(initialRewards);
    this.saveRedemptions(initialRedemptions);
    this.saveBadges(initialBadges);
    this.saveMemories(initialMemories);
    this.saveAdminConfig(initialAdminConfig);
    this.saveEmailLogs([]);
  }
};
