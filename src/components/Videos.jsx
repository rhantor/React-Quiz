import { Link } from "react-router-dom";
import Styles from "../styles/Videos.module.css";
import Video from "./Video";
import useVideoList from "../hooks/useVideoList";
import loadingImg from "../assets/images/loading.gif";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
export default function Videos() {
  const [page, setPage] = useState(0);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          className={Styles.videos}
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`}key={video.youtubeID}>
                <Video
                  title={video.title}
                  noq={video.noq}
                  id={video.youtubeID}
                />
              </Link>
            ) : (
              <Video  key={video.youtubeID} title={video.title} noq={video.noq} id={video.youtubeID} />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found</div>}
      {error && <div>There was an error</div>}
      {loading && (
        <h4>
          {" "}
          <img src={loadingImg} alt="" />
        </h4>
      )}
    </div>
  );
}
