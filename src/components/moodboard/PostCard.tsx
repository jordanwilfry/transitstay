import React, { useEffect, useState } from "react";
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

interface MosaicTile {
  id: number;
  colSpan: number;
  rowSpan: number;
  color: string;
  opacity: number;
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
  const [tile, setTile] = useState<MosaicTile | null>(null);

  // Tailwind color palette for the mosaic
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-orange-400",
    "bg-cyan-400",
    "bg-emerald-400",
    "bg-violet-400",
    "bg-rose-400",
    "bg-sky-400",
    "bg-lime-400",
    "bg-amber-400",
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
  ];

  const generateRandomTile = () => {
    // Column spans can be longer since we have horizontal space
    const colSpanOptions = [1, 1, 1, 2, 2];
    // Row spans limited to 1 or 2 since we only have 2 rows total
    const rowSpanOptions = [1, 1, 1, 2];

    const newTile: MosaicTile = {
      id: 0,
      colSpan: colSpanOptions[Math.floor(Math.random() * colSpanOptions.length)],
      rowSpan: rowSpanOptions[Math.floor(Math.random() * rowSpanOptions.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.7 + Math.random() * 0.3, // Random opacity between 0.7 and 1
    };

    setTile(newTile);
  };

  useEffect(() => {
    generateRandomTile();
  }, []);

  if (!tile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-transparent transition-all duration-300 group cursor-pointer h-full w-full"
      style={{
        gridColumn: `span ${tile.colSpan}`,
        gridRow: `span ${tile.rowSpan}`,
        opacity: tile.opacity,
      }}
    >
      <div className="flex flex-col h-full w-full">
        {/* Image */}
        <div className="relative w-full rounded-xl sm:rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 h-full">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl" />
          )}
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            objectFit="cover"
            className="object-cover transition-transform duration-300 rounded-2xl"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Actions Overlay */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-white" />
              </button>

              {isMenuOpen && (
                <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-md rounded-lg shadow-lg py-2 min-w-[150px] z-20">
                  <div className="px-3 py-1 text-xs border-b-[1px] border-gray-500/50">
                    Assign to cluster
                  </div>
                  <button
                    onClick={() => {
                      onAssignToCluster(post.id, undefined);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50/50 text-red-500"
                  >
                    Delete
                  </button>
                  {clusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      onClick={() => {
                        onAssignToCluster(post.id, cluster.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50/50 ${
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
          
          {/* Instagram Icon */}
          <div className="absolute top-3 left-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors">
            <InstagramIcon className="w-4 h-4 text-white" />
          </div>

          {/* Cluster Badge */}
          {showClusterBadge && cluster && (
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <span className="text-xs">{cluster.icon}</span>
              <span className="text-xs text-white font-medium">{cluster.title}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-2 w-full h-10 flex-shrink-0">
          {/* Author */}
          <div className="flex items-center w-full space-x-2 justify-between h-full">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full flex-shrink-0"
                onError={(e) => {
                  // Fallback to dicebear avatar if randomuser fails
                  const target = e.target as HTMLImageElement;
                  target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`;
                }}
              />
              <span className="text-xs font-medium text-gray-900 truncate">
                {post.author.name}
              </span>
            </div>
            <button className="w-6 h-6 min-w-6 min-h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowUpRight className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
