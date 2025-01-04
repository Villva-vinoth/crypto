import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./infiniteScroll.css";
import axios from "axios";

const InfiniteScrolls = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setHasMore(false);
    } finally{
        setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center">InfiniteScroll</h1>
      <div
        className="h-50 w-[100%] bg-[#944e03] overflow-y-auto"
        style={{ maxHeight: "400px" }}
        id="scrolls">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="flex">
              <span className="text-[red]">Loading...</span>
              <div className="ping">
                <div className="w-5 h-1 text-[red]">. . . </div>
              </div>
            </div>
          }
          scrollableTarget="scrolls"
          endMessage={<p style={{ textAlign: "center" }} className="text-white">End of Results</p>}>
          {data.map((item, index) => (
            <div key={index} className="text-white p-2 border-2">
              {index + 1}
              
              <div className="text-white">{item.title}</div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrolls;
