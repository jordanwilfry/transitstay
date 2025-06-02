import React from 'react';
import { ArrowLeft, Lock, Share, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { KebabMenu } from './KebabMenu';

interface MoodboardHeaderProps {
  title: string;
  postCount: number;
  onBack?: () => void;
  onShare?: () => void;
  onAddCluster: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  showClusterActions?: boolean;
}

export function MoodboardHeader({
  title,
  postCount,
  onBack,
  onShare,
  onAddCluster,
  onRename,
  onDelete,
  showClusterActions
}: MoodboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-gray-600">{postCount} Posts</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button type="gray" onClick={onShare} text="Share" icon={<Share className="w-4 h-4 mr-2" />} />
        
        <Button type="gray" text="Safe" icon={<Lock className="w-4 h-4 mr-2" />} />
        
        <Button type="gray" text="Redesign" icon={<Sparkles className="w-4 h-4 mr-2" />} />
        
        <KebabMenu
          onAddCluster={onAddCluster}
          onRename={onRename}
          onDelete={onDelete}
          showClusterActions={showClusterActions}
        />
      </div>
    </div>
  );
}