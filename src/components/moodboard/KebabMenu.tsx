import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus, Edit, Trash2 } from 'lucide-react';

interface KebabMenuProps {
  onAddCluster: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  showClusterActions?: boolean;
}

export function KebabMenu({ onAddCluster, onRename, onDelete, showClusterActions }: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: 'Add Cluster',
      icon: Plus,
      onClick: () => {
        onAddCluster();
        setIsOpen(false);
      },
    },
    ...(showClusterActions ? [
      {
        label: 'Rename',
        icon: Edit,
        onClick: () => {
          onRename?.();
          setIsOpen(false);
        },
      },
      {
        label: 'Delete',
        icon: Trash2,
        onClick: () => {
          onDelete?.();
          setIsOpen(false);
        },
        danger: true,
      },
    ] : []),
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="More options"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`
                  w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors
                  ${item.danger ? 'text-red-600 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'}
                `}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}