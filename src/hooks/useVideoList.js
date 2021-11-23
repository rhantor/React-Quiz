import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
  startAt,
  limitToFirst,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {
  //  database related code
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore , setHasMore] = useState(true)
  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt(""+ page) ,
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        // Request from datebase
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          //when videos would finished
          setHasMore(false)
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }
    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore
  };
}
