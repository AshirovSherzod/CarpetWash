import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useSigninMutation } from "../../context/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signIn, { data, isLoading, isSuccess, isError }] = useSigninMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.refresh_token));
      navigate("/admin/company");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      error();
    }
  }, [isError]);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Username or password is inccorect",
    });
  };

  const onFinish = (values) => {
    console.log(values);
    signIn(values);
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center  justify-center">
      {contextHolder}
      <Form
        className="w-[450px] flex flex-col gap-[20px]"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input style={{ border: "1px solid #232627", outline: "none" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            style={{ border: "1px solid #232627", outline: "none" }}
          />
        </Form.Item>

        <Form.Item className="">
          <Button
            style={{ backgroundColor: "#232627" }}
            loading={isLoading}
            className="w-[100%] "
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
