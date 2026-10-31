import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  drag: number;
  gravity: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  trail: { x: number; y: number }[];
  maxTrail: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

/**
 * Computes a point (x, y), tangent unit vector (tx, ty), and outward normal (nx, ny)
 * at progress t in [0, 1] along a rounded rectangle perimeter starting at top-center.
 */
function getRoundedRectPoint(
  x0: number,
  y0: number,
  w: number,
  h: number,
  r: number,
  t: number
): { x: number; y: number; tx: number; ty: number; nx: number; ny: number } {
  const radius = Math.min(r, w / 2, h / 2);
  const topHalf = w / 2 - radius;
  const rightSide = h - 2 * radius;
  const bottomSide = w - 2 * radius;
  const leftSide = h - 2 * radius;
  const arcLen = (Math.PI / 2) * radius;

  const segments = [
    topHalf,    // 0: top-center to top-right arc
    arcLen,     // 1: top-right arc
    rightSide,  // 2: right edge
    arcLen,     // 3: bottom-right arc
    bottomSide, // 4: bottom edge
    arcLen,     // 5: bottom-left arc
    leftSide,   // 6: left edge
    arcLen,     // 7: top-left arc
    topHalf,    // 8: top-left arc back to top-center
  ];

  const totalLen = segments.reduce((a, b) => a + b, 0);
  const clampedT = Math.max(0, Math.min(1, t));
  let dist = clampedT * totalLen;

  let segIdx = 0;
  for (let i = 0; i < segments.length; i++) {
    if (dist <= segments[i] || i === segments.length - 1) {
      segIdx = i;
      break;
    }
    dist -= segments[i];
  }

  const u = segments[segIdx] > 0 ? dist / segments[segIdx] : 0;

  let x = 0;
  let y = 0;
  let tx = 1;
  let ty = 0;

  switch (segIdx) {
    case 0:
      x = x0 + w / 2 + u * topHalf;
      y = y0;
      tx = 1;
      ty = 0;
      break;
    case 1: {
      const ang = -Math.PI / 2 + u * (Math.PI / 2);
      x = x0 + w - radius + Math.cos(ang) * radius;
      y = y0 + radius + Math.sin(ang) * radius;
      tx = -Math.sin(ang);
      ty = Math.cos(ang);
      break;
    }
    case 2:
      x = x0 + w;
      y = y0 + radius + u * rightSide;
      tx = 0;
      ty = 1;
      break;
    case 3: {
      const ang = u * (Math.PI / 2);
      x = x0 + w - radius + Math.cos(ang) * radius;
      y = y0 + h - radius + Math.sin(ang) * radius;
      tx = -Math.sin(ang);
      ty = Math.cos(ang);
      break;
    }
    case 4:
      x = x0 + w - radius - u * bottomSide;
      y = y0 + h;
      tx = -1;
      ty = 0;
      break;
    case 5: {
      const ang = Math.PI / 2 + u * (Math.PI / 2);
      x = x0 + radius + Math.cos(ang) * radius;
      y = y0 + h - radius + Math.sin(ang) * radius;
      tx = -Math.sin(ang);
      ty = Math.cos(ang);
      break;
    }
    case 6:
      x = x0;
      y = y0 + h - radius - u * leftSide;
      tx = 0;
      ty = -1;
      break;
    case 7: {
      const ang = Math.PI + u * (Math.PI / 2);
      x = x0 + radius + Math.cos(ang) * radius;
      y = y0 + radius + Math.sin(ang) * radius;
      tx = -Math.sin(ang);
      ty = Math.cos(ang);
      break;
    }
    case 8:
      x = x0 + radius + u * topHalf;
      y = y0;
      tx = 1;
      ty = 0;
      break;
  }

  return { x, y, tx, ty, nx: ty, ny: -tx };
}

const PAD = 64;

