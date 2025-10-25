import React, { useEffect, useRef } from "react";
// Import the web component. This registers the <model-viewer> custom element.
import "@google/model-viewer";

type Props = {
  src?: string;
  poster?: string;
  height?: string | number;
  autoRotate?: boolean;
  cameraOrbit?: string; // e.g. "auto auto auto"
  fieldOfView?: string; // e.g. "45deg"
  exposure?: number;
};

export default function GLBViewer({
  src = `${import.meta.env.BASE_URL}Robot_new.glb`,
  poster,
  height = "75vh",
  autoRotate = false,
  cameraOrbit = "auto auto auto",
  fieldOfView = "45deg",
  exposure = 1.0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Nothing required; model-viewer handles its own lifecycle.
  }, []);

  return (
    <div
      className="w-full rounded-lg border border-border bg-card overflow-hidden"
      style={{ height }}
    >
      {/* @ts-expect-error - custom element provided by @google/model-viewer */}
      <model-viewer
        ref={ref as any}
        src={src}
        alt="Interactive 3D model"
        poster={poster}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        autoplay
        interaction-prompt="auto"
        shadow-intensity="0.8"
        exposure={exposure}
        camera-orbit={cameraOrbit}
        field-of-view={fieldOfView}
        environment-image="neutral"
        style={{ width: "100%", height: "100%", background: "#fff" }}
        data-js-focus-visible
        {...(autoRotate ? { "auto-rotate": true } : {})}
      />
    </div>
  );
}

