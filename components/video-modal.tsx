"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function VideoModal() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const [activeYtId, setActiveYtId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isStudio) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-yt]");
      if (target) {
        const ytId = target.getAttribute("data-yt");
        if (ytId) {
          e.preventDefault();
          setActiveYtId(ytId);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [isStudio]);

  useEffect(() => {
    if (isStudio) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeYtId) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [activeYtId, isStudio]);

  const handleClose = () => {
    setActiveYtId(null);
  };

  if (isStudio) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="video"
      className="video"
      onClick={handleBackdropClick}
      onClose={handleClose}
    >
      <button
        type="button"
        className="video__close"
        aria-label="Fechar vídeo"
        onClick={handleClose}
      >
        Fechar ✕
      </button>
      <div className="video__frame">
        {activeYtId && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
              activeYtId,
            )}?autoplay=1`}
            title="Vídeo da entrevista"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </dialog>
  );
}

export { extractYouTubeId } from "@/lib/youtube";
