"use client";
import StackedCarouselContainer from "@/modules/scan/components/StackedCarousel";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const scrollIntervalRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const stopCamera = useCallback(() => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setResult(null);
    setSnapshotDataUrl(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API not supported by this browser.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraOn(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(
          e.name === "NotAllowedError"
            ? "Permission to use the camera was denied."
            : e.message || "Failed to start the camera."
        );
      } else {
        setError("Failed to start the camera.");
      }
      stopCamera();
    }
  }, [stopCamera]);

  const capture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Size the canvas to the video frame
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, width, height);

    // Get snapshot as data URL for preview
    const dataUrl = canvas.toDataURL("image/png");
    setSnapshotDataUrl(dataUrl);

    // Stop camera after capture as requested
    stopCamera();

    setIsProcessing(true);
    setResult(null);
    await new Promise((res) => setTimeout(res, 2000));
    setIsProcessing(false);
    setResult("Plastic bottle");
  }, [stopCamera]);

  const reset = useCallback(() => {
    setError(null);
    setIsProcessing(false);
    setSnapshotDataUrl(null);
    setResult(null);

    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    startCamera();
  }, [])
  
  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  useEffect(() => {
    const stream = streamRef.current;
    const video = videoRef.current;
    if (stream && video) {
      if (video.srcObject !== stream) {
        video.srcObject = stream;
        video
          .play()
          .then(() => {
            console.log("Video playback started");
          })
          .catch(() => {
            // ignore play errors
          });
      }
    }
  }, [isCameraOn]);

  return (
    <main className="min-h-screen w-screen bg-[#F5F3E6]">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid gap-6">
          <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center">
            {/* Live video - always mounted so ref exists when starting the camera */}
            <video
              ref={videoRef}
              className={
                isCameraOn
                  ? "w-full max-h-[60vh] rounded-md bg-black"
                  : "w-full max-h-[60vh] rounded-md bg-black hidden"
              }
              playsInline
              muted
              autoPlay
            />

            {/* Snapshot preview */}
            {!isCameraOn && snapshotDataUrl && (
              <img
                src={snapshotDataUrl}
                alt="Captured snapshot"
                className="w-full max-h-[60vh] rounded-md object-contain"
              />
            )}

            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Processing overlay */}
            {isProcessing && (
              <div className="mt-4 flex items-center gap-3 text-gray-700">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
                <span>Processing...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!isCameraOn && !isProcessing && (
              <button
                onClick={startCamera}
                className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
              >
                Turn on camera
              </button>
            )}

            {isCameraOn && (
              <>
                <div
                  onClick={capture}
                  className="size-20 bg-transparent"
                >
                </div>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Stop camera
                </button>
              </>
            )}

            {!isCameraOn && !isProcessing && (snapshotDataUrl || result) && (
              <button
                onClick={reset}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <StackedCarouselContainer />
      </div>
    </main>
  );
}
