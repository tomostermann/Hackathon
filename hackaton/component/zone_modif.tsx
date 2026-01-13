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
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Takin",
    points: "1890,783 1921,858 1965,856 1929,783 1889,783",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Bongo",
    points: "1764,782 1738,820 1756,856 1905,855 1874,782 1764,782",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Okapi",
    points:
      "1531,859 1533,901 1478,899 1509,944 1571,971 1685,939 1738,881 1723,856 1531,859",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Hippopotame pygmée",
    points:
      "1558,805 1528,812 1531,831 1521,848 1525,854 1722,853 1704,820 1626,799 1624,821 1602,828 1576,821 1560,807",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Faux-gavial d'Afrique",
    points:
      "1566,767 1554,779 1556,800 1576,816 1608,825 1623,810 1618,789 1601,774 1582,767 1569,768",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Oryctérope",
    points:
      "1476,782 1453,795 1449,821 1466,844 1496,853 1518,843 1527,821 1517,799 1495,783 1478,780",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Macaque à crète",
    points: "1461,914 1345,910 1345,966 1476,974 1460,937 1462,915",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Tapir malais",
    points: "1342,910 1344,967 1223,966 1220,934 1251,907 1341,910",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Casoar à casque",
    points: "1213,843 1214,860 1314,849 1343,820 1306,809 1217,839",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Vautour moine, mouton de Ouessant",
    points: "1208,735 1174,809 1201,822 1261,796 1240,739 1207,736",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Nandou de Darwin et vigogne",
    points:
      "1217,599 1152,615 1138,640 1166,665 1184,663 1196,675 1231,676 1272,647 1264,613 1219,600",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Girafe de Kordofan",
    points: "1354,691 1316,719 1348,784 1422,780 1409,723 1357,693",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Flamant rouge, flamant rose et bernache à cou roux",
    points: "1554,693 1564,736 1642,731 1620,664 1554,693",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Terrarium malgache",
    points: "1357,798 1361,822 1406,851 1442,844 1419,816 1366,796",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Alpaga",
    points: "1864,621 1836,638 1842,676 1887,680 1866,625",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Baudet de Poitou",
    points:
      "1806,606 1781,604 1761,616 1764,642 1788,667 1815,669 1824,627 1809,605",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Mini-ferme (chèvre naine, basse-cour, pécari du Chaco)",
    points: "1785,547 1765,545 1765,594 1810,595 1808,548 1786,548",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Singes (cercopithèque de l'Hoest, atèle, capucin)",
    points: "1361,585 1339,598 1370,618 1395,605 1361,585",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Zèbre de Grévy",
    points: "1538,582 1525,604 1576,640 1634,648 1625,594 1538,582",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Petite Amazonie (tamarin, ouistiti, titi roux, saki à face blanche, saïmiri et tatou à trois bandes, dendrobate)",
    points: "1461,586 1412,593 1461,625 1493,606 1461,586",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Panda roux, mutjac et loutre laine",
    points: "1285,471 1228,474 1252,519 1317,509 1287,472",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Loup à crinière",
    points: "1226,461 1160,436 1157,480 1170,498 1224,479 1225,465",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Perroquets (aras Hyacinthe, ara à gorge bleue, perroquet robuste)",
    points: "1142,476 1166,510 1098,547 1056,504 1137,476",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Manchot du Cap",
    points: "1087,660 1109,688 1138,691 1144,652 1088,658",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Grande volière (ibis rouge, spatulerose, vautour percnoptère, ibis chauve...)",
    points: "1083,659 1047,681 1047,715 1145,723 1150,697 1107,693 1083,661",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Chameau de Bactriane",
    points:
      "72,940 115,962 134,964 178,947 190,932 228,935 231,838 220,830 72,940",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Kulan",
    points: "238,933 360,904 363,896 355,870 353,827 241,834 239,936",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Boeuf musqué",
    points:
      "240,1188 330,1064 346,1068 363,1068 370,1085 399,1088 425,1112 446,1110 466,1126 474,1161 500,1164 514,1184 505,1215 313,1211 241,1190",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Renard polaire",
    points:
      "368,1057 374,1048 411,1043 418,1031 479,1024 491,1043 503,1063 500,1089 484,1099 468,1112 463,1102 445,1097 439,1086 408,1080 392,1079 367,1059",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Ours polaire",
    points:
      "653,1073 646,1099 634,1110 654,1165 678,1164 676,1188 797,1188 797,1178 835,1179 845,1155 838,1135 842,1098 845,1078 851,1062 763,1042 751,1056 742,1051 720,1066 685,1063 689,1072 654,1076",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Maison de l'éclosion",
    points: "705,930 811,947 818,882 724,879 705,931",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Loup du Canada",
    points:
      "887,1049 883,1115 875,1118 872,1146 859,1178 929,1165 939,1151 973,1137 975,1115 945,1088 946,1046 886,1051",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Lynx boréal",
    points:
      "964,1091 1004,1102 1016,1109 1046,1068 1033,1030 983,1030 962,1062 962,1092",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Félin",
    points:
      "865,870 862,940 924,990 972,1010 1017,1010 1057,983 1028,920 1003,891 911,859 865,870",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Pélican frisé",
    points: "871,836 975,867 992,867 983,803 902,786 869,837",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Otarie à crinière",
    points: "893,750 950,723 999,750 1008,786 972,793 903,783 893,753",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Cercopithèque",
    points: "730,623 723,661 812,657 819,609 785,603 730,625",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Volière Motmot Houtouc",
    points: "882,559 947,552 935,626 886,629 882,560",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Flamant rose / Flamant rouge / Bernache à cou roux",
    points: "952,554 992,558 979,621 942,629 952,556",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Suricate",
    points: "953,640 980,683 999,677 999,624 953,640",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Chien des buissons",
    points: "947,645 977,687 940,713 899,684 905,650 947,645",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Gibbon à favoris",
    points: "972,713 985,691 1006,679 1037,699 1020,746 993,743 972,714",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Tortue terrestre",
    points: "997,798 1037,796 1080,803 1080,838 1046,867 1016,859 995,800",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Kangourou roux wallabi des rochers",
    points: "1097,718 1115,717 1148,720 1142,824 1106,811 1095,797 1096,719",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Gazelles",
    points:
      "1062,905 1064,923 1075,931 1123,945 1151,949 1185,955 1192,943 1197,902 1182,886 1103,883 1062,905",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
  },
  {
    id: "Addax",
    points:
      "1085,1006 1080,1032 1111,1037 1195,1052 1232,1043 1191,986 1155,977 1084,1008",
    famille: " ",
    origine: " ",
    habitat: " ",
    taille: " ",
    poids: " ",
    longévité: " ",
    IUCN: " ",
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
              <p className="font-black text-2xl text-shadow-lg/10 mt-7 ml-130 mr-30 text-center">
                {activeZone.id}
              </p>
              <button
                className="px-2 py-1 rounded-lg border text-black mr-30 mt-10"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
              <p className="font-semibold text-lg">{activeZone.famille}</p>
              <p className="font-semibold text-lg">{activeZone.origine}</p>
              <p className="font-semibold text-lg">{activeZone.habitat}</p>
              <p className="font-semibold text-lg">{activeZone.taille}</p>
              <p className="font-semibold text-lg">{activeZone.poids}</p>
              <p className="font-semibold text-lg">{activeZone.longévité}</p>
              <p className="font-semibold text-lg">{activeZone.IUCN}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
