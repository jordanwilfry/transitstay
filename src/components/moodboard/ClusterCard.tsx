import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Plus, X } from "lucide-react";
import { Cluster } from "../../types";

interface ClusterCardProps {
  cluster?: Cluster;
  isAddNew?: boolean;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
  onEdit?: (cluster: Cluster) => void;
  onDelete?: (clusterId: string) => void;
}

export function ClusterCard({
  cluster,
  isAddNew,
  isSelected,
  onClick,
  className,
  onEdit,
  onDelete,
}: ClusterCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cluster && onEdit) {
      onEdit(cluster);
      setIsMenuOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cluster && onDelete) {
      const confirmed = window.confirm(`Are you sure you want to delete "${cluster.title}" cluster?`);
      if (confirmed) {
        onDelete(cluster.id);
        setIsMenuOpen(false);
      }
    }
  };

  if (isAddNew) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer 
                   border border-white/20 hover:border-white/30 transition-all duration-200
                   min-h-[120px] sm:min-h-[160px] flex flex-col items-center justify-center ${className}`}
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-medium">Add new</span>
      </motion.div>
    );
  }

  if (!cluster) return null;

  // Use gradient if available, otherwise fallback to solid color
  const backgroundStyle =
    cluster.gradientFrom && cluster.gradientTo
      ? {
          background: `linear-gradient(135deg, ${cluster.gradientFrom}, ${cluster.gradientTo})`,
        }
      : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${className}
        rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 min-h-[120px] sm:min-h-[160px] h-[500px]
        text-white relative overflow-hidden !flex flex-col !justify-center !items-center my-auto
        ${
          isSelected
            ? "ring-1 ring-white/50 shadow-xl"
            : "hover:shadow-lg"
        }
        ${!cluster.gradientFrom ? cluster.color : ""}
      `}
      style={backgroundStyle}
    >
      <button
        onClick={handleMenuClick}
        className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors"
        aria-label="Menu options"
      >
        <MoreVertical size={20} />
      </button>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center p-2 z-10">
            <div className="absolute top-2 right-2 w-8 rounded-full h-8 bg-white flex items-center hover:rotate-180 transition-all hover:scale-105 justify-center p-2" onClick={(e) => {e.stopPropagation(); setIsMenuOpen(false)}}>
            <X className="text-red-600" />
            </div>
          <div className="flex flex-col  justify-center gap-2">
            <button 
              onClick={handleEdit}
              className="text-white bg-white/10 rounded-md p-2 hover:bg-white/20 cursor-pointer transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="text-white bg-white/10 rounded-md p-2 hover:bg-red-500/20 cursor-pointer transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8 mb-6">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
          <div className="relative text-4xl z-0">{cluster.icon || "📌"}</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="text-center">
          <h3 className="text-white text-xl font-medium mb-2">
            {cluster.title}
          </h3>
          {cluster.description && (
            <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
              {cluster.description}
            </p>
          )}
          <p className="text-white/80 text-sm">{cluster.postCount} Posts</p>
        </div>
      </div>
    </motion.div>
  );
}
