"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDialogBehavior } from "@/hooks/use-dialog-behavior";

interface ModalProps {
  /** Id of the element labelling the dialog, usually its heading. */
  labelledBy: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

/**
 * Accessible modal shell: portalled to the body, focus-trapped, Escape to
 * close, background scroll locked and focus restored to the trigger.
 *
 * Built on the shared dialog hook rather than Radix Dialog, whose current
 * release pulls in React 19's `useEffectEvent` and cannot run on this
 * project's React 18.
 */
export default function Modal({
  labelledBy,
  onClose,
  className,
  children,
}: ModalProps) {
  const reduceMotion = useReducedMotion();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useDialogBehavior({ containerRef: surfaceRef, onClose });

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <div
        className={cn(
          "absolute inset-0 bg-background/85 backdrop-blur-sm",
          !reduceMotion && "animate-fade-in"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 top-0 mx-auto flex w-full flex-col border-border bg-background shadow-2xl focus:outline-none sm:inset-y-6 sm:rounded-2xl sm:border",
          !reduceMotion && "animate-fade-in",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
