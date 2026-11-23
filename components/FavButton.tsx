"use client";
import { useFavorites } from "@/lib/favorites";

export default function FavButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const on = has(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
      className={`fav ${on ? "fav-on" : ""} ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <path
          d="M12 21s-7.5-4.6-9.6-9.2C1 8.7 2.8 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5c3.5 0 5.3 3.7 3.9 6.8C19.5 16.4 12 21 12 21Z"
          fill={on ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
