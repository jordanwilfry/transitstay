import React from 'react';
import { motion } from 'framer-motion';
import { FILTER_TAGS } from '@/utils/constant';

interface FilterTagsProps {
  activeTags: string[];
  onTagToggle: (tag: string) => void;
}

export function FilterTags({ activeTags, onTagToggle }: FilterTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTER_TAGS.map((tag, index) => (
        <motion.button
          key={tag}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTagToggle(tag)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${activeTags.includes(tag)
              ? 'bg-black text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
            }
          `}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  );
}