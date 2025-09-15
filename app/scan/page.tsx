"use client";
import StackedCarouselContainer from "@/modules/scan/components/StackedCarousel";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function ScanPage() {
  const router = useRouter();

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
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<number | null>(null);

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

  // startCamera with automatic retry on transient errors (AbortError / NotReadable)
  const startCamera = useCallback(async () => {
    setError(null);
    setResult(null);
    setSnapshotDataUrl(null);
    retryCountRef.current = 0;

    const attempt = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera API not supported by this browser.");
        }
        let stream: MediaStream | null = null;
        try {
          // strict front camera
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "user" } },
            audio: false,
          });
        } catch (e: unknown) {
          const name = (e as Error)?.name;
          if (name === "OverconstrainedError" || name === "NotFoundError") {
            // relax to ideal front camera
            try {
              stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: "user" } },
                audio: false,
              });
            } catch {
              // as a last resort, pick a deviceId that looks like front/user
              try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const frontCam = devices.find(
                  (d) =>
                    d.kind === "videoinput" &&
                    /front|user|face|true/i.test(d.label)
                );
                if (frontCam) {
                  stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: frontCam.deviceId } },
                    audio: false,
                  });
                }
              } catch {
                // keep stream null; will be handled below
              }
            }
          } else {
            throw e;
          }
        }
        if (!stream) {
          // Final fallback: let the browser choose a camera (still might be front on some devices)
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }

        // clear any pending retry
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }

        streamRef.current = stream;
        // restart handler on track end to attempt recovery
        stream.getVideoTracks().forEach((t) => {
          t.onended = () => {
            // transient stop - try again once
            if (!streamRef.current) return;
            streamRef.current = null;
            setIsCameraOn(false);
            setError("Camera stopped. Retrying...");
            if (retryCountRef.current < 3) {
              retryCountRef.current++;
              retryTimeoutRef.current = window.setTimeout(attempt, 1000 * retryCountRef.current);
            }
          };
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // autoplay policies can reject play(); handle and retry if transient
          try {
            await videoRef.current.play();
          } catch (playErr: unknown) {
            const name = (playErr as Error)?.name;
            if (name === "AbortError" || name === "NotAllowedError") {
              if (name === "NotAllowedError") {
                setError("Permission to use the camera was denied.");
                stopCamera();
                return;
              }
              // transient: schedule retry
              if (retryCountRef.current < 5) {
                retryCountRef.current++;
                const delay = Math.min(30000, 500 * 2 ** retryCountRef.current);
                retryTimeoutRef.current = window.setTimeout(attempt, delay);
                setError("Autoplay blocked or aborted — retrying...");
                return;
              }
              setError("Unable to start video playback.");
              stopCamera();
              return;
            }
            setError("Video playback failed.");
            stopCamera();
            return;
          }
        }

        setIsCameraOn(true);
        retryCountRef.current = 0;
        setError(null);
      } catch (err: unknown) {
        const name = (err as Error)?.name;
        // permission error: do not retry
        if (name === "NotAllowedError" || name === "SecurityError") {
          setError("Permission to use the camera was denied.");
          stopCamera();
          return;
        }

        // treat AbortError / NotReadableError as transient and retry with backoff
        if (name === "AbortError" || name === "NotReadableError" || name === "OverconstrainedError") {
          if (retryCountRef.current < 5) {
            retryCountRef.current++;
            const delay = Math.min(30000, 500 * 2 ** retryCountRef.current);
            setError(`Camera unavailable, retrying in ${Math.round(delay / 1000)}s...`);
            retryTimeoutRef.current = window.setTimeout(attempt, delay);
            return;
          }
        }

        // non-transient or max retries reached
        setError((err as Error)?.message || "Failed to start the camera.");
        stopCamera();
      }
    };

    attempt();
  }, [stopCamera]);

  const capture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/png");
    setSnapshotDataUrl(dataUrl);

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
  }, []);

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [stopCamera]);

  useEffect(() => {
    const stream = streamRef.current;
    const video = videoRef.current;
    if (stream && video) {
      if (video.srcObject !== stream) {
        video.srcObject = stream;
        video.play().then(() => {
          console.log("Video playback started");
        });
      }
    }
  }, [isCameraOn]);

  // Handle auto scroll when result is shown
  const [showCard, setShowCard] = useState(true);

  // useEffect(() => {
  //   if (!result) {
  //     setShowCard(false);
  //     return;
  //   }
  //   setShowCard(true);
  //   const t = setTimeout(() => setShowCard(false), 5000);
  //   return () => clearTimeout(t);
  // }, [result]);

  // Show the card when result exists; do not auto-hide
  useEffect(() => {
    setShowCard(!!result);
  }, [result]);

  const onFeedback = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) {
        // proceed to carousel
        setShowCard(false);
      } else {
        // restart scanning
        setShowCard(false);
        reset();
        startCamera();
      }
    },
    [reset, startCamera]
  );

 // Auto-return home 10s after the result card collapses (carousel visible)
 useEffect(() => {
   if (!result || showCard) return;
   const t = window.setTimeout(() => {
     reset();
     router.replace("/");
   }, 10000);
   return () => clearTimeout(t);
 }, [result, showCard, reset, router]);

  return (
    <main className="min-h-screen h-screen w-screen">
      {!result && (
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center min-w-[672px] min-h-[512px]">
              {/* Live video - always mounted so ref exists when starting the camera */}
              <video
                ref={videoRef}
                className={
                  isCameraOn
                    ? "w-full rounded-md bg-black"
                    : "w-full rounded-md bg-black hidden"
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
                  className="w-full rounded-md object-contain"
                />
              )}

              {/* Hidden canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Processing overlay */}
              {isProcessing && (
                <div className="mt-4 flex items-center gap-3 text-gray-700">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
                  <span>Phân tích...</span>
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
                  Mở camera
                </button>
              )}

              {isCameraOn && (
                <>
                  <button
                    onClick={capture}
                    className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
                  >
                    Chụp
                  </button>
                  {/* <button
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Stop camera
                  </button> */}
                </>
              )}

              {!isCameraOn && !isProcessing && (snapshotDataUrl || result) && (
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Tải lại
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/*then StackedCarouselContainer */}
      {result && (
        <div className="flex items-center justify-center w-full h-full mx-auto">
          {/* Card display for 5 second then transition w-0 */}
          <div
            className={`relative flex flex-col items-center justify-center ${showCard ? "w-full max-w-96 py-8" : "w-0 py-0 opacity-0"} transition-all duration-500 overflow-hidden`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <div className="text-green-600 font-bold text-4xl mb-4">
              <div>Đây là</div>
              <div>hộp thức ăn thừa</div>
            </div>
            <div className="relative bg-white p-4 mt-4 border-t-[1px] border-black shadow-lg -rotate-2">
              <img
                src="/box.png"
                alt="Food Waste Box"
                className="w-48 h-48 md:w-64 md:h-64"
              />
              <Search className="absolute text-[#75A08C] -bottom-10 -left-10 size-24" />
            </div>

            {/* Feedback actions */}
            <div className="mt-16 flex items-center gap-3">
              <button
                onClick={() => onFeedback(true)}
                className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800"
              >
                Đúng ròi nhé
              </button>
              <button
                onClick={() => onFeedback(false)}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Sai ròi phải quét lại thôi!!!
              </button>
            </div>
          </div>

          {/* after that grow StackedCarouselContainer */}
          {!showCard && (
          <div
            className={`${showCard ? "w-0 flex-grow-0 flex-shrink-0 opacity-0" : "flex-1 opacity-100"} transition-all duration-500`}
          >
            <StackedCarouselContainer startDelay={5000}/>
            {/* <div className="w-full flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setShowCard(true);
                  reset();
                  router.replace("/");
                }}
                className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 h-16 w-32"
              >
                Home
              </button>
            </div> */}
          </div>
          )}
        </div>
      )}

      {/* ------------------------- */}
    </main>
  );
}
