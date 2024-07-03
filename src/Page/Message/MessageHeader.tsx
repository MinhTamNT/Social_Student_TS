import React, { useEffect, useState } from "react";
import { AuthAPI, endpoints } from "../../Service/ApiConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export interface User {
  id: number;
  avatar_user: string;
  username: string;
}

interface Props {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const MessageSidebar: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [listUser, setListUser] = useState<User[]>([]);
  const auth = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  useEffect(() => {
    const getAllUser = async () => {
      const res = await AuthAPI(auth?.access_token).get(
        endpoints["get-all-user"]
      );
      setListUser(res.data);
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
    };
    getAllUser();
  }, []);
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="">
      <div className="header-message p-2">
        <h5 className="text-xl font-semibold">Message</h5>
      </div>
      <div className=" h-full  rounded-md p-2 bg-white text-black shadow-md">
        <div className="flex flex-col p-2">
          {listUser.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-2 mb-2 gap-2 cursor-pointer ${
                selectedUser?.id === user.id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleUserClick(user)}
            >
              <img
                src={user.avatar_user}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <h2 className="text-16 font-semibold hidden md:block">
                  {user.username}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
