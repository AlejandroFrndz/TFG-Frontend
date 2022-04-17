import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "src/redux/auth/actions";

export const AccountContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (): void => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <Button onClick={handleLogOut} shape={"round"}>
        Log Out
      </Button>
    </>
  );
};
