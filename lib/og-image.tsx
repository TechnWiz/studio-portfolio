/** Shared local social-preview composition for localized landing and case pages. */
export function OgImage({ title, eyebrow, studioName, location }: { title: string; eyebrow: string; studioName: string; location: string }) {
  return <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, color: "#f2f0ed", background: "radial-gradient(ellipse at 76% 40%, #30283e 0, #101014 42%, #09090b 78%)", fontFamily: "Arial, sans-serif" }}>
    <div style={{ fontSize: 22, letterSpacing: 5, color: "#c2a9ff" }}>◉ &nbsp; {studioName}</div>
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 970 }}><div style={{ fontSize: 18, letterSpacing: 5, color: "#a6a1ad", marginBottom: 22 }}>{eyebrow.toUpperCase()}</div><div style={{ fontSize: 82, lineHeight: 1.05, letterSpacing: -5 }}>{title}</div></div>
    <div style={{ fontSize: 17, letterSpacing: 3, color: "#aaa6b1" }}>{location.toUpperCase()}</div>
    <div style={{ position: "absolute", right: 85, top: 110, width: 300, height: 300, borderRadius: 999, border: "1px solid #c2a9ff66", boxShadow: "inset 0 0 90px #c2a9ff19, 0 0 110px #7960ad26" }}/>
  </div>;
}
