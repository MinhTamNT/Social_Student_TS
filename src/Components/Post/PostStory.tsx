import { CiSquarePlus } from "react-icons/ci";

export const PostStory = () => {
  const userStory = [
    {
      id: 1,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 5,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 9,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 10,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 11,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 13,
      user: {
        name: "Marshall",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473982ukb/mau-hinh-anh-dai-dien-facebook-vui-ve-hanh-phuc-31.jpg",
    },
    {
      id: 2,
      user: {
        name: "Minh Tam",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage: null, // Không có storyImage
    },
    {
      id: 3,
      user: {
        name: "Minh Tam",
        image:
          "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
      },
      storyImage: null, // Không có storyImage
    },
  ];

  return (
    <div className="w-full flex h-[150px]  rounded-lg">
      <div className="w-full flex gap-3 overflow-auto ">
        <div className="w-[100px] h-full border border-neutral-600 rounded-lg">
          <div className="user relative">
            <img
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
              className="object-cover w-[150px] h-[120px] rounded-lg"
              alt="User Image"
            />
            <button className="absolute bottom-[-9px] left-[40%] ">
              <CiSquarePlus className="" size={24} color="black" />
            </button>
            <span className="absolute bottom-[-26px] text-13 font-bold left-6  text-red-color">
              Create
            </span>
          </div>
        </div>
        {userStory.length > 0 ? (
          userStory.map((story) => (
            <div
              key={story.id}
              className="w-[100px] h-full relative cursor-pointer"
            >
              {/* Kiểm tra nếu có storyImage */}
              {story.storyImage && (
                <>
                  <img
                    src={story.storyImage}
                    alt="Story Image"
                    className=" w-[150px]  h-full object-cover rounded-lg"
                  />
                  <div>
                    <img
                      src={story.user.image}
                      alt="User Image"
                      className="w-5 h-5 top-2 absolute left-1 rounded-full border object-cover border-red-color"
                    />
                    <h4 className="text-14 absolute bottom-2 text-white font-bold text-center left-5">
                      {story.user.name}
                    </h4>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">Không có câu chuyện.</p>
        )}
      </div>
    </div>
  );
};
