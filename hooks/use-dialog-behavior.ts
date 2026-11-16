"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Open dialogs, outermost first. Only the topmost one reacts to Escape, so a
 * lightbox opened from inside a modal closes itself without also closing the
 * modal underneath it.
 */
const dialogStack: symbol[] = [];

interface DialogBehaviorOptions {
  /** The dialog surface; focus is trapped inside it. */
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  /** Focused on open. Falls back to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Modal behaviour shared by the details modal and the image lightbox: locks
 * background scrolling, moves focus in and back out, closes on Escape and
 * keeps Tab inside the dialog.
 */
export function useDialogBehavior({
  containerRef,
  onClose,
  initialFocusRef,
}: DialogBehaviorOptions) {
  const idRef = useRef<symbol | undefined>(undefined);
  if (!idRef.current) idRef.current = Symbol("dialog");

  // Register in the stack for the dialog's lifetime.
  useLayoutEffect(() => {
    const id = idRef.current!;
    dialogStack.push(id);
    return () => {
      const index = dialogStack.indexOf(id);
      if (index !== -1) dialogStack.splice(index, 1);
    };
  }, []);

  // Lock background scrolling, compensating for the scrollbar width.
  useLayoutEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - body.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  // Move focus in on open, and restore it to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const target =
      initialFocusRef?.current ??
      containerRef.current?.querySelector<HTMLElement>(FOCUSABLE) ??
      containerRef.current;
    target?.focus?.();
    return () => previouslyFocused?.focus?.();
    // Runs once: the refs are stable for the dialog's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape to close, Tab cycles within the dialog.
  useEffect(() => {
    const isTopmost = () =>
      dialogStack[dialogStack.length - 1] === idRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!isTopmost()) return;
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !isTopmost()) return;

      const container = containerRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [containerRef, onClose]);

  return { isTopmost: () => dialogStack[dialogStack.length - 1] === idRef.current };
}
