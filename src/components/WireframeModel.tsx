import type { CSSProperties } from "react";

const LINE = "rgba(226,214,196,0.8)";
const FILL = (a: number) => `rgba(226,214,196,${a})`;

interface BoxProps {
  w: number;
  d: number;
  h: number;
  cx?: number;
  cy?: number;
  cz?: number;
  opacity?: number;
  windows?: boolean;
}

/** An axis-aligned wireframe box, walls + a top slab. `cy` is the box's vertical center. */
function Box3D({ w, d, h, cx = 0, cy = 0, cz = 0, opacity = 0.08, windows = false }: BoxProps) {
  const face: CSSProperties = {
    position: "absolute",
    boxSizing: "border-box",
    border: `1px solid ${LINE}`,
    backgroundColor: FILL(opacity),
  };
  const wallFace: CSSProperties = windows
    ? {
        ...face,
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 ${w * 0.16}px, ${FILL(0.22)} ${w * 0.16}px ${w * 0.16 + 1.2}px)`,
      }
    : face;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformStyle: "preserve-3d",
        transform: `translate3d(${cx}px, ${cy}px, ${cz}px)`,
      }}
    >
      <div style={{ ...wallFace, width: w, height: h, left: -w / 2, top: -h / 2, transform: `translateZ(${d / 2}px)` }} />
      <div
        style={{ ...wallFace, width: w, height: h, left: -w / 2, top: -h / 2, transform: `rotateY(180deg) translateZ(${d / 2}px)` }}
      />
      <div style={{ ...face, width: d, height: h, left: -d / 2, top: -h / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
      <div
        style={{ ...face, width: d, height: h, left: -d / 2, top: -h / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }}
      />
      <div
        style={{ ...face, width: w, height: d, left: -w / 2, top: -d / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)`, backgroundColor: FILL(opacity + 0.1) }}
      />
    </div>
  );
}

/** One pitched roof plane, hinged along the ridge (x-axis) and sloping down to an eave at ±depth/2. */
function RoofSlope({ w, run, rise, cy, side }: { w: number; run: number; rise: number; cy: number; side: 1 | -1 }) {
  const len = Math.sqrt(run * run + rise * rise);
  const angleDeg = (Math.atan2(run, rise) * 180) / Math.PI;
  return (
    <div
      style={{
        position: "absolute",
        left: -w / 2,
        top: 0,
        width: w,
        height: len,
        boxSizing: "border-box",
        border: `1px solid ${LINE}`,
        backgroundColor: FILL(0.1),
        transformOrigin: "top center",
        transform: `translate3d(${w / 2}px, ${cy}px, 0px) rotateX(${side * angleDeg}deg)`,
      }}
    />
  );
}

/** The triangular gable wall filling the end of a pitched roof, at x = ±width/2. */
function GableTriangle({ depth, rise, cx, cy }: { depth: number; rise: number; cx: number; cy: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: -depth / 2,
        top: 0,
        width: depth,
        height: rise,
        border: `1px solid ${LINE}`,
        backgroundColor: FILL(0.14),
        boxSizing: "border-box",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        transform: `translate3d(${cx}px, ${cy}px, 0px) rotateY(90deg)`,
      }}
    />
  );
}

/**
 * A CSS-only rotating wireframe massing model of a two-storey gabled villa:
 * walls with faint window mullions, a pitched roof and a chimney, standing
 * in for the studio's early-stage 3D massing studies.
 * `size` is the building footprint width in px at 1x scale.
 */
export function WireframeModel({ size = 420 }: { size?: number }) {
  const w = size;
  const d = size * 0.6;
  const h = size * 0.36;
  const roofRise = size * 0.2;

  const wallTop = -h;
  const ridgeY = wallTop - roofRise;

  const chimneyW = size * 0.05;
  const chimneyH = size * 0.16;

  return (
    <div className="bk-spin" style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
      <Box3D w={w} d={d} h={h} cy={-h / 2} opacity={0.08} windows />

      <RoofSlope w={w} run={d / 2} rise={roofRise} cy={ridgeY} side={1} />
      <RoofSlope w={w} run={d / 2} rise={roofRise} cy={ridgeY} side={-1} />
      <GableTriangle depth={d} rise={roofRise} cx={-w / 2} cy={ridgeY} />
      <GableTriangle depth={d} rise={roofRise} cx={w / 2} cy={ridgeY} />

      <Box3D
        w={chimneyW}
        d={chimneyW}
        h={chimneyH}
        cx={w * 0.28}
        cz={d * 0.12}
        cy={ridgeY - chimneyH * 0.35}
        opacity={0.16}
      />
    </div>
  );
}
