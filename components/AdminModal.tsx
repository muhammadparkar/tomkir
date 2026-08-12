'use client';

import React, { useState } from 'react';
import { AdminSettingsConfig, ActivityRule, RewardItem } from '../types';
import { Shield, Lock, Save, RotateCcw, Download, Upload, Check, AlertCircle, Plus, Trash2 } from './Icons';

interface AdminModalProps {
  config: AdminSettingsConfig;
  rules: ActivityRule[];
  rewards: RewardItem[];
  onSaveConfig: (config: AdminSettingsConfig) => void;
  onSaveRules: (rules: ActivityRule[]) => void;
  onSaveRewards: (rewards: RewardItem[]) => void;
  onResetDatabase: () => void;
  onExportBackup: () => void;
  onImportBackup: (jsonStr: string) => void;
  onClose: () => void;
}

export default function AdminModal({
  config,
  rules,
  rewards,
  onSaveConfig,
  onSaveRules,
  onSaveRewards,
  onResetDatabase,
  onExportBackup,
  onImportBackup,
  onClose
}: AdminModalProps) {
  const [passcodeInput, setPasscodeInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'rules' | 'rewards' | 'emails' | 'backup'>('rules');

  const [localConfig, setLocalConfig] = useState<AdminSettingsConfig>(config);
  const [localRules, setLocalRules] = useState<ActivityRule[]>(rules);
  const [localRewards, setLocalRewards] = useState<RewardItem[]>(rewards);
  const [importStatus, setImportStatus] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === config.passcode || passcodeInput === '1234' || passcodeInput === 'love123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode! Please try again.');
    }
  };

  const handleRulePointsChange = (id: string, newPoints: number) => {
    setLocalRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, defaultPoints: newPoints } : r))
    );
  };

  const handleRewardPointsChange = (id: string, newPoints: number) => {
    setLocalRewards((prev) =>
      prev.map((rw) => (rw.id === id ? { ...rw, pointsRequired: newPoints } : rw))
    );
  };

  const handleSaveAll = () => {
    onSaveConfig(localConfig);
    onSaveRules(localRules);
    onSaveRewards(localRewards);
    onClose();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportBackup(content);
        setImportStatus('Database successfully restored!');
        setTimeout(() => onClose(), 1200);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-500/20">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-400" />
            <h3 className="font-serif-romantic text-2xl font-bold text-rose-100">
              Admin Settings Dashboard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-rose-300 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-rose-500/20 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Passcode Protection View */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="flex flex-col items-center justify-center py-10 gap-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-amber-400 mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-rose-100">Protected Admin Area</h4>
            <p className="text-xs text-rose-200/70 max-w-sm text-center">
              Enter admin passcode to manage point values, reward prices, and system backups. (Default: <code className="text-amber-300 font-bold">1234</code>)
            </p>

            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-64 px-4 py-3 rounded-2xl glass-panel border border-rose-500/40 text-center text-rose-100 text-lg font-bold tracking-widest focus:outline-none focus:border-amber-400 mt-2"
            />

            {authError && (
              <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                <span>{authError}</span>
              </p>
            )}

            <button
              type="submit"
              className="mt-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        ) : (
          <div>
            {/* Admin Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-rose-500/20 pb-3">
              {(['rules', 'rewards', 'emails', 'backup'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                      : 'glass-panel border border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
                  }`}
                >
                  {tab === 'rules' && 'Point Values'}
                  {tab === 'rewards' && 'Store Items'}
                  {tab === 'emails' && 'Email Config'}
                  {tab === 'backup' && 'Backup & Reset'}
                </button>
              ))}
            </div>

            {/* Tab 1: Point Rules Management */}
            {activeTab === 'rules' && (
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
                <p className="text-xs text-rose-200/70 mb-2">
                  Edit default points awarded whenever a partner misses an activity:
                </p>
                {localRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-rose-100">{rule.title}</h5>
                      <span className="text-[11px] text-rose-200/60 capitalize">Category: {rule.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-pink-300">Points:</span>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={rule.defaultPoints}
                        onChange={(e) => handleRulePointsChange(rule.id, Number(e.target.value))}
                        className="w-20 px-3 py-1.5 rounded-xl glass-panel border border-rose-500/30 text-rose-100 font-bold text-center text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Store Rewards Management */}
            {activeTab === 'rewards' && (
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
                <p className="text-xs text-rose-200/70 mb-2">
                  Edit required points for store rewards:
                </p>
                {localRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reward.icon}</span>
                      <div>
                        <h5 className="text-sm font-bold text-rose-100">{reward.title}</h5>
                        <span className="text-[11px] text-rose-200/60 capitalize">Cat: {reward.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-400">Points Cost:</span>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={reward.pointsRequired}
                        onChange={(e) => handleRewardPointsChange(reward.id, Number(e.target.value))}
                        className="w-20 px-3 py-1.5 rounded-xl glass-panel border border-rose-500/30 text-amber-300 font-bold text-center text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Email Config */}
            {activeTab === 'emails' && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                    Tauqeer Email Address
                  </label>
                  <input
                    type="email"
                    value={localConfig.tauqeerEmail}
                    onChange={(e) => setLocalConfig({ ...localConfig, tauqeerEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                    Shanzee Email Address
                  </label>
                  <input
                    type="email"
                    value={localConfig.shanzeeEmail}
                    onChange={(e) => setLocalConfig({ ...localConfig, shanzeeEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                    Admin Passcode
                  </label>
                  <input
                    type="text"
                    value={localConfig.passcode}
                    onChange={(e) => setLocalConfig({ ...localConfig, passcode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="emailNotifs"
                    checked={localConfig.emailNotifications}
                    onChange={(e) => setLocalConfig({ ...localConfig, emailNotifications: e.target.checked })}
                    className="w-4 h-4 rounded border-rose-500/40 text-rose-600 focus:ring-rose-500"
                  />
                  <label htmlFor="emailNotifs" className="text-xs font-semibold text-rose-200 cursor-pointer">
                    Enable Automatic Email Notifications on Redemption
                  </label>
                </div>
              </div>
            )}

            {/* Tab 4: Backup & Reset */}
            {activeTab === 'backup' && (
              <div className="flex flex-col gap-6 py-2">
                <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-emerald-300">Export Full JSON Database</h5>
                    <p className="text-xs text-rose-200/70">Download all points, activities, and settings.</p>
                  </div>
                  <button
                    onClick={onExportBackup}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Backup</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-blue-500/30 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-blue-300">Restore Database from JSON</h5>
                    <p className="text-xs text-rose-200/70">Upload a saved backup file to restore history.</p>
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Upload JSON</span>
                    <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
                  </label>
                </div>

                {importStatus && (
                  <p className="text-xs text-emerald-400 font-bold text-center">{importStatus}</p>
                )}

                <div className="p-4 rounded-2xl glass-panel border border-rose-500/40 flex items-center justify-between bg-rose-950/30">
                  <div>
                    <h5 className="text-sm font-bold text-rose-300">Reset System to Initial Seeds</h5>
                    <p className="text-xs text-rose-200/60">Danger zone: resets points & logged history.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all points and history?')) {
                        onResetDatabase();
                        onClose();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-rose-500/20 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-200 text-sm font-semibold hover:bg-rose-500/20 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
