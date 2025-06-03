"use client";

import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useMoodboard } from "@/hooks/useMoodboard";

import Button from "@/components/ui/Button";

import { CreateClusterModal } from "@/components/moodboard/CreateClusterModal";
import { ClusterCard } from "@/components/moodboard/ClusterCard";
import { PostCard } from "@/components/moodboard/PostCard";
import {
  ArrowLeft,
  ChevronLeft,
  Delete,
  Download,
  Lock,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Share,
  Share2,
  Sparkles,
  Trash,
  User,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  LinkedInSquare,
  Settings,
  TikTok,
} from "@/components/icons";
import { Cluster } from "@/types";

// Modal Components
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = 'warning'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-blue-500" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return "bg-red-600 hover:bg-red-700 text-white";
      case 'warning':
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg transition-colors ${getConfirmButtonClass()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  type = 'info'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PromptModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  placeholder?: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
  inputType?: 'text' | 'number';
}

const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  title,
  message,
  placeholder,
  defaultValue = '',
  onConfirm,
  onCancel,
  inputType = 'text'
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          <form onSubmit={handleSubmit}>
            <input
              type={inputType}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function MoodboardPage() {
  const {
    moodboard,
    selectedCluster,
    setSelectedCluster,
    loading,
    createCluster,
    updateCluster,
    deleteCluster,
    addPostsToCluster,
    assignPostToCluster,
    getFilteredPosts,
    createMoodboard,
  } = useMoodboard();
  

  const [showCreateClusterModal, setShowCreateClusterModal] = useState(false);
  const [editingCluster, setEditingCluster] = useState<Cluster | null>(null);
  const [showKebabMenu, setShowKebabMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loadingCluster, setLoadingCluster] = useState<string | null>(null);

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
    confirmText?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const [promptModal, setPromptModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    placeholder?: string;
    defaultValue?: string;
    onConfirm: (value: string) => void;
    inputType?: 'text' | 'number';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside kebab menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showKebabMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.kebab-menu-container')) {
          setShowKebabMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showKebabMenu]);

  // Initialize with default moodboard if none exists
  useEffect(() => {
    if (!moodboard) {
      createMoodboard("My moodboard", "65 Posts");
    }
  }, [moodboard, createMoodboard]);

  const handleCreateCluster = (
    title: string,
    description?: string,
    icon?: string,
    gradientFrom?: string,
    gradientTo?: string
  ) => {
    if (editingCluster) {
      // Update existing cluster
      updateCluster(editingCluster.id, {
        title,
        description,
        icon,
        gradientFrom,
        gradientTo,
      });
      setEditingCluster(null);
    } else {
      // Create new cluster
      createCluster(title, description, icon, gradientFrom, gradientTo);
    }
    setShowCreateClusterModal(false);
  };

  const handleEditCluster = (cluster: Cluster) => {
    setEditingCluster(cluster);
    setShowCreateClusterModal(true);
  };

  const handleDeleteCluster = (clusterId: string) => {
    const cluster = moodboard?.clusters.find(c => c.id === clusterId);
    if (cluster) {
      setConfirmModal({
        isOpen: true,
        title: 'Delete Cluster',
        message: `Are you sure you want to delete "${cluster.title}" cluster? This action cannot be undone.`,
        type: 'danger',
        confirmText: 'Delete',
        onConfirm: () => {
          deleteCluster(clusterId);
          // If we deleted the selected cluster, deselect it
          if (selectedCluster === clusterId) {
            setSelectedCluster(null);
          }
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      });
    }
  };

  const handleKebabMenuAction = (action: 'add' | 'edit' | 'delete') => {
    setShowKebabMenu(false);
    
    switch (action) {
      case 'add':
        setEditingCluster(null);
        setShowCreateClusterModal(true);
        break;
      case 'edit':
        if (selectedCluster) {
          const cluster = moodboard?.clusters.find(c => c.id === selectedCluster);
          if (cluster) {
            handleEditCluster(cluster);
          }
        }
        break;
      case 'delete':
        if (selectedCluster) {
          handleDeleteCluster(selectedCluster);
        }
        break;
    }
  };

  const handleAddPostsToCluster = (clusterId: string) => {
    setPromptModal({
      isOpen: true,
      title: 'Add Posts',
      message: 'How many posts would you like to add?',
      placeholder: 'Enter number of posts',
      defaultValue: '10',
      inputType: 'number',
      onConfirm: (value: string) => {
        const numPosts = parseInt(value, 10);
        if (isNaN(numPosts) || numPosts <= 0) {
          setAlertModal({
            isOpen: true,
            title: 'Invalid Input',
            message: 'Please enter a valid number greater than 0.',
            type: 'error'
          });
        } else {
          setLoadingCluster(clusterId);
          addPostsToCluster(clusterId, numPosts).finally(() => {
            setLoadingCluster(null);
          });
        }
        setPromptModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRedesign = () => {
    if (!moodboard) return;

    // Set loading state for all clusters that have posts
    const clustersWithPosts = moodboard.clusters.filter(cluster => 
      getFilteredPosts(cluster.id).length > 0
    );
    
    if (clustersWithPosts.length === 0) {
      setAlertModal({
        isOpen: true,
        title: 'No Posts to Redesign',
        message: 'No posts to redesign. Add some posts to your clusters first.',
        type: 'info'
      });
      return;
    }

    // Regenerate posts for each cluster
    clustersWithPosts.forEach(cluster => {
      setLoadingCluster(cluster.id);
      addPostsToCluster(cluster.id, 0).finally(() => {
        setLoadingCluster(null);
      });
    });
  };

  const handleSave = () => {
    if (!moodboard) return;
    
    try {
      // Save moodboard data to localStorage as backup
      const moodboardData = {
        ...moodboard,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('moodboard_backup', JSON.stringify(moodboardData));
      
      // Show success message
      setAlertModal({
        isOpen: true,
        title: 'Saved Successfully',
        message: `Moodboard "${moodboard.title}" saved successfully!`,
        type: 'success'
      });
    } catch (error) {
      setAlertModal({
        isOpen: true,
        title: 'Save Failed',
        message: 'Failed to save moodboard. Please try again.',
        type: 'error'
      });
      console.error("Save error:", error);
    }
  };

  const handleShare = () => {
    if (!moodboard) return;
    
    // Create shareable content
    const shareData = {
      title: `${moodboard.title} - TransitStay Moodboard`,
      text: `Check out my moodboard "${moodboard.title}" with ${moodboard.posts.length} posts and ${moodboard.clusters.length} clusters!`,
      url: window.location.href
    };

    // Try native Web Share API first
    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.log('Error sharing:', error);
        fallbackShare(shareData);
      });
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData: {title: string, text: string, url: string}) => {
    // Fallback: copy to clipboard
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setAlertModal({
          isOpen: true,
          title: 'Link Copied',
          message: 'Share link copied to clipboard!',
          type: 'success'
        });
      }).catch(() => {
        promptCopyFallback(shareText);
      });
    } else {
      promptCopyFallback(shareText);
    }
  };

  const promptCopyFallback = (text: string) => {
    // Final fallback: show text in prompt for manual copy
    setPromptModal({
      isOpen: true,
      title: 'Copy Share Link',
      message: 'Copy this share link:',
      defaultValue: text,
      onConfirm: () => {
        setPromptModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleCloseModal = () => {
    setShowCreateClusterModal(false);
    setEditingCluster(null);
  };

  const handleDeleteMoodboard = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Moodboard',
      message: 'Are you sure you want to delete this moodboard? All clusters and posts will be permanently lost.',
      type: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        localStorage.removeItem('moodboard');
        window.location.reload();
      }
    });
  };

  if (!moodboard) {
    return (
      <div className="min-h-screen bg-[#b5a394] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            Welcome to TransitStay
          </h1>
          <p className="text-white/80 mb-6 text-sm sm:text-base">Loading your moodboard...</p>
        </div>
      </div>
    );
  }

  const filteredPosts = getFilteredPosts(selectedCluster);
  const selectedClusterData = moodboard.clusters.find(
    (c) => c.id === selectedCluster
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#b5a394] from-0% via-10% to-50% via-[#c5b8ac] to-[#9d8c7b] overflow-x-hidden">
      {/* Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/5 backdrop-blur-xl" : "bg-white/5 backdrop-blur-xl"
        }`}
      >
        <div className="w-11/12 max-w-7xl mx-auto py-3 sm:py-4 flex justify-between items-center">
          <Image 
            width={80} 
            height={80} 
            alt="Logo" 
            src={"/images/logo.png"} 
            className=""
          />

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              text="Sign in"
              type="black"
              className="flex-row-reverse text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[36px] sm:min-h-[40px]"
              icon={<User className="w-3 h-3 sm:w-4 sm:h-4" />}
            />
          </div>
        </div>
      </div>

      <div className="mt-20 sm:mt-24 md:mt-28" />
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Moodboard Title and Actions */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors bg-black/30 flex-shrink-0 min-h-[30px] min-w-[30px] sm:min-h-[34px] sm:min-w-[34px]">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-white mb-1 break-words">
                {moodboard.title}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm">
                {moodboard.posts.length} Posts
              </p>
            </div>
            <button 
              className="p-2 hover:bg-white/10 rounded-full flex justify-center items-center transition-colors bg-black/30 relative kebab-menu-container flex-shrink-0 min-h-[30px] min-w-[30px] sm:min-h-[34px] sm:min-w-[34px]"
              onClick={() => setShowKebabMenu(!showKebabMenu)}
            >
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              
              {/* Kebab Menu */}
              {showKebabMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleKebabMenuAction('add')}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100/70 transition-colors"
                    >
                      Add New Cluster
                    </button>
                    {selectedCluster && (
                      <>
                        <button
                          onClick={() => handleKebabMenuAction('edit')}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100/70 transition-colors"
                        >
                          Edit Selected Cluster
                        </button>
                        <button
                          onClick={() => handleKebabMenuAction('delete')}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50/70 transition-colors"
                        >
                          Delete Selected Cluster
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </button>
            <button 
              className="p-2 hover:bg-white/10 flex justify-center items-center rounded-full transition-colors bg-black/30 flex-shrink-0 min-h-[30px] min-w-[30px] sm:min-h-[34px] sm:min-w-[34px]" 
              onClick={handleDeleteMoodboard}
            >
              <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 sm:pb-0 -mx-1 px-1">
            <Button
              type="black"
              className="whitespace-nowrap text-xs sm:text-sm bg-gradient-to-l flex-row-reverse from-primary-900 to-primary-700 hover:from-primary-800 hover:to-primary-600 border-0 px-3 sm:px-4 py-2 min-h-[36px] sm:min-h-[40px] flex-shrink-0"
              onClick={handleRedesign}
              text="Redesign"
              icon={<Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />}
              disabled={loading}
            />
            <Button
              type="gray"
              className="whitespace-nowrap text-xs sm:text-sm bg-white flex-row-reverse hover:bg-white/90 border-0 !text-black px-3 sm:px-4 py-2 min-h-[36px] sm:min-h-[40px] flex-shrink-0"
              onClick={handleSave}
              text="Save"
              icon={<Download className="w-3 h-3 sm:w-4 sm:h-4" />}
            />
            <Button
              type="gray"
              className="whitespace-nowrap text-xs sm:text-sm flex-row-reverse bg-gradient-to-l from-blue-200 to-primary-400 hover:from-blue-300 hover:to-primary-500 border-0 px-3 sm:px-4 py-2 min-h-[36px] sm:min-h-[40px] flex-shrink-0"
              onClick={handleShare}
              text="Share"
              icon={<Share2 className="w-3 h-3 sm:w-4 sm:h-4" />}
            />
          </div>
        </div>

        {/* Main Content Grid */}

        {/* Clusters Sidebar */}
        <div className="w-full">
          {moodboard.clusters.length ? (
            <div className="flex flex-col gap-4 sm:gap-6">
              {moodboard.clusters.map((cluster: Cluster) => {
                const filteredPosts = getFilteredPosts(cluster.id);

                return (
                  <div
                    className="flex flex-col lg:grid lg:grid-cols-6 gap-4 lg:gap-6"
                    key={cluster.id}
                  >
                    {/* Cluster Card */}
                    <div className="lg:col-span-1">
                      <ClusterCard
                        cluster={cluster}
                        isSelected={selectedCluster === cluster.id}
                        onClick={() =>
                          setSelectedCluster(
                            selectedCluster === cluster.id ? null : cluster.id
                          )
                        }
                        onEdit={handleEditCluster}
                        onDelete={handleDeleteCluster}
                      />
                    </div>
                    
                    {/* Posts Grid */}
                    <div className="lg:col-span-5">
                      {loadingCluster === cluster.id ? (
                        <div className="flex items-center justify-center h-32 sm:h-48 lg:h-64">
                          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
                        </div>
                      ) : filteredPosts.length > 0 ? (
                        <div className="overflow-x-auto">
                          <div
                            className="grid gap-3 sm:gap-4 pb-4"
                            style={{
                              gridTemplateRows: "repeat(2, 1fr)",
                              gridTemplateColumns: window.innerWidth >= 1024 
                                ? "repeat(auto-fit, 200px)" 
                                : window.innerWidth >= 640 
                                ? "repeat(auto-fit, 160px)" 
                                : "repeat(auto-fit, 140px)",
                              gridAutoColumns: window.innerWidth >= 1024 
                                ? "200px" 
                                : window.innerWidth >= 640 
                                ? "160px" 
                                : "140px",
                              gridAutoFlow: "column dense",
                              minWidth: window.innerWidth >= 1024 ? "100%" : "max-content",
                            }}
                          >
                            {filteredPosts.map((post) => (
                              <PostCard
                                key={post.id}
                                post={post}
                                clusters={moodboard.clusters}
                                onAssignToCluster={assignPostToCluster}
                                showClusterBadge={!selectedCluster}
                              />
                            ))}
                            {/* Add More Posts Button */}
                            <div 
                              className={`flex items-center justify-center bg-white/10 rounded-lg border-2 border-dashed border-white/30 hover:border-white/50 transition-colors cursor-pointer min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] ${loadingCluster === cluster.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => loadingCluster !== cluster.id && handleAddPostsToCluster(cluster.id)}
                            >
                              <div className="text-center p-4">
                                {loadingCluster === cluster.id ? (
                                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mx-auto mb-2"></div>
                                ) : (
                                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white/60 mx-auto mb-2" />
                                )}
                                <p className="text-white/80 text-xs sm:text-sm font-medium">
                                  {loadingCluster === cluster.id ? 'Adding Posts...' : 'Add More Posts'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-8 lg:py-12">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-xl sm:text-2xl">
                              {cluster?.icon || "📌"}
                            </span>
                          </div>
                          <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
                            No posts in "{cluster?.title}" yet
                          </h3>
                          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                            Start adding posts to this cluster to see them here
                          </p>
                          <Button
                            onClick={() => handleAddPostsToCluster(cluster.id)}
                            type="gray"
                            text="Add Posts"
                            icon={<Plus className="w-4 h-4" />}
                            disabled={loadingCluster === cluster.id}
                            className="w-fit py-2 px-6 sm:px-10 !rounded-sm text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="mt-4">
                <ClusterCard
                  isAddNew
                  onClick={() => {
                    setEditingCluster(null);
                    setShowCreateClusterModal(true);
                  }}
                  className="!w-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-full px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />
              </div>
              <p className="text-white/80 text-lg sm:text-xl font-semibold text-center">
                No clusters yet
              </p>
              <ClusterCard
                isAddNew
                onClick={() => {
                  setEditingCluster(null);
                  setShowCreateClusterModal(true);
                }}
                className="!w-full max-w-sm"
              />
            </div>
          )}
        </div>

        {/* Posts Grid */}

        {/* Modals */}
        <CreateClusterModal
          isOpen={showCreateClusterModal}
          onClose={handleCloseModal}
          onSubmit={handleCreateCluster}
          loading={loading}
          editCluster={editingCluster}
        />

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
          type={confirmModal.type}
          confirmText={confirmModal.confirmText}
        />

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          title={alertModal.title}
          message={alertModal.message}
          onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
          type={alertModal.type}
        />

        {/* Prompt Modal */}
        <PromptModal
          isOpen={promptModal.isOpen}
          title={promptModal.title}
          message={promptModal.message}
          placeholder={promptModal.placeholder}
          defaultValue={promptModal.defaultValue}
          onConfirm={promptModal.onConfirm}
          onCancel={() => setPromptModal(prev => ({ ...prev, isOpen: false }))}
          inputType={promptModal.inputType}
        />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#374151",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />

      {/* Social sidebar - Hidden on mobile */}
      <div className="hidden lg:flex fixed right-4 xl:right-10 top-1/2 flex-col space-y-6 -translate-y-1/2 z-40">
        <Instagram fillOpacity={0.6} className="cursor-pointer hover:scale-110 transition-transform" />
        <Facebook className="cursor-pointer hover:scale-110 transition-transform" />
        <LinkedInSquare className="cursor-pointer hover:scale-110 transition-transform" />
        <TikTok className="cursor-pointer hover:scale-110 transition-transform" />
        <Settings className="!mt-16 cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* Mobile Social Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/10 z-40">
        <div className="flex justify-center items-center space-x-8 py-4">
          <Instagram fillOpacity={0.6} className="cursor-pointer w-5 h-5" />
          <Facebook className="cursor-pointer w-5 h-5" />
          <LinkedInSquare className="cursor-pointer w-5 h-5" />
          <TikTok className="cursor-pointer w-5 h-5" />
          <Settings className="cursor-pointer w-5 h-5" />
        </div>
      </div>

      {/* Add bottom padding for mobile social footer */}
      <div className="lg:hidden h-16" />
    </div>
  );
}
