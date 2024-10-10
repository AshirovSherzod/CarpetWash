import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "../../../context/api/userApi";
import img from "../../../assets/profile-img.png";
import { GoGitBranch, GoPerson } from "react-icons/go";
import { PiUserFocusFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Input, message, Form, Modal, Button } from "antd";
import { useGetValue } from "../../../hooks/useGetValue";
import { setUser } from "../../../context/slices/authSlice";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Profile = () => {
  const { data, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdate, isSuccess, isError }] =
    useUpdateProfileMutation();
  const [
    updatePassword,
    { isSuccess: isSuccessPassword, isError: isErrorPassword },
  ] = useUpdatePasswordMutation();

  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const { formData, handleChange } = useGetValue(initialState);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      message.success("Profile created successfully");
      refetch();
      setEditProfileModal(false);
    }
    if (isError) {
      message.error("Something went wrong");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessPassword) {
      message.success("Password updated successfully");
      setEditPasswordModal(false);
    }
    if (isErrorPassword) {
      message.error("Something went wrong");
    }
  }, [isSuccessPassword, isErrorPassword]);

  useEffect(() => {
    setFullName(data?.full_name);
    setUsername(data?.username);
    setPhoneNumber(data?.phone_number);
  }, [data]);

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    let newData = {
      full_name: fullName,
      password_hash: password,
      phone_number: phoneNumber,
      username: username,
    };
    updateProfile(newData);
    setPassword("");
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      let newPassword = {
        new_password: formData.confirmPassword,
        old_password: formData.currentPassword,
      };
      updatePassword(newPassword);
    } else {
      message.warning("newly entered passwords do not match each other");
    }
  };

  return (
    <div
      style={{ width: "calc(100% - 20px)" }}
      className="flex flex-col gap-[20px] mt-[30px] mx-[10px]"
    >
      <div className=" flex flex-row gap-[20px]">
        <button
          onClick={() => setEditProfileModal(true)}
          className=" w-[120px] h-[35px] bg-[rgb(35,38,39)] text-white text-[14px] rounded-[8px] border-[1px]"
        >
          Edit Profile
        </button>
        <button
          onClick={() => setEditPasswordModal(true)}
          className=" w-[120px] h-[35px] bg-[#232627] text-white text-[14px] rounded-[8px]"
        >
          Edit Password
        </button>
      </div>

      <Modal
        visible={editProfileModal}
        // onOk={handleEditProfileOk}
        onCancel={() => setEditProfileModal(false)}
        title="Edit Profile"
        footer={false}
      >
        <form action="" className="space-y-4" onSubmit={handleSubmitProfile}>
          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <Input.Password
              id="currentPassword"
              name="currentPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone_number"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdate}
            style={{
              backgroundColor: "#232627",
              borderColor: "#232627",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </form>
      </Modal>

      <Modal
        visible={editPasswordModal}
        onCancel={() => setEditPasswordModal(false)}
        title="Edit Password"
        footer={false}
      >
        <form action="" className="space-y-4" onSubmit={handleSubmitPassword}>
          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <Input.Password
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
              style={{ outline: "none", border: "1px solid gray" }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <Input.Password
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
              style={{ outline: "none", border: "1px solid gray" }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <Input.Password
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e)}
              className="border border-gray-300 rounded-lg p-2 h-[32px] focus:border-[#232627] focus:ring-0 outline-none"
              style={{ outline: "none", border: "1px solid gray" }}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#232627",
              borderColor: "#232627",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </form>
      </Modal>

      <div className="flex flex-row h-[400px] bg-white gap-[20px] py-[30px] px-[20px] border-[2px] rounded-[5px]">
        <div className="h-[200px] w-[200px] flex">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <GoPerson />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {data?.full_name}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <PiUserFocusFill />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {data?.username}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <GoGitBranch />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {data?.role}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <FaPhone />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {data?.phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
