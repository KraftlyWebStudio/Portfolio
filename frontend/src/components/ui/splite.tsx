"use client";
import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";

type SplineSceneProps = {
  scene: string;
  className?: string;
};

export const SplineScene = ({ scene, className }: SplineSceneProps) => {
  return (
    <div className={cn("w-full h-full min-h-[500px]", className)}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/20 animate-pulse">
          <div className="loader" />
        </div>
      }>
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
};
