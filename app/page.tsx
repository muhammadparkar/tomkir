'use client';

import React, { useState, useEffect } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CoupleDashboard from '../components/CoupleDashboard';
import PointRules from '../components/PointRules';
import ActivityLogger from '../components/ActivityLogger';
import InteractiveCalendar from '../components/InteractiveCalendar';
import MonthlyStatistics from '../components/MonthlyStatistics';
import LiveLeaderboard from '../components/LiveLeaderboard';
import RedemptionStore from '../components/RedemptionStore';
import RedemptionModal from '../components/RedemptionModal';
import RedemptionHistory from '../components/RedemptionHistory';
import AchievementBadges from '../components/AchievementBadges';
import MemoryGallery from '../components/MemoryGallery';
import AdminModal from '../components/AdminModal';
import EmailSimulationModal from '../components/EmailSimulationModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

import { Storage } from '../lib/storage';
import {
  PartnerProfile,
  ActivityRule,
  LoggedActivity,
  RewardItem,
  RedemptionRecord,
  BadgeItem,
  MemoryItem,
  AdminSettingsConfig,
  EmailLog,
  PartnerId
} from '../types';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initial State matching initial seed data on server
  const [partners, setPartners] = useState<Record<'tauqeer' | 'shanzee', PartnerProfile>>(() => Storage.getPartners());
  const [rules, setRules] = useState<ActivityRule[]>(() => Storage.getRules());
  const [activities, setActivities] = useState<LoggedActivity[]>(() => Storage.getActivities());
  const [rewards, setRewards] = useState<RewardItem[]>(() => Storage.getRewards());
  const [redemptions, setRedemptions] = useState<RedemptionRecord[]>(() => Storage.getRedemptions());
  const [badges, setBadges] = useState<BadgeItem[]>(() => Storage.getBadges());
  const [memories, setMemories] = useState<MemoryItem[]>(() => Storage.getMemories());
  const [adminConfig, setAdminConfig] = useState<AdminSettingsConfig>(() => Storage.getAdminConfig());
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(() => Storage.getEmailLogs());

  useEffect(() => {
    setIsMounted(true);
    setPartners(Storage.getPartners());
    setRules(Storage.getRules());
    setActivities(Storage.getActivities());
    setRewards(Storage.getRewards());
    setRedemptions(Storage.getRedemptions());
    setBadges(Storage.getBadges());
    setMemories(Storage.getMemories());
    setAdminConfig(Storage.getAdminConfig());
    setEmailLogs(Storage.getEmailLogs());
  }, []);

  // Modal Controls
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedRedemptionReward, setSelectedRedemptionReward] = useState<RewardItem | null>(null);
  const [previewEmailLog, setPreviewEmailLog] = useState<EmailLog | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize state changes to Storage
  useEffect(() => {
    Storage.savePartners(partners);
  }, [partners]);

  useEffect(() => {
    Storage.saveRules(rules);
  }, [rules]);

  useEffect(() => {
    Storage.saveActivities(activities);
  }, [activities]);

  useEffect(() => {
    Storage.saveRewards(rewards);
  }, [rewards]);

  useEffect(() => {
    Storage.saveRedemptions(redemptions);
  }, [redemptions]);

  useEffect(() => {
    Storage.saveBadges(badges);
  }, [badges]);

  useEffect(() => {
    Storage.saveMemories(memories);
  }, [memories]);

  useEffect(() => {
    Storage.saveAdminConfig(adminConfig);
  }, [adminConfig]);

  useEffect(() => {
    Storage.saveEmailLogs(emailLogs);
  }, [emailLogs]);

  // Dark/Light Theme toggle
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Handler: Log Activity
  const handleLogActivity = (actData: Omit<LoggedActivity, 'id' | 'createdAt'>) => {
    const newActivity: LoggedActivity = {
      ...actData,
      id: `act-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setActivities((prev) => [newActivity, ...prev]);

    // Award points to earning partner
    const earningId = actData.earningPartner;
    setPartners((prev) => {
      const partner = prev[earningId];
      return {
        ...prev,
        [earningId]: {
          ...partner,
          points: partner.points + actData.points,
          completedActivitiesCount: partner.completedActivitiesCount + 1
        }
      };
    });

    showToast(`Activity recorded! +${actData.points} points awarded to ${earningId === 'tauqeer' ? 'Tauqeer 👦' : 'Shanzee 👧'}!`);
  };

  // Handler: Delete Activity
  const handleDeleteActivity = (id: string) => {
    const target = activities.find((a) => a.id === id);
    if (target) {
      setActivities((prev) => prev.filter((a) => a.id !== id));
      // Deduct points back
      setPartners((prev) => {
        const partner = prev[target.earningPartner];
        return {
          ...prev,
          [target.earningPartner]: {
            ...partner,
            points: Math.max(0, partner.points - target.points)
          }
        };
      });
      showToast('Activity record removed.');
    }
  };

  // Handler: Redeem Reward
  const handleConfirmRedeem = (reward: RewardItem, partnerId: PartnerId) => {
    const currentPartner = partners[partnerId];
    if (currentPartner.points < reward.pointsRequired) return;

    const remainingPoints = currentPartner.points - reward.pointsRequired;

    // Deduct points
    setPartners((prev) => ({
      ...prev,
      [partnerId]: {
        ...prev[partnerId],
        points: remainingPoints,
        redeemedPoints: prev[partnerId].redeemedPoints + reward.pointsRequired,
        pendingRewardsCount: prev[partnerId].pendingRewardsCount + 1
      }
    }));

    // Add Redemption Record
    const newRedemption: RedemptionRecord = {
      id: `red-${Date.now()}`,
      rewardId: reward.id,
      rewardTitle: reward.title,
      rewardIcon: reward.icon,
      redeemedBy: partnerId,
      pointsUsed: reward.pointsRequired,
      date: new Date().toISOString(),
      status: 'Fulfilled',
      remainingPointsAfter: remainingPoints
    };

    setRedemptions((prev) => [newRedemption, ...prev]);

    // Create Simulated Email Log
    const partnerName = partnerId === 'tauqeer' ? 'Tauqeer' : 'Shanzee';
    const recipientEmail = partnerId === 'tauqeer' ? adminConfig.tauqeerEmail : adminConfig.shanzeeEmail;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #f472b6; border-radius: 16px; padding: 24px; background-color: #fff1f2;">
        <h2 style="color: #e11d48; text-align: center; margin-bottom: 8px;">❤️ Love Reward Unlocked!</h2>
        <p style="text-align: center; color: #9f1239; font-style: italic; margin-bottom: 20px;">
          "Another beautiful memory has been unlocked ❤️"
        </p>
        <div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #fbcfe8;">
          <p style="margin: 6px 0; color: #4c0519;"><strong>Reward:</strong> ${reward.icon} ${reward.title}</p>
          <p style="margin: 6px 0; color: #4c0519;"><strong>Redeemed By:</strong> ${partnerName}</p>
          <p style="margin: 6px 0; color: #4c0519;"><strong>Points Used:</strong> ${reward.pointsRequired} Pts</p>
          <p style="margin: 6px 0; color: #4c0519;"><strong>Remaining Balance:</strong> ${remainingPoints} Pts</p>
          <p style="margin: 6px 0; color: #4c0519;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="font-size: 12px; text-align: center; color: #be123c; margin-top: 20px;">
          Made with ❤️ by Tauqeer & Shanzee – Love Points Portal
        </p>
      </div>
    `;

    const newEmailLog: EmailLog = {
      id: `eml-${Date.now()}`,
      timestamp: new Date().toISOString(),
      subject: `❤️ ${partnerName} Unlocked ${reward.title}!`,
      recipient: recipientEmail,
      sender: 'noreply@lovepointsportal.com',
      bodyHtml: emailHtml,
      status: 'Simulated'
    };

    setEmailLogs((prev) => [newEmailLog, ...prev]);

    showToast(`🎉 Reward "${reward.title}" redeemed! Email notification sent to ${partnerName}.`);

    // Optionally pop open email preview after 800ms
    setTimeout(() => {
      setPreviewEmailLog(newEmailLog);
    }, 800);
  };

  // Handler: Add Memory
  const handleAddMemory = (mem: Omit<MemoryItem, 'id' | 'heartLikes' | 'likedBy'>) => {
    const newMem: MemoryItem = {
      ...mem,
      id: `mem-${Date.now()}`,
      heartLikes: 1,
      likedBy: ['tauqeer']
    };
    setMemories((prev) => [newMem, ...prev]);
    showToast('New romantic memory added to gallery!');
  };

  // Handler: Like Memory
  const handleLikeMemory = (id: string, partnerId: PartnerId) => {
    setMemories((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const alreadyLiked = m.likedBy.includes(partnerId);
          const updatedLikedBy = alreadyLiked
            ? m.likedBy.filter((p) => p !== partnerId)
            : [...m.likedBy, partnerId];
          return {
            ...m,
            heartLikes: updatedLikedBy.length * 10 + 4,
            likedBy: updatedLikedBy
          };
        }
        return m;
      })
    );
  };

  // Reset Database
  const handleResetDatabase = () => {
    Storage.resetAllToDefaults();
    setPartners(Storage.getPartners());
    setRules(Storage.getRules());
    setActivities(Storage.getActivities());
    setRewards(Storage.getRewards());
    setRedemptions(Storage.getRedemptions());
    setBadges(Storage.getBadges());
    setMemories(Storage.getMemories());
    setAdminConfig(Storage.getAdminConfig());
    setEmailLogs([]);
    showToast('Database reset to initial seeds.');
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const jsonStr = Storage.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Love_Portal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Backup JSON exported successfully.');
  };

  // Import JSON Backup
  const handleImportBackup = (jsonStr: string) => {
    const success = Storage.importFullBackup(jsonStr);
    if (success) {
      setPartners(Storage.getPartners());
      setRules(Storage.getRules());
      setActivities(Storage.getActivities());
      setRewards(Storage.getRewards());
      setRedemptions(Storage.getRedemptions());
      setBadges(Storage.getBadges());
      setMemories(Storage.getMemories());
      setAdminConfig(Storage.getAdminConfig());
      setEmailLogs(Storage.getEmailLogs());
      showToast('Database restored from JSON backup.');
    } else {
      showToast('Failed to import backup JSON. Check file format.');
    }
  };

  return (
    <main suppressHydrationWarning className="relative min-h-screen selection:bg-rose-500 selection:text-white">
      {/* Animated Floating Particle Background Canvas */}
      <ParticleCanvas />

      {/* Sticky Navigation */}
      <Navbar
        onOpenLogModal={() => setIsLogModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section with Live Relationship Timer */}
      <HeroSection
        officialDate={adminConfig.officialDate}
        togetherSince={adminConfig.togetherSince}
        onOpenLogModal={() => setIsLogModalOpen(true)}
      />

      {/* Couple Dashboard Cards with Circular Progress Rings */}
      <CoupleDashboard partners={partners} />

      {/* Love Point Rules Section */}
      <PointRules rules={rules} />

      {/* Daily Activity Logger Form */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <ActivityLogger rules={rules} onLogActivity={handleLogActivity} />
      </section>

      {/* Interactive Calendar */}
      <InteractiveCalendar
        activities={activities}
        onDeleteActivity={handleDeleteActivity}
        onEditActivity={() => {}}
      />

      {/* Monthly Statistics & Chart.js Charts */}
      <MonthlyStatistics activities={activities} />

      {/* Live Leaderboard */}
      <LiveLeaderboard partners={partners} />

      {/* Redemption Store Marketplace */}
      <RedemptionStore
        rewards={rewards}
        partners={partners}
        onSelectReward={(reward) => setSelectedRedemptionReward(reward)}
      />

      {/* Redemption History Timeline & Exports */}
      <RedemptionHistory redemptions={redemptions} />

      {/* Achievement Badges */}
      <AchievementBadges badges={badges} />

      {/* Memory Photo Gallery */}
      <MemoryGallery
        memories={memories}
        onAddMemory={handleAddMemory}
        onLikeMemory={handleLikeMemory}
      />

      {/* Footer */}
      <Footer />

      {/* Quick Activity Logger Modal */}
      {isLogModalOpen && (
        <ActivityLogger
          rules={rules}
          onLogActivity={handleLogActivity}
          isOpenModal={true}
          onCloseModal={() => setIsLogModalOpen(false)}
        />
      )}

      {/* Redemption Confirmation Modal */}
      <RedemptionModal
        reward={selectedRedemptionReward}
        partners={partners}
        onConfirmRedeem={handleConfirmRedeem}
        onClose={() => setSelectedRedemptionReward(null)}
      />

      {/* Password Protected Admin Modal */}
      {isAdminModalOpen && (
        <AdminModal
          config={adminConfig}
          rules={rules}
          rewards={rewards}
          onSaveConfig={(cfg) => {
            setAdminConfig(cfg);
            showToast('Admin configuration saved.');
          }}
          onSaveRules={(rls) => {
            setRules(rls);
            showToast('Point rule values updated.');
          }}
          onSaveRewards={(rws) => {
            setRewards(rws);
            showToast('Store reward prices updated.');
          }}
          onResetDatabase={handleResetDatabase}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}

      {/* Simulated Email Preview Modal */}
      <EmailSimulationModal
        log={previewEmailLog}
        onClose={() => setPreviewEmailLog(null)}
      />

      {/* Toast Alert Notification Overlay */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </main>
  );
}
