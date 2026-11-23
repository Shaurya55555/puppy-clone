/** Original cartoon pup drawn for this project (not copied from the reference). */
export default function Mascot({ className = "", walking = false }: { className?: string; walking?: boolean }) {
  const ink = "#2a170e";
  return (
    <svg viewBox="0 0 220 190" className={`mascot ${walking ? "mascot-walk" : ""} ${className}`} aria-hidden focusable="false" style={{ overflow: "visible" }}>
      <ellipse cx="108" cy="182" rx="78" ry="6" fill={ink} opacity=".14" />
      <g className="m-body">
        {/* far legs */}
        <g className="m-leg m-leg-b">
          <rect x="66" y="128" width="20" height="46" rx="10" fill="#e4a352" stroke={ink} strokeWidth="4" />
          <rect x="128" y="128" width="20" height="46" rx="10" fill="#e4a352" stroke={ink} strokeWidth="4" />
        </g>
        {/* tail pom-pom */}
        <circle cx="26" cy="104" r="17" fill="#f2be6b" stroke={ink} strokeWidth="4" />
        <circle cx="21" cy="99" r="4" fill="#fbe3b4" />
        {/* body */}
        <ellipse cx="102" cy="116" rx="62" ry="44" fill="#f2be6b" stroke={ink} strokeWidth="4" />
        <path d="M70 100c8-8 18-10 28-8M84 128c8-6 18-6 26 0" stroke="#e4a352" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* near legs */}
        <g className="m-leg m-leg-a">
          <rect x="82" y="132" width="22" height="46" rx="11" fill="#f2be6b" stroke={ink} strokeWidth="4" />
          <rect x="146" y="132" width="22" height="46" rx="11" fill="#f2be6b" stroke={ink} strokeWidth="4" />
        </g>
        {/* head */}
        <g className="m-head">
          <circle cx="158" cy="62" r="13" fill="#f2be6b" stroke={ink} strokeWidth="4" />
          <circle cx="152" cy="30" r="22" fill="#f2be6b" stroke={ink} strokeWidth="4" />
          <circle cx="112" cy="76" r="24" fill="#e4a352" stroke={ink} strokeWidth="4" />
          <circle cx="196" cy="76" r="24" fill="#e4a352" stroke={ink} strokeWidth="4" />
          <circle cx="154" cy="82" r="46" fill="#f2be6b" stroke={ink} strokeWidth="4" />
          <circle cx="154" cy="40" r="20" fill="#f2be6b" />
          <circle cx="132" cy="80" r="6.5" fill={ink} />
          <circle cx="176" cy="80" r="6.5" fill={ink} />
          <circle cx="134" cy="77.5" r="2" fill="#fff" />
          <circle cx="178" cy="77.5" r="2" fill="#fff" />
          <ellipse cx="124" cy="96" rx="8" ry="5" fill="#f9cdbf" opacity=".9" />
          <ellipse cx="184" cy="96" rx="8" ry="5" fill="#f9cdbf" opacity=".9" />
          <ellipse cx="154" cy="94" rx="10" ry="7" fill={ink} />
          <path d="M154 100v6M144 108c4 5 16 5 20 0" stroke={ink} strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
        {/* collar */}
        <path d="M120 128c20 14 50 14 70 0" stroke="#a24a1a" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M155 138c-7-6-4-12 0-9 4-3 7 3 0 9Z" fill="#fbe3b4" stroke={ink} strokeWidth="2.4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
