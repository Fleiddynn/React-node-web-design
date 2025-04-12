import Anasayfa from "../pages/Anasayfa";
import Hakkimizda from "../pages/Hakkimizda";
import Iletisim from "../pages/Iletisim";
import SinglePostPage from "../pages/SinglePostPage.jsx";
import Mezunlarimiz from "./../pages/Mezunlarimiz.jsx";

export const navLinks = [
  { to: "/", label: "Anasayfa", component: <Anasayfa /> },
  { to: "/hakkimizda", label: "Hakkımızda", component: <Hakkimizda /> },
  { to: "/iletisim", label: "İletişim", component: <Iletisim /> },
  {
    to: "/singlepostpage",
    label: "Single Post Page",
    component: <SinglePostPage />,
  },
  {
    to: "/mezunlarimiz",
    label: "Mezunlarımız",
    component: <Mezunlarimiz />,
  },
];
