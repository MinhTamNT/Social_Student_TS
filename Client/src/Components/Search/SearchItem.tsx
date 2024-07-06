import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import { User } from "../../Page/Message/MessageHeader";

interface ISearchItem {
  content: string;
  user: User;
  imagePost: string;
}

interface SearchItemProps {
  searchQuery: string; // Prop to receive search query from parent component
}

export const SearchItem: React.FC<SearchItemProps> = ({ searchQuery }) => {
  const [searchItem, setSearchItem] = useState<ISearchItem[]>([]);
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );

  useEffect(() => {
    const findthePost = async () => {
      try {
        const res = await AuthAPI(auth?.access_token).get(
          endpoints["search-post"](searchQuery)
        );
        setSearchItem(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (auth?.access_token && searchQuery) {
      findthePost(); // Trigger the initial fetch when searchQuery changes
    }
  }, [auth?.access_token, searchQuery]);

  return (
    <div className="w-[520px] p-4 bg-[#f9fafa] rounded-lg max-h-[calc(100vh - 56px - 25px)] overflow-y-auto">
      {searchItem.map((search, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-2 cursor-pointer border-b-[1px]  hover:bg-gray-200 p-2 transition-colors duration-300"
        >
          <div className="w-[250px]">
            <p className="text-13 text-text-natural">{search.content}</p>
            <div className="flex items-center gap-2">
              {search.user && (
                <img
                  src={search.user.avatar_user}
                  className="rounded-full w-10 h-10 object-cover"
                  alt="User"
                />
              )}
              <p>{search.user.username}</p>
            </div>
          </div>
          {search.imagePost && (
            <div>
              <img
                src={search.imagePost}
                className="w-[96px] h-[72px] object-cover rounded-xl"
                alt="Post"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
