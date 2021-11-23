import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(videoId) {
  const [loading, setLoading] = useState();
  const [error, seterror] = useState();
  const [answers, setAnswer] = useState([]);
  useEffect(() => {
    async function fetchAnswer() {
      const database = getDatabase();
      const ansRef = ref(database, `answers/${videoId}/questions`);
      const ansQuery = query(ansRef, orderByKey());

      try {
        setLoading(true);
        seterror(false);
        const snapshot = await get(ansQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswer((prevAns) => {
            return [...prevAns, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        seterror(true);
        setLoading(false);
        console.log(error);
      }
    }
    fetchAnswer();
  }, [videoId]);
  return {
    loading,
    error,
    answers,
  };
}
