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
  Lock,
  MoreHorizontal,
  Plus,
  Share,
  Sparkles,
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

export default function MoodboardPage() {
  const {
    moodboard,
    selectedCluster,
    setSelectedCluster,
    loading,
    createCluster,
    addPostsToCluster,
    assignPostToCluster,
    getFilteredPosts,
    createMoodboard,
  } = useMoodboard();

  const [showCreateClusterModal, setShowCreateClusterModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    createCluster(title, description, icon, gradientFrom, gradientTo);
    setShowCreateClusterModal(false);
  };

  if (!moodboard) {
    return (
      <div className="min-h-screen bg-[#b5a394] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-white mb-4">
            Welcome to TransitStay
          </h1>
          <p className="text-white/80 mb-6">Loading your moodboard...</p>
        </div>
      </div>
    );
  }

  const filteredPosts = getFilteredPosts(selectedCluster);
  const selectedClusterData = moodboard.clusters.find(
    (c) => c.id === selectedCluster
  );

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#b5a394] from-0% via-10% to-50% via-[#c5b8ac] to-[#9d8c7b] overflow-y-auto">
      {/* Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/5 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="w-11/12 max-w-7xl mx-auto py-4 flex justify-between items-center">
          <Image width={100} height={100} alt="Logo" src={"/images/logo.png"} />

          <div className="flex items-center gap-3">
            <Button text="Sign in" type="black" />
            <Button text="Register" type="gray" />
          </div>
        </div>
      </div>

      <div className="mt-28" />
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Moodboard Title and Actions */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                {moodboard.title}
              </h1>
              <p className="text-white/80 text-sm">
                {moodboard.posts.length} Posts
              </p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
            <Button
              type="black"
              className="whitespace-nowrap text-xs sm:text-sm"
              onClick={() => setShowCreateClusterModal(true)}
              text="Redesign"
              icon={<Sparkles className="w-4 h-4" />}
            />
            <Button
              type="gray"
              className="whitespace-nowrap text-xs sm:text-sm"
              text="Safe"
              icon={<Lock className="w-4 h-4" />}
            />
            <Button
              type="gray"
              className="whitespace-nowrap text-xs sm:text-sm"
              text="Share"
              icon={<Share className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Main Content Grid */}

        {/* Clusters Sidebar */}
        <div className="w-full">
          {moodboard.clusters.length ? (
            <div className="flex lg:flex-col gap-3">
              {moodboard.clusters.map((cluster: Cluster) => {
                const filteredPosts = getFilteredPosts(cluster.id);
                
                return (
                  <div
                    className="grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-6 gap-6 max-h-[500px] overflow-x-auto overflow-y-hidden"
                    key={cluster.id}
                  >
                    <ClusterCard
                      cluster={cluster}
                      isSelected={selectedCluster === cluster.id}
                      onClick={() =>
                        setSelectedCluster(
                          selectedCluster === cluster.id ? null : cluster.id
                        )
                      }
                    />
                    <div className="lg:col-span-5 lg:row-span-1">
                      {loading ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                      ) : filteredPosts.length > 0 ? (
                        <div className="masonry-grid">
                          {filteredPosts.map((post) => (
                            <div key={post.id} className="masonry-item">
                              <PostCard
                                post={post}
                                clusters={moodboard.clusters}
                                onAssignToCluster={assignPostToCluster}
                                showClusterBadge={!selectedCluster}
                              />
                            </div>
                          ))}
                        </div>
                      ) :  (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">
                              {cluster?.icon || "📌"}
                            </span>
                          </div>
                          <h3 className="text-white text-lg font-semibold mb-2">
                            No posts in "{cluster?.title}" yet
                          </h3>
                          <p className="text-white/80 mb-6">
                            Start adding posts to this cluster to see them here
                          </p>
                          <Button
                            onClick={() =>
                              addPostsToCluster(cluster.id)
                            }
                            type="gray"
                            text="Add Posts"
                            icon={<Plus className="w-4 h-4" />}
                            disabled={loading}
                          />
                        </div>
                      ) }
                    </div>
                  </div>
                );
              })}
              <ClusterCard
                isAddNew
                onClick={() => setShowCreateClusterModal(true)}
                className="!w-fit"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white/80" />
              </div>
              <p className="text-white/80 text-xl font-semibold">
                No clusters yet
              </p>
              <ClusterCard
                isAddNew
                onClick={() => setShowCreateClusterModal(true)}
                className="!w-full min-w-[320px]"
              />
            </div>
          )}
        </div>

        {/* Posts Grid */}

        {/* Modals */}
        <CreateClusterModal
          isOpen={showCreateClusterModal}
          onClose={() => setShowCreateClusterModal(false)}
          onSubmit={handleCreateCluster}
          loading={loading}
        />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#374151",
            color: "#fff",
          },
        }}
      />

      {/* Social sidebar */}
      <div className="fixed right-10 top-1/2 space-y-6 -translate-y-1/2 z-40">
        <Instagram fillOpacity={0.6} className="cursor-pointer" />
        <Facebook className="cursor-pointer" />
        <LinkedInSquare className="cursor-pointer" />
        <TikTok className="cursor-pointer" />
        <Settings className="!mt-16 cursor-pointer" />
      </div>
    </div>
  );
}
