import type { CSSProperties } from "react";

interface Box3DProps {
  w: number;
  d: number;
  h: number;
  cx?: number;
  cy?: number;
  cz?: number;
  opacity?: number;
  slab?: boolean;
}

function Box3D({ w, d, h, cx = 0, cy = 0, cz = 0, opacity = 0.07, slab = false }: Box3DProps) {
  const border = `1px solid rgba(226,214,196,0.75)`;
  const face: CSSProperties = {
    position: "absolute",
    boxSizing: "border-box",
    border,
    backgroundColor: `rgba(226,214,196,${opacity})`,
  };
  const slabFace: CSSProperties = {
    ...face,
    backgroundColor: `rgba(226,214,196,${opacity + 0.07})`,
  };
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
      <div style={{ ...face, width: w, height: h, left: -w / 2, top: -h / 2, transform: `translateZ(${d / 2}px)` }} />
      <div
        style={{ ...face, width: w, height: h, left: -w / 2, top: -h / 2, transform: `rotateY(180deg) translateZ(${d / 2}px)` }}
      />
      <div
        style={{ ...face, width: d, height: h, left: -d / 2, top: -h / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }}
      />
      <div
        style={{ ...face, width: d, height: h, left: -d / 2, top: -h / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }}
      />
      <div style={{ ...slabFace, width: w, height: d, left: -w / 2, top: -d / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)` }} />
      {slab && (
        <div
          style={{ ...slabFace, width: w, height: d, left: -w / 2, top: -d / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)` }}
        />
      )}
    </div>
  );
}

/**
 * A CSS-only rotating wireframe massing model: two stepped volumes plus a
 * small roof accent, standing in for the studio's early-stage 3D studies.
 * `size` is the base footprint width in px at 1x scale.
 */
export function WireframeModel({ size = 420 }: { size?: number }) {
  const w1 = size;
  const d1 = size * 0.667;
  const h1 = size * 0.333;

  const w2 = size * 0.6;
  const d2 = size * 0.405;
  const h2 = size * 0.217;

  const cap = size * 0.19;

  return (
    <div className="bk-spin" style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
      <Box3D w={w1} d={d1} h={h1} cy={h1 / 2 + h2} cz={0} opacity={0.07} slab />
      <Box3D w={w2} d={d2} h={h2} cy={h2 / 2} cz={0} opacity={0.09} slab />
      <Box3D w={cap} d={cap * 0.55} h={cap * 0.5} cx={w2 / 2 - cap / 2} cy={-cap * 0.25} cz={d2 / 2 - cap * 0.3} opacity={0.16} slab />
    </div>
  );
}
