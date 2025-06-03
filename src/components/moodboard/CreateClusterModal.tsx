import React, { useState, useEffect } from 'react';
import Button  from '../ui/Button';
import { X } from 'lucide-react';
import { Cluster } from '../../types';

interface CreateClusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description?: string, icon?: string, gradientFrom?: string, gradientTo?: string) => void;
  loading?: boolean;
  editCluster?: Cluster | null;
}

// Available icons for clusters
const CLUSTER_ICONS = [
  '🍽️', '🌅', '🏨', '✈️', '🏖️', '🎨', '📷', '🎵', '🎬', '📚', 
  '🏃‍♂️', '🧘‍♀️', '🛍️', '🎮', '🌿', '🏔️', '🌊', '🔥', '⭐', '💎'
];

// Available gradient colors
const GRADIENT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', 
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  '#F1948A', '#85929E', '#F39C12', '#8E44AD', '#3498DB', '#E74C3C'
];

export function CreateClusterModal({ isOpen, onClose, onSubmit, loading, editCluster }: CreateClusterModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📌');
  const [gradientFrom, setGradientFrom] = useState('#FF6B6B');
  const [gradientTo, setGradientTo] = useState('#4ECDC4');
  const [errors, setErrors] = useState<{ title?: string }>({});

  // Initialize form fields when editing
  useEffect(() => {
    if (editCluster) {
      setTitle(editCluster.title);
      setDescription(editCluster.description || '');
      setSelectedIcon(editCluster.icon || '📌');
      setGradientFrom(editCluster.gradientFrom || '#FF6B6B');
      setGradientTo(editCluster.gradientTo || '#4ECDC4');
    } else {
      // Reset form when not editing
      setTitle('');
      setDescription('');
      setSelectedIcon('📌');
      setGradientFrom('#FF6B6B');
      setGradientTo('#4ECDC4');
    }
    setErrors({});
  }, [editCluster, isOpen]);

  const handleCreateClick = () => {
    // Trigger form validation and submission
    const form = document.getElementById('cluster-form') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    setErrors({});
    onSubmit(title.trim(), description.trim() || undefined, selectedIcon, gradientFrom, gradientTo);
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedIcon('📌');
    setGradientFrom('#FF6B6B');
    setGradientTo('#4ECDC4');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedIcon('📌');
    setGradientFrom('#FF6B6B');
    setGradientTo('#4ECDC4');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {editCluster ? 'Edit Cluster' : 'Add new Cluster'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6" id="cluster-form">
          <p className="text-gray-600 text-sm">
            {editCluster 
              ? "Update your cluster details below." 
              : "Let's create you a whole new cluster in your mood board. Fill in the form to create."
            }
          </p>
          
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sunset"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                autoFocus
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Icon
              </label>
              <div className="grid grid-cols-10 gap-2">
                {CLUSTER_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-200 ${
                      selectedIcon === icon
                        ? 'bg-blue-500 text-white shadow-lg transform scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gradient Colors
              </label>
              <div className="space-y-4">
                {/* From Color */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    From Color
                  </label>
                  <div className="grid grid-cols-9 gap-2">
                    {GRADIENT_COLORS.map((color) => (
                      <button
                        key={`from-${color}`}
                        type="button"
                        onClick={() => setGradientFrom(color)}
                        className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                          gradientFrom === color
                            ? 'ring-2 ring-gray-400 ring-offset-2 transform scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* To Color */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    To Color
                  </label>
                  <div className="grid grid-cols-9 gap-2">
                    {GRADIENT_COLORS.map((color) => (
                      <button
                        key={`to-${color}`}
                        type="button"
                        onClick={() => setGradientTo(color)}
                        className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                          gradientTo === color
                            ? 'ring-2 ring-gray-400 ring-offset-2 transform scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Preview
                  </label>
                  <div 
                    className="w-full h-16 rounded-xl flex items-center justify-center text-white font-medium"
                    style={{ 
                      background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` 
                    }}
                  >
                    <span className="text-2xl mr-2">{selectedIcon}</span>
                    {title || 'Your Cluster'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            type="black"
            text={loading ? (editCluster ? "Updating..." : "Creating...") : (editCluster ? "Update" : "Create")}
            disabled={loading}
            className="w-full flex justify-center items-center"
            onClick={handleCreateClick}
          />
        </form>
      </div>
    </div>
  );
}