"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useEffect, useState } from "react";
const viewportRef = useRef<HTMLDivElement | null>(null);

const [isMobile, setIsMobile] = useState(false);
const [scale, setScale] = useState(1);
const [tx, setTx] = useState(0);
const [ty, setTy] = useState(0);

const pointers = useRef(new Map<number, { x: number; y: number }>());
const lastPan = useRef<{ x: number; y: number } | null>(null);
const lastPinch = useRef<{ dist: number; baseScale: number } | null>(null);

const [isMobile, setIsMobile] = useState(false);

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const toLocal = (clientX: number, clientY: number) => {
  const el = viewportRef.current;
  if (!el) return { x: clientX, y: clientY };
  const r = el.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
};

const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  const p = toLocal(e.clientX, e.clientY);
  pointers.current.set(e.pointerId, p);

  if (pointers.current.size === 1) {
    lastPan.current = p;
    lastPinch.current = null;
  } else if (pointers.current.size === 2) {
    const arr = Array.from(pointers.current.values());
    const dx = arr[0].x - arr[1].x;
    const dy = arr[0].y - arr[1].y;
    lastPinch.current = { dist: Math.hypot(dx, dy), baseScale: scale };
    lastPan.current = null;
  }
};

const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  if (!pointers.current.has(e.pointerId)) return;
  const p = toLocal(e.clientX, e.clientY);
  pointers.current.set(e.pointerId, p);

  // pinch
  if (pointers.current.size === 2 && lastPinch.current) {
    const arr = Array.from(pointers.current.values());
    const dx = arr[0].x - arr[1].x;
    const dy = arr[0].y - arr[1].y;
    const dist = Math.hypot(dx, dy);
    const ratio = dist / (lastPinch.current.dist || dist);
    setScale(clamp(lastPinch.current.baseScale * ratio, 0.9, 3.2));
    return;
  }

  // pan
  if (pointers.current.size === 1 && lastPan.current) {
    const dx = p.x - lastPan.current.x;
    const dy = p.y - lastPan.current.y;
    lastPan.current = p;
    setTx((v) => v + dx);
    setTy((v) => v + dy);
  }
};

const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
  pointers.current.delete(e.pointerId);
  lastPan.current = null;
  lastPinch.current = null;

  if (pointers.current.size === 1) {
    lastPan.current = Array.from(pointers.current.values())[0];
  }
};

const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  // desktop zoom
  e.preventDefault();
  const step = e.deltaY > 0 ? 0.92 : 1.08;
  setScale((s) => clamp(s * step, 0.9, 3.2));
};

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

useEffect(() => {
  const mobile = window.innerWidth < 768;
  setIsMobile(mobile);

  // ✅ zoom initial mobile (tu peux changer 1.6)
  if (mobile) {
    setScale(1.6);
    setTx(-180); // décalage initial (à ajuster)
    setTy(-120); // décalage initial (à ajuster)
  } else {
    setScale(1);
    setTx(0);
    setTy(0);
  }
}, []);

type Zone = {
  id: string;
  points: string;
  famille: string;
  origine: string;
  habitat: string;
  taille: string;
  poids: string;
  longévité: string;
  IUCN: string;
  image: string;
};

type InfoProps = {
  label: string;
  value: string;
};

const IMAGE_W = 2048;
const IMAGE_H = 1330;

