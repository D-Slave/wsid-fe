import { VideoCameraOutlined, ShopOutlined, CoffeeOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import type { Category } from "@/components/main/constants/Category";

export const Categories: Category[] = [
  {
    key: "영화",
    label: "영화",
    icon: VideoCameraOutlined,
    iconStyle: { fontSize: 20, color: "#5F5CF1" },
    path: "/recommend/movie",
    bg: "#EEF0FF",
  },
  {
    key: "맛집",
    label: "맛집",
    icon: ShopOutlined,
    iconStyle: { fontSize: 20, color: "#5F5CF1" },
    path: "/recommend/food",
    bg: "#EEF0FF",
  },
  {
    key: "카페",
    label: "카페",
    icon: CoffeeOutlined,
    iconStyle: { fontSize: 20, color: "#5F5CF1" },
    path: "/recommend/cafe",
    bg: "#EEF0FF",
  },
  {
    key: "음악",
    label: "노래",
    icon: CustomerServiceOutlined,
    iconStyle: { fontSize: 20, color: "#5F5CF1" },
    path: "/recommend/music",
    bg: "#EEF0FF",
  },
];


