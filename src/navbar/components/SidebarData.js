import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "My Journal",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "Feel low?",
    path: "/Music",
    icon: <IoIcons.IoIosMusicalNotes />,
    cName: "nav-text",
  },
];
