"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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
  },
  {
    id: "Hippopotame pygmée",
    points:
      "1558,805 1528,812 1531,831 1521,848 1525,854 1722,853 1704,820 1626,799 1624,821 1602,828 1576,821 1560,807",
    famille: " Hippopotamidés",
    origine: "Pointe Ouest de l'Afrique (Libéria et alentours) ",
    habitat: "Zones boisées proches de marécages et points d'eau ",
    taille: " 1,50 à 1,75 m",
    poids: " 160 à 275 kg",
    longévité: "43 ans en parc zoologique - Inconnu dans la nature ",
    IUCN: " En Danger",
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
  },
  {
    id: "Oryctérope",
    points:
      "1476,782 1453,795 1449,821 1466,844 1496,853 1518,843 1527,821 1517,799 1495,783 1478,780",
    famille: " Orycteropodidés",
    origine: "Afrique Subsaharienne ",
    habitat:
      "Nombreux habitats différents, pourvu qu'il y ait des fourmis et termites : prairies, savanes, forêts ",
    taille: "100 à 158 cm ",
    poids: "40 à 80 kg ",
    longévité: " 18 ans dans la nature - 23 ans en parc zoologique",
    IUCN: "Non menacé ",
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
  },
  {
    id: "Vautour moine, mouton de Ouessant",
    points: "1208,735 1174,809 1201,822 1261,796 1240,739 1207,736",
    famille: "Bovidae ",
    origine: " Île d’Ouessant (Bretagne)",
    habitat: " Pâturages et marais salants",
    taille: " 40 à 50 cm au garrot",
    poids: "11 à 20 kg ",
    longévité: "12 ans ",
    IUCN: " non classé car domestique",
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
  },
  {
    id: "Girafe de Kordofan",
    points: "1354,691 1316,719 1348,784 1422,780 1409,723 1357,693",
    famille: "Giraffidés ",
    origine: " Afrique centrale",
    habitat: "Savane ",
    taille: "Mâles 5,7m - Femelles 5m ",
    poids: "Mâles : 1100 à 1900 kg - Femelles : 950 à 1100 kg ",
    longévité: "25 ans dans la nature - 36 ans en parc zoologique ",
    IUCN: " En danger critique",
  },
  {
    id: "Flamant rouge, flamant rose et bernache à cou roux",
    points: "1554,693 1564,736 1642,731 1620,664 1554,693",
    famille: " Phoenicopteridae",
    origine: "Caraïbes ",
    habitat: "Lacs et lagunes ",
    taille: " 120 à 145 cm",
    poids: " 2 à 4 kg",
    longévité: "40 ans ",
    IUCN: "Préoccupation mineure ",
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
  },
  {
    id: "Baudet de Poitou",
    points:
      "1806,606 1781,604 1761,616 1764,642 1788,667 1815,669 1824,627 1809,605",
    famille: " Equidae",
    origine: "Marais poitevin ",
    habitat: " en élevage uniquement",
    taille: "140 - 155 cm ",
    poids: " 350 - 450 kg",
    longévité: "30 à 50 ans",
    IUCN: " non classé car domestique mais race devenue rare",
  },
  {
    id: "Mini-ferme (chèvre naine, basse-cour, pécari du Chaco)",
    points: "1785,547 1765,545 1765,594 1810,595 1808,548 1786,548",
    famille: " Bovidae",
    origine: "Sénégal et Tibet ",
    habitat: "espèce domestique ",
    taille: "50 cm ",
    poids: " mâle 17-30 kg, femelle 12-20 kg",
    longévité: "14 ans ",
    IUCN: " non classé car domestique",
  },
  {
    id: "Singes (cercopithèque de l'Hoest, atèle, capucin)",
    points: "1361,585 1339,598 1370,618 1395,605 1361,585",
    famille: "Cercopithecidae ",
    origine: "Afrique de l'Ouest ",
    habitat: "Forêts pluviales primaires ",
    taille: "mâles 50 à 60 cm - femelles 42 à 45 cm ",
    poids: "mâles 5 kg - femelles 4 kg ",
    longévité: "30 ans ",
    IUCN: "En danger critique d'extinction ",
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
  },
  {
    id: "Petite Amazonie (tamarin, ouistiti, titi roux, saki à face blanche, saïmiri et tatou à trois bandes, dendrobate)",
    points: "1461,586 1412,593 1461,625 1493,606 1461,586",
    famille: " Callithrichidae",
    origine: "Haut Amazone ",
    habitat: " Forêts tropicales",
    taille: "23 à 26 cm ",
    poids: "400 à 550 g ",
    longévité: " 20 ans",
    IUCN: "Préoccupation mineure ",
  },
  {
    id: "Panda roux, mutjac et loutre laine",
    points: "1285,471 1228,474 1252,519 1317,509 1287,472",
    famille: " Ailuridae",
    origine: "Sud-est asiatique (du Népal au sud-ouest de la Chine) ",
    habitat: "Forêts tempérées mixtes de chênes, sapins et bambous ",
    taille: " 51 à 73 cm + 28 à 49 cm de queue",
    poids: "3 à 6 kg ",
    longévité: "10 an dans la nature, 13 en captivité ",
    IUCN: " vulnérable",
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
  },
  {
    id: "Ours polaire",
    points:
      "653,1073 646,1099 634,1110 654,1165 678,1164 676,1188 797,1188 797,1178 835,1179 845,1155 838,1135 842,1098 845,1078 851,1062 763,1042 751,1056 742,1051 720,1066 685,1063 689,1072 654,1076",
    famille: "Ursidae",
    origine: "Régions arctiques",
    habitat: "Banquise, toundra",
    taille: "180 à 280 cm",
    poids: "mâles de 300 à 650 kg - femelles de 150 à 250 kg (jusqu'à 500 si gestantes)",
    longévité: "30 ans dans la nature, 38 en captivité",
    IUCN: "vulnérable",
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
  },
  {
    id: "Panthère de l'amour",
    points: "865,870 862,940 924,990 972,1010 1017,1010 1057,983 1028,920 1003,891 911,859 865,870",
    famille: "Felidae",
    origine: "Sibérie, Manchourie et Corée",
    habitat: "Forêts tempérées",
    taille: "Environ 150 cm",
    poids: "mâles de 50 à 60 kg - femelles de 30 à 40 kg",
    longévité: "15 ans dans la nature, 20 en captivité",
    IUCN: "En danger critique d'extinction",
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
  },
  {
    id: "Wallabi des rochers",
    points: "1097,718 1115,717 1148,720 1142,824 1106,811 1095,797 1096,719",
    famille: "Macropodidae",
    origine: "Sud et centre de l'Australie",
    habitat: "Milieux rocheux arides et semi-arides",
    taille: "48 à 65 cm",
    poids: "Mâle : 8 à 11 kg - femelles : 3 à 7 kg",
    longévité: "11 ans",
    IUCN: "Quasi menacée",
  },
  {
    id: "Gazelles",
    points: "1062,905 1064,923 1075,931 1123,945 1151,949 1185,955 1192,943 1197,902 1182,886 1103,883 1062,905",
    famille: "Bovidés",
    origine: "Afrique du Nord",
    habitat: "Déserts et prairies arides",
    taille: "1 m",
    poids: "Mâles 16,5 kg - Femelles 12,6 kg",
    longévité: "12 ans dans la nature - 15 ans en parc zoologique",
    IUCN: "Vulnérable",
  },
  {
    id: "Addax",
    points: "1085,1006 1080,1032 1111,1037 1195,1052 1232,1043 1191,986 1155,977 1084,1008",
    famille: "Bovidae",
    origine: "Sahara",
    habitat: "Désert de sable et de pierre",
    taille: "120 à 130 cm",
    poids: "mâles de 100 à 125 kg - femelles de 95 à 110 kg",
    longévité: "20 ans (record de 28 ans)",
    IUCN: "en danger critique d'extinction",
  },
];

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
  function onSvgClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) { }

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

      {/* Sidebar */}
      <aside className="h-full border-l bg-neutral-950 p-4 text-white">
        {!activeZone ? (
          <div></div>
        ) : (
          <div
            id="popup"
            className="bg-[#f4f0de]/90 fixed text-[#9b8457] rounded-[200] top-130 left-125 bottom-50 right-50"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-black text-2xl text-shadow-lg/10 mt-7 ml-135 mr-25 text-center">
                {activeZone.id}
              </p>
              <button
                className="px-2 py-1 rounded-lg border text-black mt-10 ml-30"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
              <p className="font-medium text-lg">{activeZone.famille}</p>
              <p className="font-medium text-lg">{activeZone.origine}</p>
              <p className="font-medium text-lg">{activeZone.habitat}</p>
              <p className="font-medium text-lg">{activeZone.taille}</p>
              <p className="font-medium text-lg">{activeZone.poids}</p>
              <p className="font-medium text-lg">{activeZone.longévité}</p>
              <p className="font-medium text-lg">{activeZone.IUCN}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
