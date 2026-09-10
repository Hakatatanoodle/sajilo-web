"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * InteractiveWindow — a two-sided 3D showcase object.
 *
 * Horizontal drag spins it a full 360° (and beyond, with fling inertia and
 * friction); vertical drag tilts it; left alone it slowly turntables. The
 * front face is the composition passed as `front`; the back face is `back` —
 * a designed navy card — so flipping it over reveals something, not a mirror.
 *
 * Depth cues (the "magic"): a ground shadow that skews with the spin and
 * thins edge-on, softens as the object lifts toward the viewer while held,
 * a sheen that travels across the glass with rotation, and a gentle bob.
 * Real translateZ children on the front face parallax naturally.
 *
 * Pure pointer events + CSS 3D + one rAF loop — no animation library
 * (architecture.md: zero extra runtime deps). No-JS visitors see the static
 * front face. prefers-reduced-motion: no idle spin/inertia/bob, but direct
 * drag rotation still works (user-initiated motion is OK).
 */

const IDLE_SPEED = 0.08; // deg/frame — slow turntable drift
const FRICTION = 0.94; // fling decay
const REST_RX = -5; // resting tilt (deg) — looks 3D even at rest
const MAX_RX = 30; // tilt clamp
const LIFT_Z = 60; // px toward viewer while grabbed
const ROT_SPEED = 0.4; // deg per px, horizontal
const TILT_SPEED = 0.3; // deg per px, vertical

type Motion = {
  cRY: number; cRX: number; cLZ: number; cSC: number; vRY: number;
  dragging: boolean; idleOn: boolean; idleTimer: number; restRy: number | null;
  raf: number; running: boolean; reduced: boolean;
  lastX: number; lastY: number;
};

