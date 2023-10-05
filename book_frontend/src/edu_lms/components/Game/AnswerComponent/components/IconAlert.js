import React from "react";

const checkIcon = {
  success: {
    img: "/assets/img/laugh.png",
  },
  medium: {
    img: "/assets/img/fun.png",
  },
  rather: {
    img: "/assets/img/sad.png",
  },
  error: {
    img: "/assets/img/cry.png",
  },
};

export default function IconAlert({ alertDefault }) {
  return (
    <div className="text-right w-100">
      <img src={checkIcon[alertDefault].img} className="w-100" />
    </div>
  );
}
