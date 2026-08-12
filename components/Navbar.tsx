'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Plus, Shield, Sun, Moon, Menu, X, Sparkles } from './Icons';

interface NavbarProps {
  onOpenLogModal: () => void;
  onOpenAdminModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  onOpenLogModal,
  onOpenAdminModal,
  isDarkMode,
  onToggleTheme
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Point Tracker', href: '#tracker' },
    { name: 'Calendar', href: '#calendar' },
    { name: 'Activities', href: '#activities' },
    { name: 'Redemption', href: '#redemption' },
    { name: 'History', href: '#history' },
    { name: 'Badges', href: '#badges' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-opacity-80 backdrop-blur-md border-b border-rose-500/20 shadow-lg shadow-rose-950/20 bg-[#0f0b15]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-400 p-0.5 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0f0b15] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-romantic text-2xl font-bold tracking-wide text-rose-300 group-hover:text-rose-200 transition-colors">
              ❤️ T & S
            </span>
            <span className="text-[10px] tracking-widest uppercase text-pink-400/80 font-medium">
              Love Points Portal
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-2 rounded-full border border-rose-500/20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-rose-100/80 hover:text-rose-200 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-300" />}
          </button>

          <button
            onClick={onOpenAdminModal}
            className="p-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all cursor-pointer"
            title="Admin Settings"
            aria-label="Admin Settings"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenLogModal}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-medium text-sm shadow-md shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Activity</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onOpenLogModal}
            className="p-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md shadow-rose-600/30"
            aria-label="Quick Log"
          >
            <Plus className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg glass-panel border border-rose-500/30 text-rose-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-rose-500/30 px-4 py-6 mt-2 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 rounded-xl text-base font-medium text-rose-100 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-4 border-t border-rose-500/20">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel text-rose-200 text-sm"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-300" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel text-rose-200 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
