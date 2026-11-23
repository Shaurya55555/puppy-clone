import { TEL, WA } from "@/lib/site";

export default function MobileBar() {
  return (
    <div className="mbar">
      <a href={WA} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
        WhatsApp us
      </a>
      <a href={TEL} className="btn btn-ghost">
        Call
      </a>
    </div>
  );
}
