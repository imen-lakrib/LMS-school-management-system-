import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useUpdateMyAccountMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {
  avatar: string | null;
  user: any;
};
const avatarDefault = "/assets/img.png";

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateMyAccount, { isSuccess: successAccount, error: errorAccount }] =
    useUpdateMyAccountMutation();

  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, {
    skip: !loadUser,
  });
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatarFile = fileReader.result;
        console.log("avatarFile", avatarFile);
        updateAvatar({
          avatar: avatarFile?.toString(),
        });
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || successAccount) {
      setLoadUser(true);
    }
    if (error || errorAccount) {
      console.log(error);
    }

    if (successAccount) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, successAccount, errorAccount]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateMyAccount({ name });
    }
  };

  return (
    <>
      <div className="!w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar
                ? user.avatar.url
                : avatar
                ? avatar || avatar
                : avatarDefault
            }
            width={10}
            height={10}
            alt=""
            className="w-[120px] h-[120px]  cursor-pointer rounded-full border-[3px] border-[#37a39a] "
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute top-20 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>

      <br />
      <br />

      <div className="!w-full pl-6 800px:pl-10 text-left">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className={`block ${styles.textColorWhite}`}>
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-4">
              <label className={`block  ${styles.textColorWhite}`}>
                Email Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>

            <input
              type="submit"
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center ${styles.textColorWhite} rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