const GoldenFirework: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let startTimer: number | undefined;

    const startAnimation = () => {
      cancelAnimationFrame(rafId);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cardW = parent.offsetWidth;
      const cardH = parent.offsetHeight;
      const cw = cardW + PAD * 2;
      const ch = cardH + PAD * 2;

      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computedRadius =
        parseFloat(window.getComputedStyle(parent).borderRadius) || 24;

      const goldColors = ["#fffef0", "#fef08a", "#fcd34d", "#f59e0b", "#fbbf24"];
      const sparks: Spark[] = [];
      // Rolling window of border points so the glowing border line shines strongly as it passes and turns off behind it
      const borderTrail: { x: number; y: number }[] = [];
      const maxBorderTrail = 34;

      const totalLapFrames = 105; // ~1.7s for one brisk lap
      let frame = 0;
      let lapFinished = false;
      let finishBurstAlpha = 0;
      let finishX = PAD + cardW / 2;
      let finishY = PAD;

      const emitMiniBurst = (bx: number, by: number) => {
        finishBurstAlpha = 0.92;
        finishX = bx;
        finishY = by;

        // Longer-lasting golden willow & glittering embers on final burst
        for (let i = 0; i < 52; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.8 + Math.random() * 2.9;
          sparks.push({
            x: bx,
            y: by,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.45,
            drag: 0.962 + Math.random() * 0.012,
            gravity: 0.022 + Math.random() * 0.012,
            alpha: 1,
            decay: 0.0075 + Math.random() * 0.006,
            size: 1.0 + Math.random() * 0.85,
            color: goldColors[Math.floor(Math.random() * goldColors.length)],
            trail: [{ x: bx, y: by }],
            maxTrail: 11,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.28 + Math.random() * 0.25,
          });
        }
      };

      const drawTravelingGlowingBorder = (points: { x: number; y: number }[]) => {
        if (points.length < 2) return;

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          // Smooth curve from 0 at the tail to 1 at the leading head
          const ratio = Math.pow(i / (points.length - 1), 1.6);

          // 1. Thin golden aura hugging the border line
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.shadowColor = "rgba(245, 158, 11, 0.9)";
          ctx.shadowBlur = 7 * ratio;
          ctx.strokeStyle = `rgba(245, 158, 11, ${ratio * 0.55})`;
          ctx.lineWidth = 1 + ratio * 3.0;
          ctx.stroke();

          // 2. Fine 24k gold border line
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.shadowColor = "#fbbf24";
          ctx.shadowBlur = 4 * ratio;
          ctx.strokeStyle = `rgba(252, 211, 77, ${ratio * 0.95})`;
          ctx.lineWidth = 0.7 + ratio * 1.6;
          ctx.stroke();

          // 3. Razor-thin white-gold core right on the border
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.shadowBlur = 2 * ratio;
          ctx.strokeStyle = `rgba(255, 254, 240, ${ratio})`;
          ctx.lineWidth = 0.4 + ratio * 0.9;
          ctx.stroke();
        }

        ctx.restore();
      };

      const render = () => {
        ctx.clearRect(0, 0, cw, ch);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        if (!lapFinished) {
          frame++;
          const rawT = Math.min(1, frame / totalLapFrames);
          const t =
            rawT < 0.5
              ? 2 * rawT * rawT
              : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

          const pt = getRoundedRectPoint(
            PAD,
            PAD,
            cardW,
            cardH,
            computedRadius,
            t
          );

          borderTrail.push({ x: pt.x, y: pt.y });
          if (borderTrail.length > maxBorderTrail) {
            borderTrail.shift();
          }

          // Draw the glowing border segment that turns off behind as it advances
          drawTravelingGlowingBorder(borderTrail);

          // Compact golden sparkler head on the border
          const headGlow = ctx.createRadialGradient(
            pt.x,
            pt.y,
            0,
            pt.x,
            pt.y,
            13
          );
          headGlow.addColorStop(0, "rgba(255, 255, 245, 1)");
          headGlow.addColorStop(0.3, "rgba(254, 240, 138, 0.9)");
          headGlow.addColorStop(0.65, "rgba(245, 158, 11, 0.35)");
          headGlow.addColorStop(1, "rgba(245, 158, 11, 0)");

          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 13, 0, Math.PI * 2);
          ctx.fill();

          // Emit fine golden firework sparks spraying from the border
          for (let s = 0; s < 2; s++) {
            const spread = (Math.random() - 0.5) * 1.4;
            const outPush = 0.35 + Math.random() * 1.3;
            const backPush = -0.6 - Math.random() * 1.3;

            const vx =
              pt.tx * backPush +
              pt.nx * outPush +
              (Math.random() - 0.5) * spread;
            const vy =
              pt.ty * backPush +
              pt.ny * outPush +
              (Math.random() - 0.5) * spread;

            sparks.push({
              x: pt.x + (Math.random() - 0.5) * 1.5,
              y: pt.y + (Math.random() - 0.5) * 1.5,
              vx,
              vy,
              drag: 0.93,
              gravity: 0.03,
              alpha: 0.95,
              decay: 0.032 + Math.random() * 0.02,
              size: 0.85 + Math.random() * 0.65,
              color: goldColors[Math.floor(Math.random() * goldColors.length)],
              trail: [{ x: pt.x, y: pt.y }],
              maxTrail: 5,
              twinklePhase: Math.random() * Math.PI * 2,
              twinkleSpeed: 0.35 + Math.random() * 0.3,
            });
          }

          if (frame >= totalLapFrames) {
            lapFinished = true;
            emitMiniBurst(pt.x, pt.y);
          }
        } else if (borderTrail.length > 0) {
          // Quickly drain the tail so the border line turns off cleanly
          borderTrail.shift();
          borderTrail.shift();
          borderTrail.shift();
          drawTravelingGlowingBorder(borderTrail);
        }

        // Compact golden burst flash at completion point
        if (finishBurstAlpha > 0.01) {
          const g = ctx.createRadialGradient(
            finishX,
            finishY,
            0,
            finishX,
            finishY,
            24
          );
          g.addColorStop(0, `rgba(255, 253, 240, ${finishBurstAlpha})`);
          g.addColorStop(0.4, `rgba(252, 211, 77, ${finishBurstAlpha * 0.6})`);
          g.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(finishX, finishY, 24, 0, Math.PI * 2);
          ctx.fill();
          finishBurstAlpha *= 0.91;
        }

        // Update & draw sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const sp = sparks[i];
          sp.vx *= sp.drag;
          sp.vy = sp.vy * sp.drag + sp.gravity;
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.alpha -= sp.decay;
          sp.twinklePhase += sp.twinkleSpeed;

          if (sp.alpha <= 0.01) {
            sparks.splice(i, 1);
            continue;
          }

          sp.trail.push({ x: sp.x, y: sp.y });
          if (sp.trail.length > sp.maxTrail) sp.trail.shift();

          const flicker =
            sp.alpha < 0.5
              ? 0.45 + 0.55 * Math.pow(Math.sin(sp.twinklePhase), 2)
              : 1;
          const a = Math.max(0, Math.min(1, sp.alpha * flicker));

          if (sp.trail.length > 1) {
            for (let j = 1; j < sp.trail.length; j++) {
              const p0 = sp.trail[j - 1];
              const p1 = sp.trail[j];
              const seg = j / sp.trail.length;
              ctx.beginPath();
              ctx.moveTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.strokeStyle = `rgba(245, 178, 35, ${a * seg * 0.75})`;
              ctx.lineWidth = sp.size * seg * 1.2;
              ctx.lineCap = "round";
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${a * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 0.9, 0, Math.PI * 2);
          ctx.fillStyle =
            sp.alpha > 0.55
              ? `rgba(255, 253, 240, ${a})`
              : `rgba(252, 211, 77, ${a})`;
          ctx.fill();
        }

        ctx.restore();

        if (
          lapFinished &&
          borderTrail.length === 0 &&
          sparks.length === 0 &&
          finishBurstAlpha <= 0.01
        ) {
          ctx.clearRect(0, 0, cw, ch);
          return;
        }

        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimer = window.setTimeout(startAnimation, 150);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(parent);

    return () => {
      if (startTimer) clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -PAD,
        left: -PAD,
        width: `calc(100% + ${PAD * 2}px)`,
        height: `calc(100% + ${PAD * 2}px)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};

export default GoldenFirework;
