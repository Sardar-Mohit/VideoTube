import "../../index.css";
import { Aside, LandingVideoPageCard } from "@/components/index";
import { useEffect, useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { allVideos } from "@/api/videoApi";
import useTimeHook from "@/hooks/useTimeHook";

const LandingPage = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  const fetchVideos = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const request = await allVideos({
        page: pageNumber,
        limit: 10,
      });

      const response = request.statusCode || [];

      console.log(`Page ${pageNumber}:`, response);

      if (response.length === 0) {
        setHasMore(false);
        return;
      }

      setVideos((prev) => [...prev, ...response]);

      if (response.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial videos
  useEffect(() => {
    fetchVideos(1);
  }, []);

  // Observe bottom of page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);

  // Fetch next page
  useEffect(() => {
    if (page > 1) {
      fetchVideos(page);
    }
  }, [page]);

  if (videos.length === 0 && loading) {
    return (
      <div className="flex h-[90%] w-full items-center justify-center">
        <ReloadIcon className="mr-2 h-20 w-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <Aside />

      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {videos.map((video) => (
            <LandingVideoPageCard
              key={video._id}
              id={video._id}
              videoDuration={video.duration}
              title={video.title}
              views={video.views}
              time={useTimeHook(video.createdAt)}
              thumbnail={video.thumbnail}
              authorName={video.ownerDetails.username}
              authorImg={video.ownerDetails.avatar}
            />
          ))}
        </div>

        {/* Bottom trigger */}
        {hasMore && (
          <div
            ref={observerRef}
            className="flex h-20 items-center justify-center"
          >
            {loading && (
              <ReloadIcon className="h-8 w-8 animate-spin" />
            )}
          </div>
        )}


      </section>
    </div>
  );
};

export default LandingPage;