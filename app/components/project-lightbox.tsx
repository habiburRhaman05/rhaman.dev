"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDialogBehavior } from "@/hooks/use-dialog-behavior";

import type { ProjectImage } from "@/lib/projects";

interface ProjectLightboxProps {
  items: ProjectImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SCALE_STEP = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ProjectLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: ProjectLightboxProps) {
  const reduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Active pointers, so one finger pans and two fingers pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const panStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const pinchStart = useRef({ distance: 0, scale: 1 });
  const swipeStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  const total = items.length;
  const item = items[index];
  const canNavigate = total > 1;

  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      onIndexChange((next + total) % total);
    },
    [onIndexChange, total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrevious = useCallback(() => goTo(index - 1), [goTo, index]);

  const zoomBy = useCallback((delta: number) => {
    setScale((current) => {
      const next = clamp(current + delta, MIN_SCALE, MAX_SCALE);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Reset zoom whenever the visible image changes.
  useEffect(() => {
    resetView();
  }, [index, resetView]);

  // Scroll lock, focus trap, focus restore and Escape handling.
  useDialogBehavior({
    containerRef: overlayRef,
    onClose,
    initialFocusRef: closeButtonRef,
  });

  // Arrow navigation and zoom shortcuts; Escape and Tab come from the hook.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          if (canNavigate) {
            event.preventDefault();
            goNext();
          }
          return;
        case "ArrowLeft":
          if (canNavigate) {
            event.preventDefault();
            goPrevious();
          }
          return;
        case "+":
        case "=":
          event.preventDefault();
          zoomBy(SCALE_STEP);
          return;
        case "-":
          event.preventDefault();
          zoomBy(-SCALE_STEP);
          return;
        case "0":
          event.preventDefault();
          resetView();
          return;
        default:
          return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canNavigate, goNext, goPrevious, resetView, zoomBy]);

  const clampOffset = useCallback(
    (next: { x: number; y: number }, currentScale: number) => {
      const stage = stageRef.current;
      if (!stage) return next;
      const maxX = (stage.clientWidth * (currentScale - 1)) / 2;
      const maxY = (stage.clientHeight * (currentScale - 1)) / 2;
      return {
        x: clamp(next.x, -maxX, maxX),
        y: clamp(next.y, -maxY, maxY),
      };
    },
    []
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
      };
      swipeStart.current = null;
      return;
    }

    if (scale > 1) {
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsPanning(true);
      panStart.current = {
        x: event.clientX,
        y: event.clientY,
        offsetX: offset.x,
        offsetY: offset.y,
      };
    } else {
      swipeStart.current = {
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
      };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size >= 2) {
      const [a, b] = Array.from(pointers.current.values());
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart.current.distance > 0) {
        const nextScale = clamp(
          (pinchStart.current.scale * distance) / pinchStart.current.distance,
          MIN_SCALE,
          MAX_SCALE
        );
        setScale(nextScale);
        if (nextScale === MIN_SCALE) setOffset({ x: 0, y: 0 });
      }
      return;
    }

    if (!isPanning) return;
    const next = {
      x: panStart.current.offsetX + (event.clientX - panStart.current.x),
      y: panStart.current.offsetY + (event.clientY - panStart.current.y),
    };
    setOffset(clampOffset(next, scale));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    const wasSinglePointer = pointers.current.size === 1;
    pointers.current.delete(event.pointerId);

    if (isPanning && pointers.current.size === 0) setIsPanning(false);

    if (start && wasSinglePointer && scale === 1) {
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;

      // Horizontal swipe navigation, only while the image is at fit size.
      if (
        canNavigate &&
        Math.abs(dx) > 60 &&
        Math.abs(dx) > Math.abs(dy) * 1.5
      ) {
        if (dx < 0) goNext();
        else goPrevious();
      } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        // A tap or click without movement zooms in.
        zoomBy(SCALE_STEP * 2);
      }
    }
    swipeStart.current = null;
  };

  // Registered natively so the listener is non-passive and can cancel the scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? SCALE_STEP / 2 : -SCALE_STEP / 2);
    };
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [zoomBy]);

  if (!item) return null;

  const zoomed = scale > 1;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-label={`Image viewer: ${item.caption || item.alt}`}
      className={cn(
        "fixed inset-0 z-[200] flex flex-col bg-background/95 backdrop-blur-xl",
        !reduceMotion && "animate-fade-in"
      )}
    >
      {/* Toolbar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {item.caption || item.alt}
          </p>
          <p
            className="text-xs text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            Image {index + 1} of {total}
            {item.note ? ` · ${item.note}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => zoomBy(-SCALE_STEP)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            className="min-w-[3.5rem] text-center font-mono text-xs text-muted-foreground"
            aria-hidden="true"
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoomBy(SCALE_STEP)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            disabled={!zoomed}
            aria-label="Reset zoom to fit"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <Maximize className="h-4 w-4" />
          </button>
          <span className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={cn(
            "relative h-full w-full touch-none select-none",
            zoomed ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          )}
        >
          <div
            className={cn(
              "relative h-full w-full",
              !reduceMotion && !isPanning && "transition-transform duration-200"
            )}
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-contain p-2 sm:p-6"
              priority
              draggable={false}
            />
          </div>
        </div>

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {canNavigate && (
        <div className="relative z-10 border-t border-border/60 px-4 py-3 sm:px-6">
          <ul className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {items.map((thumb, thumbIndex) => (
              <li key={`${thumb.src}-${thumbIndex}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onIndexChange(thumbIndex)}
                  aria-label={`View image ${thumbIndex + 1}: ${
                    thumb.caption || thumb.alt
                  }`}
                  aria-current={thumbIndex === index ? "true" : undefined}
                  className={cn(
                    "relative block h-12 w-20 overflow-hidden rounded-md border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    thumbIndex === index
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Image
                    src={thumb.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
