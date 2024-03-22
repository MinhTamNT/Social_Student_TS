import { useState } from "react";

interface ISearchItem {
  title: string;
  description: string;
  imagePost: string;
  userPost: string;
  imageUser: string;
}

export const SearchItem = () => {
  const [searchItem, setSearchItem] = useState<ISearchItem[]>([
    {
      title: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagePost:
        "https://b.thumbs.redditmedia.com/m7J6KTQu4T3MVjnkJjtIafxiyF96WovSbAtNOy0n6FI.jpg",
      userPost: "Minh Tam",
      imageUser:
        "https://as1.ftcdn.net/v2/jpg/02/57/03/98/1000_F_257039885_FYZdzR6EjlrUAz6yxcwTxwp3TtVyN1JT.jpg",
    },
    {
      title: "Dolor sit amet",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imagePost:
        "https://b.thumbs.redditmedia.com/m7J6KTQu4T3MVjnkJjtIafxiyF96WovSbAtNOy0n6FI.jpg",
      userPost: "CR7",
      imageUser:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIY8AOITs8a2do2yq2wT0zd-SdgEtRoNyZmQg6XThnBe4-lH-Lu9yiKO0wSU9McQ-zbBA&usqp=CAU",
    },
    // Add more search items as needed
  ]);

  return (
    <div className="w-[520px] p-4 bg-[#f9fafa] rounded-lg max-h-[calc(100vh - 56px - 25px)] overflow-y-auto">
      {searchItem.map((search, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb- cursor-pointer border-b-[1px] mb-2 hover:bg-gray-200  p-2 transition-colors duration-300"
        >
          <div className="w-[250px]">
            <p>{search.title}</p>
            <p className="text-13 text-text-natural">{search.description}</p>
            <div className="flex items-center gap-2">
              <img
                src={search.imageUser}
                className="rounded-full w-10 h-10 object-cover"
                alt="User"
              />
              <p>{search.userPost}</p>
            </div>
          </div>
          <div>
            <img
              src={search.imagePost}
              className="w-[96px] h-[72px] object-cover rounded-xl"
              alt="Post"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
