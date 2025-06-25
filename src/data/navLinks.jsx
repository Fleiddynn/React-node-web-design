import Anasayfa from "../pages/Anasayfa";
import Hakkimizda from "../pages/Hakkimizda";
import Iletisim from "../pages/Iletisim";
import SinglePostPage from "../pages/SinglePostPage.jsx";
import Mezunlarimiz from "./../pages/Mezunlarimiz.jsx";
import Egitimler from "./../pages/egitimler/Egitimler.jsx";
import GumrukEgitimleri from "./../pages/egitimler/GumrukEgitimleri.jsx";
import GuncelEgitimler from "./../pages/egitimler/GuncelEgitimler.jsx";
import LojistikEgitimleri from "./../pages/egitimler/LojistikEgitimleri.jsx";
import SehirEgitimleri from "./../pages/egitimler/SehirEgitimleri.jsx";
import UzmanlikEgitimleri from "./../pages/egitimler/UzmanlikEgitimleri.jsx";
import YetkinlikEgitimleri from "./../pages/egitimler/YetkinlikEgitimleri.jsx";

export const navLinks = [
  { to: "/", label: "Anasayfa", component: <Anasayfa /> },
  { to: "/hakkimizda", label: "Hakkımızda", component: <Hakkimizda /> },
  { to: "/iletisim", label: "İletişim", component: <Iletisim /> },
  { to: "/mezunlarimiz", label: "Mezunlarımız", component: <Mezunlarimiz /> },
  {
    group: "Eğitimler",
    to: "/egitimler",
    component: <Egitimler />,
    children: [
      {
        to: "/egitimler/guncel",
        label: "Güncel Eğitimler",
        component: <GuncelEgitimler />,
      },
      {
        to: "/egitimler/uzmanlik",
        label: "Uzmanlık Eğitimleri",
        component: <UzmanlikEgitimleri />,
      },
      {
        to: "/egitimler/lojistik",
        label: "Lojistik Eğitimleri",
        component: <LojistikEgitimleri />,
      },
      {
        to: "/egitimler/gumruk",
        label: "Gümrük Eğitimleri",
        component: <GumrukEgitimleri />,
      },
      {
        to: "/egitimler/sehir",
        label: "Şehir Eğitimleri",
        component: <SehirEgitimleri />,
      },
      {
        to: "/egitimler/Yetkinlik",
        label: "Yetkinlik Eğitimleri",
        component: <YetkinlikEgitimleri />,
      },
    ],
  },
];
