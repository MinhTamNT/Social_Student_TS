import React from "react";
import Comment from "./Comment";

const CommentList: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <Comment
          author="Michael Gough"
          date="2022-02-08"
          content="Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy."
        />
      </div>
    </section>
  );
};

export default CommentList;