const ZONES: Zone[] = [
  {
    id: "Cerf de Bactriane",
    points: "1772,883 1911,903 1937,975 1788,1012 1727,944 1763,913 1772,885",
    famille: "Cervidae",
    origine: " Turkestan, Afghanistan",
    habitat: "Forêts au bord des rivières ",
    taille: "mâles de 180 à 205 cm - femelles de 165 à 280 cm ",
    poids: " mâles de 110 à 220 kg - femelles de 75 à 120 kg ",
    longévité: " 18 ans",
    IUCN: " Non menacé au niveau spécifique",
    image: "/pictures/cerf-de-bactriane.jpg",
  },

  {
    id: "Okapi",
    points:
      "1531,859 1533,901 1478,899 1509,944 1571,971 1685,939 1738,881 1723,856 1531,859",
    famille: " Bovidae",
    origine: "Afrique occidentale et centrale ",
    habitat: "forêt de basse altitude ",
    taille: "200 à 235 cm ",
    poids: "mâles de 240 à 405 kg kg - femelles de 210 à 253 kg ",
    longévité: "20 ans ",
    IUCN: " En danger critique",
    image: "/pictures/okapi.jpg",
  },
  {
    id: "Hippopotame pygmée",
    points:
      "1558,805 1528,812 1531,831 1521,848 1525,854 1722,853 1704,820 1626,799 1624,821 1602,828 1576,821 1560,807",
    famille: " Hippopotamidés",
    origine: "Pointe Ouest de l'Afrique",
    habitat: "Zones boisées proches de marécages et points d'eau ",
    taille: " 1,50 à 1,75 m",
    poids: " 160 à 275 kg",
    longévité: "43 ans en parc zoologique - Inconnu dans la nature ",
    IUCN: " En Danger",
    image: "/pictures/hippopotame-nain.jpg",
  },
  {
    id: "Faux-gavial d'Afrique",
    points:
      "1566,767 1554,779 1556,800 1576,816 1608,825 1623,810 1618,789 1601,774 1582,767 1569,768",
    famille: "Crocodylidés ",
    origine: "Centre de l'Afrique ",
    habitat: " Grandes rivières, lacs, eaux densément végétalisés",
    taille: "3 à 4 m ",
    poids: " 200 kg",
    longévité: "32 à 38 ans en parc zoologique - Inconnu dans la nature ",
    IUCN: "En danger critique ",
    image: "/pictures/faux-gavial.jpg",
  },
  {
    id: "Oryctérope",
    points:
      "1476,782 1453,795 1449,821 1466,844 1496,853 1518,843 1527,821 1517,799 1495,783 1478,780",
    famille: " Orycteropodidés",
    origine: "Afrique Subsaharienne ",
    habitat:
      "Nombreux habitats différents : prairies, savanes, forêts ",
    taille: "100 à 158 cm ",
    poids: "40 à 80 kg ",
    longévité: " 18 ans dans la nature - 23 ans en parc zoologique",
    IUCN: "Non menacé ",
    image: "/pictures/orycteropes.jpg",
  },
  {
    id: "Macaque à crète",
    points: "1461,914 1345,910 1345,966 1476,974 1460,937 1462,915",
    famille: " Cercopithecidae",
    origine: "Indonésie ",
    habitat: "Forêt tropicale de montagne ",
    taille: "45 à 60 cm ",
    poids: " mâles : 10 kg - femelles : 5,5 kg",
    longévité: "18 ans dans la nature, 34 ans en zoo ",
    IUCN: " En danger critique d'extinction",
    image: "/pictures/macaque-a-crete.jpg",
  },
  {
    id: "Tapir malais",
    points: "1342,910 1344,967 1223,966 1220,934 1251,907 1341,910",
    famille: " Tapiridae",
    origine: " Indonésie, Malaisie, Thaïlande",
    habitat: "Forêt tropicale marécageuse ",
    taille: "1,8 à 2,5 m ",
    poids: " mâles : 250 kg femelles : 350 kg",
    longévité: "30 ans ",
    IUCN: " En danger",
    image: "/pictures/tapir-malais.jpg",
  },
  {
    id: "Casoar à casque",
    points: "1213,843 1214,860 1314,849 1343,820 1306,809 1217,839",
    famille: "Casuariidae ",
    origine: " Nouvelle Guinée, Nord-Est de l'Australie",
    habitat: " Forêts tropicales denses",
    taille: "170 cm ",
    poids: "50 à 85 kg ",
    longévité: "30 ans ",
    IUCN: " Non menacé",
    image: "/pictures/casoar-a-casque.jpg",
  },
  {
    id: "Mouton de Ouessant",
    points: "1208,735 1174,809 1201,822 1261,796 1240,739 1207,736",
    famille: "Bovidae ",
    origine: " Île d'Ouessant (Bretagne)",
    habitat: " Pâturages et marais salants",
    taille: " 40 à 50 cm au garrot",
    poids: "11 à 20 kg ",
    longévité: "12 ans ",
    IUCN: " non classé car domestique",
    image: "/pictures/mouton-d-ouessant.jpg",
  },
  {
    id: "Nandou de Darwin et vigogne",
    points:
      "1217,599 1152,615 1138,640 1166,665 1184,663 1196,675 1231,676 1272,647 1264,613 1219,600",
    famille: "Rheidae ",
    origine: "Amérique du Sud ",
    habitat: "Plateaux et plaines arides ",
    taille: " 92 à 100 cm",
    poids: "15 à 25 kg ",
    longévité: "10 ans ",
    IUCN: "Préoccupation mineure ",
    image: "/pictures/nandou-de-darwin.jpg",
  },
  {
    id: "Girafe du Kordofan",
    points: "1354,691 1316,719 1348,784 1422,780 1409,723 1357,693",
    famille: "Giraffidés ",
    origine: " Afrique centrale",
    habitat: "Savane ",
    taille: "Mâles 5,7m - Femelles 5m ",
    poids: "Mâles : 1100 à 1900 kg - Femelles : 950 à 1100 kg ",
    longévité: "25 ans dans la nature - 36 ans en parc zoologique ",
    IUCN: " En danger critique",
    image: "/pictures/girafes-du-kordofan.jpg",
  },
  {
    id: "Flamant rouge",
    points: "1554,693 1564,736 1642,731 1620,664 1554,693",
    famille: " Phoenicopteridae",
    origine: "Caraïbes ",
    habitat: "Lacs et lagunes ",
    taille: " 120 à 145 cm",
    poids: " 2 à 4 kg",
    longévité: "40 ans ",
    IUCN: "Préoccupation mineure ",
    image: "/pictures/flamant-rouge.jpg",
  },

  {
    id: "Alpaga",
    points: "1864,621 1836,638 1842,676 1887,680 1866,625",
    famille: " Camelidae",
    origine: "Andes du Pérou à l'Argentine ",
    habitat: "Savanes et prairies d'altitude ",
    taille: "114 à 150 cm ",
    poids: "55 à 65 kg ",
    longévité: "15 à 20 ans ",
    IUCN: " non menacé",
    image: "/pictures/alpaga.jpg",
  },
  {
    id: "Baudet du Poitou",
    points:
      "1806,606 1781,604 1761,616 1764,642 1788,667 1815,669 1824,627 1809,605",
    famille: " Equidae",
    origine: "Marais poitevin ",
    habitat: "En élevage uniquement",
    taille: "140 - 155 cm ",
    poids: " 350 - 450 kg",
    longévité: "30 à 50 ans",
    IUCN: " non classé car domestique mais race devenue rare",
    image: "/pictures/baudet-du-poitou.jpg",
  },
  {
    id: "Chèvre naine",
    points: "1785,547 1765,545 1765,594 1810,595 1808,548 1786,548",
    famille: " Bovidae",
    origine: "Sénégal et Tibet ",
    habitat: "espèce domestique ",
    taille: "50 cm ",
    poids: " mâle 17-30 kg, femelle 12-20 kg",
    longévité: "14 ans ",
    IUCN: " non classé car domestique",
    image: "/pictures/chevre-naine.jpg",
  },
  {
    id: "Cercopithèque roloway",
    points: "1361,585 1339,598 1370,618 1395,605 1361,585",
    famille: "Cercopithecidae ",
    origine: "Afrique de l'Ouest ",
    habitat: "Forêts pluviales primaires ",
    taille: "mâles 50 à 60 cm - femelles 42 à 45 cm ",
    poids: "mâles 5 kg - femelles 4 kg ",
    longévité: "30 ans ",
    IUCN: "En danger critique d'extinction ",
    image: "/pictures/cercopitheque-roloway.jpg",
  },

  {
    id: "Zèbre de Grévy",
    points: "1538,582 1525,604 1576,640 1634,648 1625,594 1538,582",
    famille: "Equidae ",
    origine: "Afrique orientale ",
    habitat: "Savanes sèches et arides ",
    taille: " 250 à 275 cm",
    poids: "350 à 450 kg ",
    longévité: " 18 ans",
    IUCN: " en danger",
    image: "/pictures/zebre-de-grevy.jpg",
  },
  {
    id: "Tamarin empereur",
    points: "1461,586 1412,593 1461,625 1493,606 1461,586",
    famille: " Callithrichidae",
    origine: "Haut Amazone ",
    habitat: " Forêts tropicales",
    taille: "23 à 26 cm ",
    poids: "400 à 550 g ",
    longévité: " 20 ans",
    IUCN: "Préoccupation mineure ",
    image: "/pictures/tamarin-empereur.jpg",
  },
  {
    id: "Panda roux",
    points: "1285,471 1228,474 1252,519 1317,509 1287,472",
    famille: " Ailuridae",
    origine: "Sud-est asiatique",
    habitat: "Forêts tempérées mixtes de chênes, sapins et bambous",
    taille: " 51 à 73 cm + 28 à 49 cm de queue",
    poids: "3 à 6 kg ",
    longévité: "10 an dans la nature, 13 en captivité ",
    IUCN: " vulnérable",
    image: "/pictures/panda-roux.jpg",
  },
  {
    id: "Loup à crinière",
    points: "1226,461 1160,436 1157,480 1170,498 1224,479 1225,465",
    famille: "Canidae",
    origine: "Amérique du Sud",
    habitat: "Prairies d'herbes hautes",
    taille: "95 à 115 cm",
    poids: "20 à 30 kg",
    longévité: "15 ans en captivité",
    IUCN: "quasi-menacé",
    image: "/pictures/loup-a-criniere.jpg",
  },
  {
    id: "Ara à gorge bleue",
    points: "1142,476 1166,510 1098,547 1056,504 1137,476",
    famille: "Psittacidae",
    origine: "Bolivie",
    habitat: "Savanes inondées et forêts tropicales accidentées",
    taille: "85 cm",
    poids: "600 à 800 g",
    longévité: "80 ans",
    IUCN: "En danger critique d'extinction",
    image: "/pictures/ara-a-gorge-bleue.jpg",
  },
  {
    id: "Manchot du Cap",
    points: "1087,660 1109,688 1138,691 1144,652 1088,658",
    famille: "Spheniscidae",
    origine: "Sud de l'Afrique",
    habitat: "Côtes et îles côtières",
    taille: "68 à 70 cm",
    poids: "3 kg",
    longévité: "11 ans",
    IUCN: "En danger",
    image: "/pictures/manchot-du-cap.jpg",
  },
  {
    id: "Ibis rouge",
    points: "1083,659 1047,681 1047,715 1145,723 1150,697 1107,693 1083,661",
    famille: "Threskiornitidae",
    origine: "Nord de l'Amérique du sud",
    habitat: "Zones humides",
    taille: "60 cm",
    poids: "772 à 935 g",
    longévité: "16 ans",
    IUCN: "Non menacée",
    image: "/pictures/ibis-rouge.jpg",
  },
  {
    id: "Chameau de Bactriane",
    points:
      "72,940 115,962 134,964 178,947 190,932 228,935 231,838 220,830 72,940",
    famille: "Camelidae",
    origine: "Asie centrale",
    habitat: "Steppes sèches",
    taille: "320 à 350 cm",
    poids: "450 à 500 kg",
    longévité: "35 ans",
    IUCN: "en danger critique d'extinction",
    image: "/pictures/chameau-de-bactriane.jpg",
  },
  {
    id: "Kulan",
    points: "238,933 360,904 363,896 355,870 353,827 241,834 239,936",
    famille: "Equidae",
    origine: "Turkménistan, Kazakhstan, Ouzbékistan",
    habitat: "Déserts, dunes",
    taille: "200 à 250 cm",
    poids: "200 à 260 kg",
    longévité: "14 ans dans la nature, 26 ans en captivité",
    IUCN: "En danger",
    image: "/pictures/kulan.jpg",
  },
  {
    id: "Boeuf musqué",
    points:
      "240,1188 330,1064 346,1068 363,1068 370,1085 399,1088 425,1112 446,1110 466,1126 474,1161 500,1164 514,1184 505,1215 313,1211 241,1190",
    famille: "Bovidae",
    origine: "Canada, Groenland",
    habitat: "toundra arctique",
    taille: "190 à 230 cm",
    poids: "200 à 410 kg (mâles 25% plus grands et lourds)",
    longévité: "20 ans",
    IUCN: "non menacé",
    image: "/pictures/boeuf-musque.jpg",
  },
  {
    id: "Renard polaire",
    points:
      "368,1057 374,1048 411,1043 418,1031 479,1024 491,1043 503,1063 500,1089 484,1099 468,1112 463,1102 445,1097 439,1086 408,1080 392,1079 367,1059",
    famille: "Canidae",
    origine: "Cercle polaire arctique",
    habitat: "Toundra arctique",
    taille: "55 à 75 cm",
    poids: "3 à 4,5 kg",
    longévité: "16 ans",
    IUCN: "non menacé",
    image: "/pictures/renard-polaire.jpg",
  },
  {
    id: "Ours polaire",
    points:
      "653,1073 646,1099 634,1110 654,1165 678,1164 676,1188 797,1188 797,1178 835,1179 845,1155 838,1135 842,1098 845,1078 851,1062 763,1042 751,1056 742,1051 720,1066 685,1063 689,1072 654,1076",
    famille: "Ursidae",
    origine: "Régions arctiques",
    habitat: "Banquise, toundra",
    taille: "180 à 280 cm",
    poids:
      "mâles de 300 à 650 kg - femelles de 150 à 250 kg",
    longévité: "30 ans dans la nature, 38 en captivité",
    IUCN: "vulnérable",
    image: "/pictures/ours-polaire.jpg",
  },
  {
    id: "Loup du Canada",
    points:
      "887,1049 883,1115 875,1118 872,1146 859,1178 929,1165 939,1151 973,1137 975,1115 945,1088 946,1046 886,1051",
    famille: "Canidae",
    origine: "Canada, Alaska",
    habitat: "Forêts boréale et toundra",
    taille: "mâles de 100 à 130 cm - femelles de 87 à 117 cm",
    poids: "jusqu'à 62 kg",
    longévité: "15 ans dans la nature, 20 en captivité",
    IUCN: "non menacé",
    image: "/pictures/loup-du-canada.jpg",
  },
  {
    id: "Lynx boréal",
    points:
      "964,1091 1004,1102 1016,1109 1046,1068 1033,1030 983,1030 962,1062 962,1092",
    famille: "Felidae",
    origine: "Hémisphère nord",
    habitat: "Forêt et montagnes",
    taille: "80 à 110 cm",
    poids: "18 à 25 kg",
    longévité: "17 ans dans la nature, 24 en captivité",
    IUCN: "non menacé globalement, localement menacé",
    image: "/pictures/lynx-boreal.jpg",
  },
  {
    id: "Panthère de l'amour",
    points:
      "865,870 862,940 924,990 972,1010 1017,1010 1057,983 1028,920 1003,891 911,859 865,870",
    famille: "Felidae",
    origine: "Sibérie, Manchourie et Corée",
    habitat: "Forêts tempérées",
    taille: "Environ 150 cm",
    poids: "mâles de 50 à 60 kg - femelles de 30 à 40 kg",
    longévité: "15 ans dans la nature, 20 en captivité",
    IUCN: "En danger critique d'extinction",
    image: "/pictures/panthere-de-l-amour.jpg",
  },
  {
    id: "Pélican frisé",
    points: "871,836 975,867 992,867 983,803 902,786 869,837",
    famille: "Pelecanidae",
    origine: "Sud de l'Eurasie",
    habitat: "Côtes, lacs et deltas",
    taille: "160 à 180 cm",
    poids: "10 à 13 kg",
    longévité: "50 ans",
    IUCN: "Quasi-menacé",
    image: "/pictures/pelican-frise.jpg",
  },
  {
    id: "Otarie à crinière",
    points: "893,750 950,723 999,750 1008,786 972,793 903,783 893,753",
    famille: "Otaridae",
    origine: "Amérique du Sud",
    habitat: "Côtes",
    taille: "mâles 206 cm - femelles 200 cm",
    poids: "mâles de 300 à 350 kg - femelles 144 kg",
    longévité: "20 ans",
    IUCN: "non menacé",
    image: "/pictures/otarie-a-criniere.jpg",
  },
  {
    id: "Cercopithèque",
    points: "730,623 723,661 812,657 819,609 785,603 730,625",
    famille: "Cercopithecidae",
    origine: "Afrique centrale",
    habitat: "Forêts denses de montagne",
    taille: "mâles 54 à 70 cm - femelles 45 à 55 cm",
    poids: "mâles 6 à 10 kg - femelles 3 à 5 kg",
    longévité: "24 ans",
    IUCN: "Vulnérable",
    image: "/pictures/cercopitheque.jpg",
  },
  {
    id: "Flamant rouge",
    points: "952,554 992,558 979,621 942,629 952,556",
    famille: "Phoenicopteridae",
    origine: "Caraïbes",
    habitat: "Lacs et lagunes",
    taille: "120 à 145 cm",
    poids: "2 à 4 kg",
    longévité: "40 ans",
    IUCN: "Préoccupation mineure",
    image: "/pictures/flamant-rouge.jpg",
  },
  {
    id: "Suricate",
    points: "953,640 980,683 999,677 999,624 953,640",
    famille: "Herpestidae",
    origine: "Afrique du Sud",
    habitat: "Désert de sable",
    taille: "25 à 30 cm",
    poids: "600 à 900 g",
    longévité: "8 ans dans la nature, 12 ans en captivité",
    IUCN: "non menacé",
    image: "/pictures/suricate.jpg",
  },
  {
    id: "Chien des buissons",
    points: "947,645 977,687 940,713 899,684 905,650 947,645",
    famille: "Canidae",
    origine: "Amériques centrale et du Sud",
    habitat: "Forêts de pampas boisées",
    taille: "57 à 75 cm",
    poids: "5 à 8 kg",
    longévité: "10 ans",
    IUCN: "quasi menacé",
    image: "/pictures/chien.jpg",
  },
  {
    id: "Gibbon à favoris",
    points: "972,713 985,691 1006,679 1037,699 1020,746 993,743 972,714",
    famille: "Hylobatidae",
    origine: "Sud du Vietnam",
    habitat: "Forêts tropicales humides",
    taille: "45 à 50 cm",
    poids: "6 à 7 kg",
    longévité: "45 ans en captivité (inconnu dans la nature)",
    IUCN: "En danger d'extinction",
    image: "/pictures/gibbon.jpg",
  },
  {
    id: "Tortue terrestre",
    points: "997,798 1037,796 1080,803 1080,838 1046,867 1016,859 995,800",
    famille: "Testudinidae",
    origine: "Bordure sud du Sahara",
    habitat: "Savane sèche",
    taille: "83 cm",
    poids: "36-50 Kg",
    longévité: "55 ans",
    IUCN: "Vulnérable",
    image: "/pictures/tortue.jpg",
  },
  {
    id: "Wallaby des rochers",
    points: "1097,718 1115,717 1148,720 1142,824 1106,811 1095,797 1096,719",
    famille: "Macropodidae",
    origine: "Sud et centre de l'Australie",
    habitat: "Milieux rocheux arides et semi-arides",
    taille: "48 à 65 cm",
    poids: "Mâle : 8 à 11 kg - femelles : 3 à 7 kg",
    longévité: "11 ans",
    IUCN: "Quasi menacée",
    image: "/pictures/wallaby-des-rochers.jpg",
  },
  {
    id: "Gazelles",
    points:
      "1062,905 1064,923 1075,931 1123,945 1151,949 1185,955 1192,943 1197,902 1182,886 1103,883 1062,905",
    famille: "Bovidés",
    origine: "Afrique du Nord",
    habitat: "Déserts et prairies arides",
    taille: "1 m",
    poids: "Mâles 16,5 kg - Femelles 12,6 kg",
    longévité: "12 ans dans la nature - 15 ans en parc zoologique",
    IUCN: "Vulnérable",
    image: "/pictures/gazelle.jpg",
  },
  {
    id: "Addax",
    points:
      "1085,1006 1080,1032 1111,1037 1195,1052 1232,1043 1191,986 1155,977 1084,1008",
    famille: "Bovidae",
    origine: "Sahara",
    habitat: "Désert de sable et de pierre",
    taille: "120 à 130 cm",
    poids: "mâles de 100 à 125 kg - femelles de 95 à 110 kg",
    longévité: "20 ans (record de 28 ans)",
    IUCN: "en danger critique d'extinction",
    image: "/pictures/addax.jpg",
  },
];

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-black text-xl text-[#9b8457] text-shadow-lg/10">
        {label}
      </p>
      <p className="font-medium text-lg text-black mt-3 text-center max-w-xs">
        {value}
      </p>
    </div>
  );
}

