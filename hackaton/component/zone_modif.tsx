"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Zone = {
  id: string;
  name: string;
  // points en coordonnées image (pixels) : "x,y x,y x,y"
  points: string;
  animals?: string[];
};

const IMAGE_W = 2048;
const IMAGE_H = 1330;

/**
 * Démo: zones EXEMPLE (à remplacer par tes vrais polygones).
 * Tu vas les créer facilement avec le "mode édition" (bouton en haut).
 */
const ZONES: Zone[] = [
  {
    id: "zone_lac_droite",
    name: "Zone des lacs (droite)",
    points: "1505,560 1775,560 1830,710 1705,790 1495,740",
    animals: ["Exemple: flamants", "Exemple: oiseaux d’eau"],
  },
  {
    id: "zone_centre",
    name: "Zone centrale",
    points: "900,560 1110,510 1230,650 1120,820 920,770",
    animals: ["Exemple: primates", "Exemple: petits mammifères"],
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

  function svgPointFromClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    // Coordonnées en pixels "image" grâce au viewBox (0..IMAGE_W / 0..IMAGE_H)
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const screenCTM = svg.getScreenCTM();
    if (!screenCTM) return null;
    const loc = pt.matrixTransform(screenCTM.inverse());
    return { x: Math.round(loc.x), y: Math.round(loc.y) };
  }

  function onSvgClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (!editMode) return;

    const p = svgPointFromClick(e);
    if (!p) return;

    const next = [...draftPoints, p];
    setDraftPoints(next);

    // Log direct pour copier/coller
    const str = next.map((q) => `${q.x},${q.y}`).join(" ");
    // eslint-disable-next-line no-console
    console.log("POLYGON_POINTS =", str);
  }

  function closePolygon() {
    if (draftPoints.length < 3) return;
    const str = draftPoints.map((q) => `${q.x},${q.y}`).join(" ");
    // eslint-disable-next-line no-console
    console.log("FINAL_POLYGON_POINTS =", str);
  }

  function resetDraft() {
    setDraftPoints([]);
  }

  const draftPointsStr = draftPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="grid h-full w-full grid-cols-[1fr_360px]">
      <div className="relative w-full h-full">
        <div className="flex gap-2 mb-2">
          <button
            className="px-3 py-2 rounded-xl border shadow-sm"
            onClick={() => setEditMode((v) => !v)}
          >
            {editMode ? "✅ Mode édition ON" : "🛠️ Mode édition OFF"}
          </button>

          {editMode && (
            <>
              <button
                className="px-3 py-2 rounded-xl border shadow-sm"
                onClick={closePolygon}
              >
                Clôturer (console)
              </button>
              <button
                className="px-3 py-2 rounded-xl border shadow-sm"
                onClick={resetDraft}
              >
                Reset points
              </button>
            </>
          )}
        </div>

        {/* Container responsive : on garde le ratio avec aspect-[w/h] */}

        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/mapzoo.png"
            alt="Plan du zoo"
            fill
            priority
            className="object-contain bg-black"
          />

          {/* Overlay SVG : même ratio via viewBox */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${IMAGE_W} ${IMAGE_H}`}
            onClick={onSvgClick}
          >
            {/* Zones existantes */}
            {ZONES.map((z) => {
              const isActive = z.id === activeId;
              return (
                <polygon
                  key={z.id}
                  points={z.points}
                  onClick={(e) => {
                    if (editMode) return; // en édition on ne sélectionne pas
                    e.stopPropagation();
                    setActiveId(z.id);
                  }}
                  className="cursor-pointer"
                  fill={
                    isActive ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.18)"
                  }
                  stroke={
                    isActive ? "rgba(59,130,246,0.9)" : "rgba(59,130,246,0.55)"
                  }
                  strokeWidth={3}
                />
              );
            })}

            {/* Draft polygon (édition) */}
            {editMode && draftPoints.length > 0 && (
              <>
                <polyline
                  points={draftPointsStr}
                  fill="rgba(16,185,129,0.12)"
                  stroke="rgba(16,185,129,0.9)"
                  strokeWidth={3}
                />
                {draftPoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={6}
                    fill="rgba(16,185,129,0.95)"
                  />
                ))}
              </>
            )}
          </svg>
        </div>

        {editMode && (
          <p className="text-sm mt-2 opacity-80">
            Mode édition : clique pour poser des points → regarde la console
            pour récupérer <code>POLYGON_POINTS</code>.
          </p>
        )}
      </div>

      {/* Sidebar */}
      <aside className="h-full border-l bg-neutral-950 p-4 text-white">
        {!activeZone ? (
          <div>
            <h2 className="font-semibold text-lg">Infos</h2>
            <p className="opacity-80 mt-2">Clique une zone sur la carte.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-lg">{activeZone.name}</h2>
              <button
                className="px-2 py-1 rounded-lg border"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
            </div>

            <div className="mt-3">
              <h3 className="font-medium">Animaux</h3>
              <ul className="list-disc ml-5 mt-2 opacity-90">
                {(activeZone.animals ?? ["(à remplir)"]).map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
