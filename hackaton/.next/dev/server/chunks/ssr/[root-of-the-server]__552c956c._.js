module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/component/zone_modif.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InteractiveZooMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const IMAGE_W = 2048;
const IMAGE_H = 1330;
/**
 * Démo: zones EXEMPLE (à remplacer par tes vrais polygones).
 * Tu vas les créer facilement avec le "mode édition" (bouton en haut).
 */ const ZONES = [
    {
        id: "Cerf de Bactriane",
        points: "1772,883 1911,903 1937,975 1788,1012 1727,944 1763,913 1772,885"
    },
    {
        id: "Takin",
        points: "1890,783 1921,858 1965,856 1929,783 1889,783"
    },
    {
        id: "Bongo",
        points: "1764,782 1738,820 1756,856 1905,855 1874,782 1764,782"
    },
    {
        id: "Okapi",
        points: "1531,859 1533,901 1478,899 1509,944 1571,971 1685,939 1738,881 1723,856 1531,859"
    },
    {
        id: "Hippopotame pygmée",
        points: "1558,805 1528,812 1531,831 1521,848 1525,854 1722,853 1704,820 1626,799 1624,821 1602,828 1576,821 1560,807"
    },
    {
        id: "Faux-gavial d'Afrique",
        points: "1566,767 1554,779 1556,800 1576,816 1608,825 1623,810 1618,789 1601,774 1582,767 1569,768"
    },
    {
        id: "Oryctérope",
        points: "1476,782 1453,795 1449,821 1466,844 1496,853 1518,843 1527,821 1517,799 1495,783 1478,780"
    },
    {
        id: "Macaque à crète",
        points: "1461,914 1345,910 1345,966 1476,974 1460,937 1462,915"
    },
    {
        id: "Tapir malais",
        points: "1342,910 1344,967 1223,966 1220,934 1251,907 1341,910"
    },
    {
        id: "Casoar à casque",
        points: "1213,843 1214,860 1314,849 1343,820 1306,809 1217,839"
    },
    {
        id: "Vautour moine, mouton de Ouessant",
        points: "1208,735 1174,809 1201,822 1261,796 1240,739 1207,736"
    },
    {
        id: "Nandou de Darwin et vigogne",
        points: "1217,599 1152,615 1138,640 1166,665 1184,663 1196,675 1231,676 1272,647 1264,613 1219,600"
    },
    {
        id: "Girafe de Kordofan",
        points: "1354,691 1316,719 1348,784 1422,780 1409,723 1357,693"
    },
    {
        id: "Flamant rouge, flamant rose et bernache à cou roux",
        points: "1554,693 1564,736 1642,731 1620,664 1554,693"
    },
    {
        id: "Terrarium malgache",
        points: "1357,798 1361,822 1406,851 1442,844 1419,816 1366,796"
    },
    {
        id: "Alpaga",
        points: "1864,621 1836,638 1842,676 1887,680 1866,625"
    },
    {
        id: "Baudet de Poitou",
        points: "1806,606 1781,604 1761,616 1764,642 1788,667 1815,669 1824,627 1809,605"
    },
    {
        id: "Mini-ferme (chèvre naine, basse-cour, pécari du Chaco)",
        points: "1785,547 1765,545 1765,594 1810,595 1808,548 1786,548"
    },
    {
        id: "Singes (cercopithèque de l'Hoest, atèle, capucin)",
        points: "1361,585 1339,598 1370,618 1395,605 1361,585"
    },
    {
        id: "Zèbre de Grévy",
        points: "1538,582 1525,604 1576,640 1634,648 1625,594 1538,582"
    },
    {
        id: "Petite Amazonie (tamarin, ouistiti, titi roux, saki à face blanche, saïmiri et tatou à trois bandes, dendrobate)",
        points: "1461,586 1412,593 1461,625 1493,606 1461,586"
    },
    {
        id: "Panda roux, mutjac et loutre laine",
        points: "1285,471 1228,474 1252,519 1317,509 1287,472"
    },
    {
        id: "Loup à crinière",
        points: "1226,461 1160,436 1157,480 1170,498 1224,479 1225,465"
    },
    {
        id: "Perroquets (aras Hyacinthe, ara à gorge bleue, perroquet robuste)",
        points: "1142,476 1166,510 1098,547 1056,504 1137,476"
    },
    {
        id: "Manchot du Cap",
        points: "1087,660 1109,688 1138,691 1144,652 1088,658"
    },
    {
        id: "Grande volière (ibis rouge, spatulerose, vautour percnoptère, ibis chauve...)",
        points: "1083,659 1047,681 1047,715 1145,723 1150,697 1107,693 1083,661"
    },
    {
        id: "Chameau de Bactriane",
        points: "72,940 115,962 134,964 178,947 190,932 228,935 231,838 220,830 72,940"
    },
    {
        id: "Kulan",
        points: "238,933 360,904 363,896 355,870 353,827 241,834 239,936"
    },
    {
        id: "Boeuf musqué",
        points: "240,1188 330,1064 346,1068 363,1068 370,1085 399,1088 425,1112 446,1110 466,1126 474,1161 500,1164 514,1184 505,1215 313,1211 241,1190"
    },
    {
        id: "Renard polaire",
        points: "368,1057 374,1048 411,1043 418,1031 479,1024 491,1043 503,1063 500,1089 484,1099 468,1112 463,1102 445,1097 439,1086 408,1080 392,1079 367,1059"
    },
    {
        id: "Ours polaire",
        points: "653,1073 646,1099 634,1110 654,1165 678,1164 676,1188 797,1188 797,1178 835,1179 845,1155 838,1135 842,1098 845,1078 851,1062 763,1042 751,1056 742,1051 720,1066 685,1063 689,1072 654,1076"
    },
    {
        id: "Maison de l'éclosion",
        points: "705,930 811,947 818,882 724,879 705,931"
    },
    {
        id: "Loup du Canada",
        points: "887,1049 883,1115 875,1118 872,1146 859,1178 929,1165 939,1151 973,1137 975,1115 945,1088 946,1046 886,1051"
    },
    {
        id: "Lynx boréal",
        points: "964,1091 1004,1102 1016,1109 1046,1068 1033,1030 983,1030 962,1062 962,1092"
    },
    {
        id: "Félin",
        points: "865,870 862,940 924,990 972,1010 1017,1010 1057,983 1028,920 1003,891 911,859 865,870"
    },
    {
        id: "Pélican frisé",
        points: "871,836 975,867 992,867 983,803 902,786 869,837"
    },
    {
        id: "Otarie à crinière",
        points: "893,750 950,723 999,750 1008,786 972,793 903,783 893,753"
    },
    {
        id: "Cercopithèque",
        points: "730,623 723,661 812,657 819,609 785,603 730,625"
    },
    {
        id: "Volière Motmot Houtouc",
        points: "882,559 947,552 935,626 886,629 882,560"
    },
    {
        id: "Flamant rose / Flamant rouge / Bernache à cou roux",
        points: "952,554 992,558 979,621 942,629 952,556"
    },
    {
        id: "Suricate",
        points: "953,640 980,683 999,677 999,624 953,640"
    },
    {
        id: "Chien des buissons",
        points: "947,645 977,687 940,713 899,684 905,650 947,645"
    },
    {
        id: "Gibbon à favoris",
        points: "972,713 985,691 1006,679 1037,699 1020,746 993,743 972,714"
    },
    {
        id: "Tortue terrestre",
        points: "997,798 1037,796 1080,803 1080,838 1046,867 1016,859 995,800"
    },
    {
        id: "Kangourou roux wallabi des rochers",
        points: "1097,718 1115,717 1148,720 1142,824 1106,811 1095,797 1096,719"
    },
    {
        id: "Gazelles",
        points: "1062,905 1064,923 1075,931 1123,945 1151,949 1185,955 1192,943 1197,902 1182,886 1103,883 1062,905"
    },
    {
        id: "Addax",
        points: "1085,1006 1080,1032 1111,1037 1195,1052 1232,1043 1191,986 1155,977 1084,1008"
    }
];
function InteractiveZooMap() {
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draftPoints, setDraftPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const activeZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>ZONES.find((z)=>z.id === activeId) ?? null, [
        activeId
    ]);
    function svgPointFromClick(e) {
        // Coordonnées en pixels "image" grâce au viewBox (0..IMAGE_W / 0..IMAGE_H)
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const screenCTM = svg.getScreenCTM();
        if (!screenCTM) return null;
        const loc = pt.matrixTransform(screenCTM.inverse());
        return {
            x: Math.round(loc.x),
            y: Math.round(loc.y)
        };
    }
    function onSvgClick(e) {
        if (!editMode) return;
        const p = svgPointFromClick(e);
        if (!p) return;
        const next = [
            ...draftPoints,
            p
        ];
        setDraftPoints(next);
        // Log direct pour copier/coller
        const str = next.map((q)=>`${q.x},${q.y}`).join(" ");
        // eslint-disable-next-line no-console
        console.log("POLYGON_POINTS =", str);
    }
    function closePolygon() {
        if (draftPoints.length < 3) return;
        const str = draftPoints.map((q)=>`${q.x},${q.y}`).join(" ");
        // eslint-disable-next-line no-console
        console.log("FINAL_POLYGON_POINTS =", str);
    }
    function resetDraft() {
        setDraftPoints([]);
    }
    const draftPointsStr = draftPoints.map((p)=>`${p.x},${p.y}`).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-full overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4 z-50 flex gap-2 bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-3 py-2 rounded-xl border shadow-sm",
                                onClick: ()=>setEditMode((v)=>!v),
                                children: editMode ? "✅ Mode édition ON" : "🛠️ Mode édition OFF"
                            }, void 0, false, {
                                fileName: "[project]/component/zone_modif.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-3 py-2 rounded-xl border shadow-sm",
                                        onClick: closePolygon,
                                        children: "Clôturer (console)"
                                    }, void 0, false, {
                                        fileName: "[project]/component/zone_modif.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-3 py-2 rounded-xl border shadow-sm",
                                        onClick: resetDraft,
                                        children: "Reset points"
                                    }, void 0, false, {
                                        fileName: "[project]/component/zone_modif.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/component/zone_modif.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/Mapzoo Image Resize.png",
                                alt: "Plan du zoo",
                                fill: true,
                                priority: true,
                                className: "object-contain bg-black select-none"
                            }, void 0, false, {
                                fileName: "[project]/component/zone_modif.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute inset-0 w-full h-full",
                                viewBox: `0 0 ${IMAGE_W} ${IMAGE_H}`,
                                onClick: onSvgClick,
                                children: [
                                    ZONES.map((z)=>{
                                        const isActive = z.id === activeId;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: z.points,
                                            onClick: (e)=>{
                                                if (editMode) return; // en édition on ne sélectionne pas
                                                e.stopPropagation();
                                                setActiveId(z.id);
                                            },
                                            className: "cursor-pointer opacity-0",
                                            fill: isActive ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.18)",
                                            stroke: isActive ? "rgba(59,130,246,0.9)" : "rgba(59,130,246,0.55)",
                                            strokeWidth: 3
                                        }, z.id, false, {
                                            fileName: "[project]/component/zone_modif.tsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    editMode && draftPoints.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: draftPointsStr,
                                                fill: "rgba(16,185,129,0.12)",
                                                stroke: "rgba(16,185,129,0.9)",
                                                strokeWidth: 3
                                            }, void 0, false, {
                                                fileName: "[project]/component/zone_modif.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this),
                                            draftPoints.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: p.x,
                                                    cy: p.y,
                                                    r: 6,
                                                    fill: "rgba(16,185,129,0.95)"
                                                }, i, false, {
                                                    fileName: "[project]/component/zone_modif.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/component/zone_modif.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/component/zone_modif.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-2 opacity-80",
                        children: [
                            "Mode édition : clique pour poser des points → regarde la console pour récupérer ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "POLYGON_POINTS"
                            }, void 0, false, {
                                fileName: "[project]/component/zone_modif.tsx",
                                lineNumber: 371,
                                columnNumber: 28
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/component/zone_modif.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/component/zone_modif.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "h-full border-l bg-neutral-950 p-4 text-white",
                children: !activeZone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold text-lg",
                            children: "Infos"
                        }, void 0, false, {
                            fileName: "[project]/component/zone_modif.tsx",
                            lineNumber: 380,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "opacity-80 mt-2",
                            children: "Clique une zone sur la carte."
                        }, void 0, false, {
                            fileName: "[project]/component/zone_modif.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/component/zone_modif.tsx",
                    lineNumber: 379,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "popup",
                    className: "bg-yellow-50 p-20 fixed text-yellow-400 rounded-[200] top-125 left-125 bottom-50 right-50 opacity-65",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-lg",
                                    children: activeZone.id
                                }, void 0, false, {
                                    fileName: "[project]/component/zone_modif.tsx",
                                    lineNumber: 386,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-2 py-1 rounded-lg border",
                                    onClick: ()=>setActiveId(null),
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/component/zone_modif.tsx",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/component/zone_modif.tsx",
                            lineNumber: 385,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-medium",
                                    children: "Animaux"
                                }, void 0, false, {
                                    fileName: "[project]/component/zone_modif.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc ml-5 mt-2 opacity-90",
                                    children: (activeZone.animals ?? [
                                        "(à remplir)"
                                    ]).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: a
                                        }, a, false, {
                                            fileName: "[project]/component/zone_modif.tsx",
                                            lineNumber: 399,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/component/zone_modif.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/component/zone_modif.tsx",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/component/zone_modif.tsx",
                    lineNumber: 384,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/component/zone_modif.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/component/zone_modif.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__552c956c._.js.map