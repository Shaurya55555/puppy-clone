"use client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = (d: number) => setI((i + d + n) % n);
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="gal-main">
        <Image
          key={images[i]}
          src={images[i]}
          alt={`${alt}, photo ${i + 1}`}
          fill
          sizes="(max-width:768px) 100vw, 560px"
          priority={i === 0}
          style={{ objectFit: "cover" }}
        />
        {n > 1 && (
          <>
            <button className="gal-btn" style={{ left: ".8rem" }} onClick={() => go(-1)} aria-label="Previous photo">
              ‹
            </button>
            <button className="gal-btn" style={{ right: ".8rem" }} onClick={() => go(1)} aria-label="Next photo">
              ›
            </button>
            <span className="gal-count">
              {i + 1} / {n}
            </span>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="thumbs">
          {images.map((src, k) => (
            <button key={src} className="thumb" aria-current={k === i} onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`}>
              <Image src={src} alt="" width={72} height={72} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
