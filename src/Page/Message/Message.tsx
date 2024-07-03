import { useNavigate } from "react-router-dom";
import { MessageChat } from "./MessageChat";
import { MessageSidebar } from "./MessageHeader";
import { GrFormPreviousLink } from "react-icons/gr";
import { useState } from "react";

export interface User {
  id: number;
  avatar_user: string;
  username: string;
}

export const Message = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handlerBack = () => {
    navigate(-1);
  };

  return (
    <section className="md:h-[700px] flex mt-5 gap-2 p-2">
      <div className="icon-back hidden md:block" onClick={handlerBack}>
        <button className="border rounded-xl shadow-md">
          <GrFormPreviousLink size={32} color="#333" />
        </button>
      </div>
      <div className=" h-full w-[200px] md:w-[300px]">
        <MessageSidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <div className="w-[700px]">
        <MessageChat selectedUser={selectedUser} />
      </div>
    </section>
  );
};
