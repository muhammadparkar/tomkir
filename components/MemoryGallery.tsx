'use client';

import React, { useState } from 'react';
import { MemoryItem, PartnerId } from '../types';
import { Heart, Plus, Camera, Sparkles, Calendar } from './Icons';

interface MemoryGalleryProps {
  memories: MemoryItem[];
  onAddMemory: (memory: Omit<MemoryItem, 'id' | 'heartLikes' | 'likedBy'>) => void;
  onLikeMemory: (id: string, partnerId: PartnerId) => void;
}

export default function MemoryGallery({
  memories,
  onAddMemory,
  onLikeMemory
}: MemoryGalleryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    onAddMemory({
      title,
      date,
      imageUrl,
      caption
    });

    setTitle('');
    setImageUrl('');
    setCaption('');
    setIsAdding(false);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>Romantic Moments</span>
          </div>
          <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
            Memory Photo Gallery
          </h2>
          <p className="text-rose-200/80 text-sm sm:text-base mt-2">
            Capturing timeless memories unlocked through our relationship journey.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Memory</span>
        </button>
      </div>

      {/* Add Memory Modal / Form */}
      {isAdding && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl mb-10 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-500/20">
            <h3 className="font-serif-romantic text-2xl font-bold text-rose-100">
              Add New Romantic Memory
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-rose-300 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                Memory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunset Picnic at the Park"
                required
                className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 uppercase mb-1">
                Caption / Story
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder="Write a sweet caption..."
                className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <button
              type="submit"
              className="mt-2 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-sm shadow-md"
            >
              Save Memory Photo
            </button>
          </form>
        </div>
      )}

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-dense">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="rounded-3xl glass-panel border border-rose-500/30 overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b15] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-panel border border-rose-500/40 text-xs font-semibold text-rose-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>{memory.date}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-romantic text-2xl font-bold text-rose-100 mb-2">
                  {memory.title}
                </h3>
                <p className="text-xs text-rose-200/80 leading-relaxed italic mb-6">
                  &quot;{memory.caption}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between">
                <span className="text-xs text-pink-300 font-medium">
                  {memory.heartLikes} Hearts Shared
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLikeMemory(memory.id, 'tauqeer')}
                    className="flex items-center gap-1 px-3 py-1 rounded-full glass-panel border border-rose-500/30 text-rose-200 hover:text-white hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                    <span>Tauqeer</span>
                  </button>

                  <button
                    onClick={() => onLikeMemory(memory.id, 'shanzee')}
                    className="flex items-center gap-1 px-3 py-1 rounded-full glass-panel border border-rose-500/30 text-rose-200 hover:text-white hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                    <span>Shanzee</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