export function InteractiveWindow({
  front,
  back,
  className,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const s = useRef<Motion>({
    cRY: -18, cRX: REST_RX, cLZ: 0, cSC: 1, vRY: 0,
    dragging: false, idleOn: false, idleTimer: 0, restRy: null,
    raf: 0, running: false, reduced: false,
    lastX: 0, lastY: 0,
  }).current;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      s.reduced = e.matches;
    };
    mq.addEventListener("change", onChange);
    const t = window.setTimeout(() => {
      s.idleOn = true;
      wake();
    }, 2800);
    return () => {
      mq.removeEventListener("change", onChange);
      window.clearTimeout(t);
      window.clearTimeout(s.idleTimer);
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tick() {
    if (!s.dragging) {
      if (s.restRy !== null) {
        s.cRY += (s.restRy - s.cRY) * (s.reduced ? 1 : 0.1);
        if (Math.abs(s.restRy - s.cRY) < 0.15) {
          s.cRY = s.restRy;
          s.restRy = null;
        }
      } else if (Math.abs(s.vRY) > 0.02) {
        s.cRY += s.vRY;
        s.vRY *= FRICTION;
        if (s.reduced) s.vRY = 0;
      } else {
        s.vRY = 0;
        s.cRX += (REST_RX - s.cRX) * (s.reduced ? 1 : 0.08);
        if (s.idleOn && !s.reduced) s.cRY += IDLE_SPEED;
      }
    }
    s.cLZ += ((s.dragging ? LIFT_Z : 0) - s.cLZ) * (s.reduced ? 1 : 0.12);
    s.cSC += ((s.dragging ? 1.03 : 1) - s.cSC) * (s.reduced ? 1 : 0.15);

    const bob = s.reduced ? 0 : Math.sin(performance.now() / 900) * 3;

    const layer = layerRef.current;
    if (layer) {
      layer.style.transform = `translate3d(0px, ${bob.toFixed(2)}px, ${s.cLZ.toFixed(1)}px) rotateX(${s.cRX.toFixed(2)}deg) rotateY(${s.cRY.toFixed(2)}deg) scale(${s.cSC.toFixed(3)})`;
    }

    const shadow = shadowRef.current;
    if (shadow) {
      const rad = (s.cRY * Math.PI) / 180;
      const offX = Math.sin(rad) * 26;
      const sx = 0.6 + 0.4 * Math.abs(Math.cos(rad));
      const liftK = s.cLZ / LIFT_Z;
      shadow.style.transform = `translateX(calc(-50% + ${offX.toFixed(1)}px)) scaleX(${(sx + liftK * 0.08).toFixed(3)})`;
      shadow.style.opacity = String(Math.max(0.08, 0.28 - liftK * 0.12));
    }
    const sheen = sheenRef.current;
    if (sheen) {
      sheen.style.backgroundPositionX = `${((((s.cRY % 360) + 360) % 360) / 3.6).toFixed(1)}%`;
    }

    const busy =
      s.dragging ||
      s.idleOn ||
      s.restRy !== null ||
      Math.abs(s.vRY) > 0.02 ||
      Math.abs(s.cRX - REST_RX) > 0.05 ||
      Math.abs(s.cLZ) > 0.5 ||
      Math.abs(s.cSC - 1) > 0.002;
    if (busy) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.running = false;
    }
  }

  function wake() {
    if (!s.running) {
      s.running = true;
      s.raf = requestAnimationFrame(tick);
    }
  }

  function idleOff() {
    s.idleOn = false;
    window.clearTimeout(s.idleTimer);
  }

  function idleSoon() {
    window.clearTimeout(s.idleTimer);
    s.idleTimer = window.setTimeout(() => {
      s.idleOn = true;
      wake();
    }, 3500);
  }

  return (
    <div
      ref={areaRef}
      className={cn(
        "relative touch-pan-y select-none cursor-grab [perspective:1400px] [perspective-origin:50%_40%]",
        className
      )}
      onPointerEnter={() => {
        idleOff();
        wake();
      }}
      onPointerLeave={() => {
        idleSoon();
        wake();
      }}
      onPointerMove={(e) => {
        if (!s.dragging) return;
        const dx = e.clientX - s.lastX;
        const dy = e.clientY - s.lastY;
        s.cRY += dx * ROT_SPEED;
        if (!s.reduced) s.vRY = s.vRY * 0.5 + dx * ROT_SPEED * 0.5;
        s.cRX = Math.max(-MAX_RX, Math.min(MAX_RX, s.cRX + dy * TILT_SPEED));
        s.lastX = e.clientX;
        s.lastY = e.clientY;
        wake();
      }}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        idleOff();
        s.dragging = true;
        s.restRy = null;
        s.vRY = 0;
        s.lastX = e.clientX;
        s.lastY = e.clientY;
        if (areaRef.current) areaRef.current.style.cursor = "grabbing";
        wake();
      }}
      onPointerUp={(e) => {
        if (!s.dragging) return;
        s.dragging = false;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* pointer already released */
        }
        if (areaRef.current) areaRef.current.style.cursor = "";
        idleSoon();
        wake();
      }}
      onPointerCancel={() => {
        s.dragging = false;
        if (areaRef.current) areaRef.current.style.cursor = "";
        idleSoon();
        wake();
      }}
      onDoubleClick={() => {
        // Glide back to the front face, nearest full turn.
        s.vRY = 0;
        s.restRy = Math.round(s.cRY / 360) * 360;
        wake();
      }}
    >
      {/* Ground shadow — skews with the spin, thins edge-on, softens on lift. */}
      <div
        ref={shadowRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-9 left-1/2 h-7 w-[72%] -translate-x-1/2 rounded-[100%] bg-navy/30 blur-md"
      />

      <div
        ref={layerRef}
        className="relative [transform-style:preserve-3d] [will-change:transform]"
      >
        <div className="relative [transform-style:preserve-3d] backface-hidden">
          {front}
          {/* Sheen — travels across the glass as the window rotates. */}
          <div
            ref={sheenRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
              backgroundSize: "220% 100%",
              backgroundPositionX: "0%",
            }}
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-2xl border border-navy-deep bg-navy [transform:rotateY(180deg)_translateZ(2px)] backface-hidden"
        >
          {back}
        </div>
      </div>
    </div>
  );
}
