import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="wrap">
        <p className="hand text-xl">oops, this pup wandered off</p>
        <h1 className="text-6xl">Page not found</h1>
        <p className="mt-3 text-cocoa-soft">We couldn&apos;t find that page, but plenty of puppies are waiting.</p>
        <Link href="/puppies" className="btn btn-primary mt-6">View available puppies</Link>
      </div>
    </section>
  );
}
