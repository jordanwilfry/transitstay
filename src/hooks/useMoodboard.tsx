import { useState, useCallback } from "react";
import { Moodboard, Cluster, Post, PexelsPhoto } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { usePexels } from "./usePexels";
import toast from "react-hot-toast";
import { CLUSTER_COLORS } from "@/utils/constant";

const generateId = () => Math.random().toString(36).substr(2, 9);

const getRandomUser = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return {
      name: `${data.results[0].name.first} ${data.results[0].name.last}`,
      avatar: data.results[0].picture.thumbnail,
    };
  } catch {
    return {
      name: "Anonymous User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    };
  }
};

export function useMoodboard() {
  const {value: moodboard, storeValue: setMoodboard} = useLocalStorage<Moodboard | null>("moodboard", null)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { searchPhotos } = usePexels();

  const createMoodboard = useCallback(
    (title: string, description?: string) => {
      // Create empty moodboard without any initial content
      const newMoodboard: Moodboard = {
        id: generateId(),
        title,
        description,
        clusters: [],
        posts: [],
        createdAt: new Date().toISOString(),
      };
      setMoodboard(newMoodboard);
      toast.success("Moodboard created successfully!");
      return newMoodboard;
    },
    [setMoodboard]
  );

  const createCluster = useCallback(
    (title: string, description?: string, icon?: string, gradientFrom?: string, gradientTo?: string) => {
      if (!moodboard) return;

      const newCluster: Cluster = {
        id: generateId(),
        title,
        description,
        postCount: 0,
        color: CLUSTER_COLORS[moodboard.clusters.length % CLUSTER_COLORS.length],
        icon: icon || '📌',
        gradientFrom,
        gradientTo,
        createdAt: new Date().toISOString(),
      };

      const updatedMoodboard = {
        ...moodboard,
        clusters: [...moodboard.clusters, newCluster],
      };
      
      setMoodboard(updatedMoodboard);
      toast.success("Cluster created successfully!");
      return newCluster;
    },
    [moodboard, setMoodboard]
  );

  const updateCluster = useCallback(
    (clusterId: string, updates: Partial<Cluster>) => {
      if (!moodboard) return;

      const updatedMoodboard = {
        ...moodboard,
        clusters: moodboard.clusters.map((cluster) =>
          cluster.id === clusterId ? { ...cluster, ...updates } : cluster
        ),
      };

      setMoodboard(updatedMoodboard);
      toast.success("Cluster updated successfully!");
    },
    [moodboard, setMoodboard]
  );

  const deleteCluster = useCallback(
    (clusterId: string) => {
      if (!moodboard) return;

      const clusterToDelete = moodboard.clusters.find(
        (c) => c.id === clusterId
      );
      if (!clusterToDelete) return;

      const updatedMoodboard = {
        ...moodboard,
        clusters: moodboard.clusters.filter((cluster) => cluster.id !== clusterId),
        posts: moodboard.posts.map((post) =>
          post.clusterId === clusterId
            ? { ...post, clusterId: undefined }
            : post
        ),
      };

      setMoodboard(updatedMoodboard);

      // Show success toast
      toast.success(`"${clusterToDelete.title}" deleted`);
    },
    [moodboard, setMoodboard]
  );

  const generatePostsForCluster = useCallback(
    async (clusterId: string, query: string, count: number = 10) => {
      if (!moodboard) return;

      setLoading(true);
      try {
        const photosResponse = await searchPhotos(query, count);
        const newPosts: Post[] = await Promise.all(
          photosResponse.photos.map(async (photo: PexelsPhoto) => {
            const author = await getRandomUser();
            return {
              id: generateId(),
              imageUrl: photo.src.medium,
              title: `${query} inspiration`,
              description: `Beautiful ${query} photo by ${photo.photographer}`,
              clusterId,
              author,
              createdAt: new Date().toISOString(),
              tags: [query],
            };
          })
        );

        const updatedMoodboard = {
          ...moodboard,
          posts: [...moodboard.posts, ...newPosts],
          clusters: moodboard.clusters.map((cluster) =>
            cluster.id === clusterId
              ? { ...cluster, postCount: cluster.postCount + newPosts.length }
              : cluster
          ),
        };

        setMoodboard(updatedMoodboard);
        toast.success(`Added ${newPosts.length} posts to cluster!`);
      } catch (error) {
        toast.error("Failed to generate posts");
      } finally {
        setLoading(false);
      }
    },
    [moodboard, setMoodboard, searchPhotos]
  );

  const assignPostToCluster = useCallback(
    (postId: string, clusterId?: string) => {
      if (!moodboard) return;

      const post = moodboard.posts.find((p) => p.id === postId);
      if (!post) return;

      const oldClusterId = post.clusterId;

      const updatedMoodboard = {
        ...moodboard,
        posts: moodboard.posts.map((p) =>
          p.id === postId ? { ...p, clusterId } : p
        ),
        clusters: moodboard.clusters.map((cluster) => {
          if (cluster.id === oldClusterId) {
            return {
              ...cluster,
              postCount: Math.max(0, cluster.postCount - 1),
            };
          }
          if (cluster.id === clusterId) {
            return { ...cluster, postCount: cluster.postCount + 1 };
          }
          return cluster;
        }),
      };

      setMoodboard(updatedMoodboard);
      toast.success(
        clusterId ? "Post assigned to cluster!" : "Post removed from cluster!"
      );
    },
    [moodboard, setMoodboard]
  );

  const getFilteredPosts = useCallback(
    (clusterId?: string | null) => {
      if (!moodboard) return [];
      if (!clusterId) return moodboard.posts;
      return moodboard.posts.filter((post) => post.clusterId === clusterId);
    },
    [moodboard]
  );

  const addPostsToCluster = useCallback(
    async (clusterId: string) => {
      if (!moodboard) return;
      
      const cluster = moodboard.clusters.find(c => c.id === clusterId);
      if (!cluster) return;
      
      setLoading(true);
      try {
        // Generate posts based on cluster title using Pexels API
        await generatePostsForCluster(clusterId, cluster.title.toLowerCase(), 10);
        toast.success(`Added posts to ${cluster.title}!`);
      } catch (error) {
        toast.error('Failed to add posts');
      } finally {
        setLoading(false);
      }
    },
    [moodboard, generatePostsForCluster]
  );

  return {
    moodboard,
    selectedCluster,
    setSelectedCluster,
    loading,
    createMoodboard,
    createCluster,
    updateCluster,
    deleteCluster,
    generatePostsForCluster,
    addPostsToCluster,
    assignPostToCluster,
    getFilteredPosts,
  };
}
