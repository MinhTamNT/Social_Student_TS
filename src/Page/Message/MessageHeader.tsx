import React from "react";

export interface User {
  id: number;
  avatarUser: string;
  name: string;
}

interface Props {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const MessageSidebar: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const listUser: User[] = [
    {
      id: 1,
      avatarUser: "https://via.placeholder.com/40",
      name: "John Doe",
    },
    {
      id: 2,
      avatarUser: "https://via.placeholder.com/40",
      name: "Jane Smith",
    },
    {
      id: 3,
      avatarUser: "https://via.placeholder.com/40",
      name: "Alice Johnson",
    },
  ];

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
                src={user.avatarUser}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <h2 className="text-16 font-semibold hidden md:block">
                  {user.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
