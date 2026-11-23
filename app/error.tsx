"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section text-center">
      <div className="wrap">
        <p className="hand text-xl">oops, something went wrong</p>
        <h1 className="text-5xl">We hit a snag</h1>
        <p className="mt-3 text-cocoa-soft">Please try again. If it keeps happening, message us on WhatsApp.</p>
        <button className="btn btn-primary mt-6" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
