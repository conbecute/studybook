import { Tools } from "../../libs/react-sketch";

export const DEFAULT_BOOK_TOOLS = [
  {
    id: "booktool-pointer",
    placement: "left",
    text: "Con trỏ",
    icon: "fa fa-mouse-pointer",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.None,
        placement: "left",
        text: "Con trỏ",
        icon: "fa fa-mouse-pointer",
        background: "#f8f9fa",
      },
    ],
  },
  {
    id: "booktool-pencil",
    placement: "left",
    text: "Chọn bút vẽ",
    icon: "fa fa-pencil",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.Pencil,
        placement: "left",
        text: "Bút vẽ",
        icon: "fa fa-pencil",
        background: "#f8f9fa",
      },
      {
        id: Tools.Highlight,
        placement: "left",
        text: "Đánh dấu",
        icon: "fa fa-paint-brush",
        background: "#f8f9fa",
      },
    ],
  },
  {
    id: "booktool-eraser",
    placement: "left",
    text: "Xóa",
    icon: "fa fa-eraser",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.Eraser,
        placement: "left",
        text: "Xóa",
        icon: "fa fa-eraser",
        background: "#f8f9fa",
      },
      {
        id: Tools.EraserAll,
        placement: "left",
        text: "Xóa hết",
        icon: "fa fa-trash",
        background: "#f8f9fa",
      },
    ],
  },
  {
    id: "booktool-text",
    placement: "left",
    text: "Chọn công cụ text",
    icon: "fa fa-font",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.Text,
        placement: "left",
        text: "Văn bản",
        icon: "fa fa-font",
        background: "#f8f9fa",
      },
      {
        id: Tools.Link,
        placement: "left",
        text: "Hyperlink",
        icon: "fa fa-link",
        background: "#f8f9fa",
      },
    ],
  },
  {
    id: "booktool-shape",
    placement: "left",
    text: "Chọn hình vẽ",
    icon: "fa fa-minus",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.Line,
        placement: "left",
        text: "Đoạn thẳng",
        icon: "fa fa-minus",
        background: "#f8f9fa",
      },
      {
        id: Tools.Rectangle,
        placement: "left",
        text: "Hình tứ giác",
        icon: "fa fa-square-o",
        background: "#f8f9fa",
      },
      {
        id: Tools.Circle,
        placement: "left",
        text: "Hình tròn",
        icon: "fa fa-circle-thin",
        background: "#f8f9fa",
      },
    ],
  },
  {
    id: "booktool-hide",
    placement: "left",
    text: "Công cụ ẩn",
    icon: "fa fa-low-vision",
    background: "#f8f9fa",
    children: [
      {
        id: Tools.HideOfPart,
        placement: "left",
        text: "Ẩn một phần",
        icon: "fa fa-low-vision",
        background: "#f8f9fa",
      },
      {
        id: Tools.IsoPartOfScreen,
        placement: "left",
        text: "Xem một phần",
        icon: "fa fa-window-maximize",
        background: "#f8f9fa",
      },
    ],
  },
];
