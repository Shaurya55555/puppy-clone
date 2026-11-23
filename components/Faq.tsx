import { FAQ } from "@/lib/site";

export default function Faq({ limit }: { limit?: number }) {
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map(([q, a]) => (
        <details key={q} className="note">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
