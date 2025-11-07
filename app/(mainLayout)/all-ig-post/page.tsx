"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import InstagramPostPreviewEmbedded from "./InstagramPostPreviewEmbedded";

interface InstagramPost {
  id: string;
  igLink: string;
}

export default function InstagramAllPostsClient() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const take = 8;

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await fetch(`/all-ig-post/getInstagramPostsRoute?skip=${skip}&take=${take}`);
    const data: InstagramPost[] = await res.json();

    setPosts((prev) => [...prev, ...data]);
    setSkip((prev) => prev + data.length);

    if (data.length < take) setHasMore(false);

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasMore]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-6">
      <h1 className="text-xl font-bold mb-6">Follow Us on Instagram</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <InstagramPostPreviewEmbedded igLink={post.igLink} />
          </Card>
        ))}
      </div>

      {hasMore && (
        <div ref={observerRef} className="h-10 flex justify-center items-center mt-4">
          {loading && <p>Loading more posts...</p>}
        </div>
      )}

      {!hasMore && <p className="text-center mt-6">No more posts to show.</p>}
    </div>
  );
}
