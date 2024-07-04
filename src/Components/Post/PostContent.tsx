import React from "react";

const PostContent: React.FC<{ post: any }> = ({ post }) => {
  return (
    <div className="mt-4">
      {post.media_file.length === 0 ? (
        <div className="flex items-center justify-center bg-gray-200 h-[320px] rounded-md p-4 overflow-hidden">
          <p className="text-lg text-gray-700 break-words overflow-wrap">
            {post.content}
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-700 mb-4 break-words overflow-wrap">
            {post.content}
          </p>
          <div
            className={`grid gap-4 ${
              post.media_file.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {post.media_file.map((imagePost: string, index: number) => (
              <img
                src={imagePost}
                alt="image_post"
                key={imagePost}
                className={`rounded-md object-cover h-full ${
                  post.media_file.length === 1 ? "mx-auto" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostContent;
