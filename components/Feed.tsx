"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PostCard, { PostType } from "./PostCard";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  console.log(searchText);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const regex = new RegExp(inputText, "i");

    setFilteredPosts(
      inputText
        ? posts.filter(
            (post: PostType) =>
              regex.test(post.quote) ||
              regex.test(post.tag) ||
              regex.test(post.creator.email)
          )
        : posts
    );
    setSearchText(inputText);
  };

  const handleTagClick = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2 mb-10">
      <form className="w-full ">
        <input
          type="text"
          value={searchText}
          className="w-full px-6 py-3 font-medium text-zinc-700 rounded-full shadow-lg my-4"
          onChange={handleSearchChange}
          placeholder="Search for quotes or tags"
          required
        />
      </form>

      <div className="space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {filteredPosts.map((post: PostType) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};
