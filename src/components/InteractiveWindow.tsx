"use client";

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * InteractiveWindow — makes a composition feel like a physical object:
 * it tilts toward the cursor (CSS 3D perspective) and can be grabbed and
 * dragged around within gentle bounds, with a slight "lift" while held.
 *
 * Pure pointer events + one transformed layer + a rAF lerp loop — no
 * animation library (architecture.md: zero extra runtime dependencies).
 * Without JavaScript it renders static; all motion is disabled under
 * prefers-reduced-motion. Touch keeps vertical scrolling (touch-pan-y) so
 * horizontal drags move the window without trapping the page.
 *
 * Depth is real 3D: give children `translateZ(n)` inside this wrapper and
 * they sit above the window plane, parallaxing naturally when the layer
 * rotates. Double-click glides the window back to its resting spot.
 */

const MAX_TILT = 7; // deg — max rotation toward the cursor
const MAX_SHIFT_X = 72; // px — drag bounds
const MAX_SHIFT_Y = 48;
const DRAG_SCALE = 1.02; // slight lift while dragging
const LERP = 0.14; // easing toward targets per frame

type Motion = {
  cRX: number; cRY: number; cDX: number; cDY: number; cSC: number; // current
  tRX: number; tRY: number; tDX: number; tDY: number; tSC: number; // targets
  hovering: boolean; dragging: boolean;
  startX: number; startY: number; baseDX: number; baseDY: number;
  raf: number; running: boolean; reduced: boolean;
};

export function InteractiveWindow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const s = useRef<Motion>({
    cRX: 0, cRY: 0, cDX: 0, cDY: 0, cSC: 1,
    tRX: 0, tRY: 0, tDX: 0, tDY: 0, tSC: 1,
    hovering: false, dragging: false,
    startX: 0, startY: 0, baseDX: 0, baseDY: 0,
    raf: 0, running: false, reduced: false,
  }).current;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      s.reduced = e.matches;
    };
    mq.addEventListener("change", onChange);

    const layer = layerRef.current;
    return () => {
      mq.removeEventListener("change", onChange);
      cancelAnimationFrame(s.raf);
      s.running = false;
      if (layer) layer.style.transform = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tick() {
    s.cRX += (s.tRX - s.cRX) * LERP;
    s.cRY += (s.tRY - s.cRY) * LERP;
    s.cDX += (s.tDX - s.cDX) * LERP;
    s.cDY += (s.tDY - s.cDY) * LERP;
    s.cSC += (s.tSC - s.cSC) * LERP;

    const settled =
      !s.dragging &&
      !s.hovering &&
      Math.abs(s.cRX - s.tRX) < 0.01 &&
      Math.abs(s.cRY - s.tRY) < 0.01 &&
      Math.abs(s.cDX - s.tDX) < 0.05 &&
      Math.abs(s.cDY - s.tDY) < 0.05 &&
      Math.abs(s.cSC - s.tSC) < 0.001;

    const layer = layerRef.current;
    if (layer) {
      layer.style.transform = `translate3d(${s.cDX.toFixed(2)}px, ${s.cDY.toFixed(2)}px, 0) rotateX(${s.cRX.toFixed(2)}deg) rotateY(${s.cRY.toFixed(2)}deg) scale(${s.cSC.toFixed(3)})`;
    }

    if (settled) {
      s.running = false;
      return;
    }
    s.raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (!s.running && !s.reduced) {
      s.running = true;
      s.raf = requestAnimationFrame(tick);
    }
  }

  function pointTilt(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    s.tRY = (px - 0.5) * 2 * MAX_TILT;
    s.tRX = -(py - 0.5) * 2 * MAX_TILT;
  }

  return (
    <div
      ref={areaRef}
      className={cn(
        "relative touch-pan-y select-none cursor-grab [perspective:1200px]",
        className
      )}
      onPointerEnter={() => {
        s.hovering = true;
        wake();
      }}
      onPointerMove={(e) => {
        if (s.reduced) return;
        if (s.dragging) {
          s.tDX = Math.max(
            -MAX_SHIFT_X,
            Math.min(MAX_SHIFT_X, s.baseDX + (e.clientX - s.startX))
          );
          s.tDY = Math.max(
            -MAX_SHIFT_Y,
            Math.min(MAX_SHIFT_Y, s.baseDY + (e.clientY - s.startY))
          );
        }
        pointTilt(e);
        wake();
      }}
      onPointerLeave={() => {
        s.hovering = false;
        if (!s.dragging) {
          s.tRX = 0;
          s.tRY = 0;
          s.tSC = 1;
          wake();
        }
      }}
      onPointerDown={(e) => {
        if (s.reduced || e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        s.dragging = true;
        s.startX = e.clientX;
        s.startY = e.clientY;
        s.baseDX = s.tDX;
        s.baseDY = s.tDY;
        s.tSC = DRAG_SCALE;
        if (areaRef.current) areaRef.current.style.cursor = "grabbing";
        wake();
      }}
      onPointerUp={(e) => {
        if (!s.dragging) return;
        s.dragging = false;
        s.tSC = 1;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* pointer already released */
        }
        if (areaRef.current) areaRef.current.style.cursor = "";
        // If the pointer ended outside the area, ease the tilt home too.
        const rect = e.currentTarget.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (!inside) {
          s.tRX = 0;
          s.tRY = 0;
        }
        wake();
      }}
      onPointerCancel={() => {
        s.dragging = false;
        s.tSC = 1;
        if (areaRef.current) areaRef.current.style.cursor = "";
        wake();
      }}
      onDoubleClick={() => {
        s.tDX = 0;
        s.tDY = 0;
        wake();
      }}
    >
      <div
        ref={layerRef}
        className="relative [transform-style:preserve-3d] [will-change:transform]"
      >
        {children}
      </div>
    </div>
  );
}
