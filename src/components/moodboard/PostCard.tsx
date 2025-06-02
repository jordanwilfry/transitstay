import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ArrowUpRight,
  InstagramIcon,
} from "lucide-react";
import { Post, Cluster } from "../../types";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  clusters: Cluster[];
  onAssignToCluster: (postId: string, clusterId?: string) => void;
  showClusterBadge?: boolean;
}

export function PostCard({
  post,
  clusters,
  onAssignToCluster,
  showClusterBadge,
}: PostCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const cluster = clusters.find((c) => c.id === post.clusterId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-transparent rounded-xl sm:rounded-2xl transition-all duration-200 group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] sm:aspect-square overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl sm:rounded-2xl"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

        {/* Actions Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30"
            >
              <MoreHorizontal className="w-4 h-4 text-white" />
            </button>

            {isMenuOpen && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg py-2 min-w-[150px] !z-10">
                <div className="px-3 py-1 text-xs text-gray-500 border-b">
                  Assign to cluster
                </div>
                <button
                  onClick={() => {
                    onAssignToCluster(post.id, undefined);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                >
                  Remove from cluster
                </button>
                {clusters.map((cluster) => (
                  <button
                    key={cluster.id}
                    onClick={() => {
                      onAssignToCluster(post.id, cluster.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                      post.clusterId === cluster.id
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    {cluster.icon} {cluster.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-3 left-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30">
          <InstagramIcon className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-3 sm:pt-4 w-full">
        {/* Author */}
        <div className="flex items-center w-full space-x-2 mb-3 h-full rounded-xl sm:rounded-2xl justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={24}
              height={24}
              className="rounded-full"
              onError={(e) => {
                // Fallback to dicebear avatar if randomuser fails
                const target = e.target as HTMLImageElement;
                target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`;
              }}
            />
            <span className="text-xs font-medium text-gray-900">
              {post.author.name}
            </span>
          </div>
          <button className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 self-end">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
