import Image from "next/image";
import Link from "next/link";
import type { Puppy } from "@/lib/data";
import { cardSub, title } from "@/lib/puppy";
import FavButton from "./FavButton";

export default function PuppyCard({ p, priority }: { p: Puppy; priority?: boolean }) {
  return (
    <div className="card-wrap">
      <Link href={`/puppies/${p.slug}`} className="card">
        <div className="card-img">
          <Image
            src={p.images[0]}
            alt={`${title(p)}, ${p.gender} ${p.breed} puppy`}
            fill
            sizes="(max-width:640px) 90vw, 280px"
            priority={priority}
            style={{ objectFit: "cover" }}
          />
          <span className="badge">Available</span>
        </div>
        <div className="card-body">
          <h3>{title(p)}</h3>
          <p>{cardSub(p)}</p>
        </div>
      </Link>
      <FavButton slug={p.slug} name={title(p)} className="fav-card" />
    </div>
  );
}