export default function InteractiveZooMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [draftPoints, setDraftPoints] = useState<
    Array<{ x: number; y: number }>
  >([]);

  const activeZone = useMemo(
    () => ZONES.find((z) => z.id === activeId) ?? null,
    [activeId]
  );
  function onSvgClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {}

  return (
    <div className="relative h-full w-full">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute top-4 left-4 z-50 flex gap-2 bg-black"></div>

        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/Mapzoo Image Resize.png"
            alt="Plan du zoo"
            fill
            priority
            className="object-contain bg-black select-none"
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${IMAGE_W} ${IMAGE_H}`}
            onClick={onSvgClick}
          >
            {ZONES.map((z) => {
              const isActive = z.id === activeId;
              return (
                <polygon
                  key={z.id}
                  points={z.points}
                  onClick={(e) => {
                    if (editMode) return;
                    e.stopPropagation();
                    setActiveId(z.id);
                  }}
                  className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  fill={
                    isActive
                      ? "rgba(15, 66, 32, 0.35)"
                      : "rgba(21, 78, 18, 0.18)"
                  }
                  stroke={
                    isActive
                      ? "rgba(31, 140, 76, 0.9) "
                      : "rgba(26, 113, 87, 0.55) "
                  }
                  strokeWidth={3}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Popup */}
      <aside className="h-full border-l bg-neutral-950 p-4 text-white">
        {!activeZone ? (
          <div></div>
        ) : (
          <div
            id="popup"
            className="bg-[#f4f0de]/90 fixed rounded-[200] top-130 left-125 bottom-50 right-50"
          >
            <div className="flex items-start justify-between gap-2">
              {activeZone?.image && (
                <div className="fixed top-132.5 left-127 p-6 z-[9999]">
                  <Image
                    src={activeZone.image}
                    alt={activeZone.id}
                    width={300}
                    height={200}
                    className="rounded-full object-cover border-4 border-[#9b8457] shadow-lg"
                  />
                </div>
              )}
              <p className="font-black text-2xl text-black fixed text-shadow-lg/10 mt-8 ml-120 mr-110 text-center whitespace-nowrap">
                {activeZone.id}
              </p>
              <div className="mt-8 ml-215 fixed">
                <button
                  className="px-2 py-1 rounded-lg border text-black"
                  onClick={() => setActiveId(null)}
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-center w-full mt-20">
                <div className="max-w-4xl grid grid-cols-3 gap-5 ml-80 mr-20 text-center">
                  <Info label="Famille" value={activeZone.famille} />
                  <Info label="Taille" value={activeZone.taille} />
                  <Info label="Origine" value={activeZone.origine} />
                  <Info label="Habitat" value={activeZone.habitat} />
                  <Info label="Poids" value={activeZone.poids} />
                  <Info label="Longévité" value={activeZone.longévité} />
                </div>
              </div>
              <p className="font-black text-xl fixed text-shadow-lg/10 mt-80 ml-80 text-center text-[#9b8457]">
                IUCN :
              </p>
              <p className="font-medium text-lg fixed text-black mt-80 ml-100">
                {activeZone.IUCN}
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
