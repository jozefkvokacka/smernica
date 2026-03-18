import { useState, useEffect, useRef } from "react";

const CHAPTERS = [
  { id: "cl1", num: 1, title: "Definícia IT projektu", section: "§ 2 ods. 1 písm. x)", desc: "Vymedzenie pojmu IT projekt, finančné prahy, projektové fázy a výstupy, bezpečnostné požiadavky." },
  { id: "cl2", num: 2, title: "Riadenie IT projektov OVM podľa finančnej hodnoty", section: "§ 4", desc: "Kategorizácia projektov podľa hodnoty — do 200t €, nad 200t €, princípy a odporúčania pre prax." },
  { id: "cl3", num: 3, title: "Hodnotenie IT projektov a validácia výstupov", section: "§ 5–§ 7", desc: "Priebežné a finálne hodnotenie, subjekty, kritériá, výstupy hodnotenia." },
  { id: "cl4", num: 4, title: "Požiadavky na kvalitu projektov", section: "§ 5 ods. 9c", desc: "PDCA cyklus, akceptačné kritériá, Open-source požiadavky, kontrolný zoznam." },
  { id: "cl5", num: 5, title: "Členovia projektového tímu a zodpovednosti", section: "§ 5 ods. 13", desc: "Projektový tím, PM, manažér tímu — roly, kompetencie, 80% alokácia." },
  { id: "cl6", num: 6, title: "Riadiaci výbor projektu", section: "§ 5 ods. 4–12", desc: "Executive, Senior User, Senior Supplier — úlohy, konflikty záujmov." },
  { id: "cl7", num: 7, title: "Projektové zabezpečenie", section: "§ 5 (PRINCE2)", desc: "Tri línie zabezpečenia — biznis, používatelia, dodávatelia. Nezávislý dohľad." },
  { id: "cl8", num: 8, title: "Riadenie zmenových požiadaviek", section: "§ 4 ods. 9", desc: "Change management v dodávacej fáze — roly, dokumentácia, validácia." },
  { id: "cl9", num: 9, title: "Povinné zmluvné doložky", section: "§ 5 ods. 8", desc: "PM dodávateľa, štandardy, CMSVS, zdrojové kódy, bezpečnosť, SLA." },
  { id: "cl10", num: 10, title: "Riadenie zmien v projekte", section: "§ 10a–§ 10g", desc: "Kategorizácia, evidencia, hodnotenie, schvaľovanie, zmrazenie, eskalácia." },
  { id: "cl11", num: 11, title: "Verejné obstarávanie v IT projektoch", section: "§ 9 ods. 4", desc: "Procesy VO, finančné limity, spolupráca PM a oddelenia VO." },
  { id: "cl12", num: 12, title: "Vzdelávanie zamestnancov", section: "§ 12 ods. 5", desc: "Školenia, certifikácie, matrica kompetencií, plán vzdelávania." },
  { id: "cl13", num: 13, title: "Životný cyklus — Waterfall", section: "§ 4–§ 7", desc: "Prípravná, realizačná, experimentálna, dokončovacia fáza. Etapy a míľniky." },
  { id: "cl14", num: 14, title: "Životný cyklus — Agile", section: "§ 11–§ 15", desc: "Iterácie, inkrementy, produktový vlastník, obmedzenia metódy." },
  { id: "cl15", num: 15, title: "Riadenie rizík a závislostí", section: "§ 4 ods. 1e", desc: "Matica rizík, klasifikácia, eskalácia, register rizík v M-02." },
  { id: "cl16", num: 16, title: "Monitorovanie veľkého projektu", section: "§ 10", desc: "Post-projektové monitorovanie až 10 rokov, merateľné ukazovatele." },
  { id: "cl17", num: 17, title: "Projektové výstupy a dokumentácia", section: "Príloha č. 1–2", desc: "M-01 až M-06, I-01 až I-05, R-01, R-02 — matrica povinností." },
  { id: "cl18", num: 18, title: "Elektronizácia agendy a UX", section: "§ 8", desc: "Používateľský prieskum, prototypy, informačná architektúra, UX testy." },
  { id: "cl19", num: 19, title: "Kybernetická bezpečnosť", section: "§ 8a", desc: "I-05 vyhlásenie, bezpečnostný projekt, testovanie KB." },
  { id: "cl20", num: 20, title: "Programové riadenie a MetaIS", section: "§ 3", desc: "CMSVS, ohlásenie výstupov, verejné pripomienkovanie, orgán vedenia." },
];

const TAGS = {
  core: [1,2,3,4,5,6,7],
  change: [8,10],
  contract: [9],
  procurement: [11],
  lifecycle: [13,14],
  quality: [4,12,15,16],
  technical: [17,18,19,20],
};

const TAG_LABELS = {
  core: "Základ", change: "Zmeny", contract: "Zmluvy", procurement: "VO",
  lifecycle: "Životný cyklus", quality: "Kvalita & riziko", technical: "Technické"
};

const TAG_COLORS = {
  core: "#1a4a8a", change: "#c8a84b", contract: "#2d6bc4", procurement: "#92610a",
  lifecycle: "#1b7a4a", quality: "#9b2c2c", technical: "#5b21b6"
};

function getChapterTags(num) {
  return Object.entries(TAGS).filter(([_, nums]) => nums.includes(num)).map(([k]) => k);
}

export default function App() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter ? CHAPTERS.filter(c => TAGS[filter]?.includes(c.num)) : CHAPTERS;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(12,31,63,0.97)" : "#0c1f3f",
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid #c8a84b",
        transition: "all 0.3s",
        padding: scrolled ? "10px 0" : "16px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
           <img src="/logo.jpg" alt="GTY logo" style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: 0.5, lineHeight: 1.2 }}>smernica.gty.sk</div>
              <div style={{ color: "#c8a84b", fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase" }}>Vyhláška 401/2023 Z. z.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#chapters" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Články</a>
            <a href="#about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>O smernici</a>
            <a href="/Smernica_OVM_401_2023_v3_0_complete.docx" download style={{ padding: "6px 16px", borderRadius: 6, background: "#c8a84b", color: "#0c1f3f", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, textDecoration: "none" }}>Stiahnuť DOCX</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        background: "linear-gradient(165deg, #0c1f3f 0%, #132d5e 50%, #1a4a8a 100%)",
        padding: "80px 32px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,168,75,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,107,196,0.06) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 4, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.3)", marginBottom: 20 }}>
            <span style={{ color: "#c8a84b", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>Interná smernica OVM · v3.0</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display'", color: "#fff",
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15,
            maxWidth: 700, margin: "0 0 16px",
          }}>
            Smernica o riadení<br/>
            <span style={{ color: "#c8a84b" }}>IT projektov</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, maxWidth: 560, lineHeight: 1.7, margin: "0 0 32px" }}>
            podľa vyhlášky č. 401/2023 Z. z. o riadení projektov a zmenových požiadaviek v prevádzke informačných technológií verejnej správy
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { n: "20", l: "Článkov" },
              { n: "20", l: "Diagramov" },
              { n: "§1–§18", l: "Vyhlášky" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "#c8a84b", fontSize: 28, fontWeight: 800, fontFamily: "'Playfair Display'" }}>{s.n}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Filter tags */}
      <div id="chapters" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 0" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          <button
            onClick={() => setFilter(null)}
            style={{
              padding: "6px 14px", borderRadius: 20, border: !filter ? "2px solid #0c1f3f" : "1px solid #d0dae8",
              background: !filter ? "#0c1f3f" : "#fff", color: !filter ? "#fff" : "#4a5568",
              fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}
          >Všetky ({CHAPTERS.length})</button>
          {Object.entries(TAG_LABELS).map(([key, label]) => (
            <button key={key}
              onClick={() => setFilter(filter === key ? null : key)}
              style={{
                padding: "6px 14px", borderRadius: 20,
                border: filter === key ? `2px solid ${TAG_COLORS[key]}` : "1px solid #d0dae8",
                background: filter === key ? TAG_COLORS[key] : "#fff",
                color: filter === key ? "#fff" : TAG_COLORS[key],
                fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
              }}
            >{label} ({TAGS[key].length})</button>
          ))}
        </div>
      </div>

      {/* Chapter grid */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map((ch, idx) => {
            const tags = getChapterTags(ch.num);
            const isActive = active === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => setActive(isActive ? null : ch.id)}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  border: isActive ? "2px solid #c8a84b" : "1px solid #e8edf3",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                  transform: isActive ? "scale(1.01)" : "scale(1)",
                  boxShadow: isActive ? "0 8px 32px rgba(12,31,63,0.12)" : "0 1px 4px rgba(12,31,63,0.04)",
                  overflow: "hidden",
                  animation: `fadeUp 0.4s ease ${idx * 0.03}s both`,
                }}
              >
                <div style={{ padding: "20px 24px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 48, height: 48, borderRadius: 10,
                    background: isActive ? "linear-gradient(135deg, #c8a84b, #e8d48b)" : "linear-gradient(135deg, #0c1f3f, #1a4a8a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isActive ? "#0c1f3f" : "#fff",
                    fontWeight: 800, fontSize: 18, fontFamily: "'Playfair Display'",
                    transition: "all 0.3s",
                  }}>{ch.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0c1f3f", lineHeight: 1.35, marginBottom: 4 }}>{ch.title}</div>
                    <div style={{ fontSize: 11, color: "#c8a84b", fontWeight: 600, letterSpacing: 0.5 }}>{ch.section}</div>
                  </div>
                </div>
                <div style={{ padding: "0 24px 16px" }}>
                  <p style={{ fontSize: 13, color: "#4a5568", lineHeight: 1.6, margin: "0 0 12px" }}>{ch.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {tags.map(t => (
                      <span key={t} style={{
                        padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 600,
                        background: `${TAG_COLORS[t]}11`, color: TAG_COLORS[t], letterSpacing: 0.3,
                      }}>{TAG_LABELS[t]}</span>
                    ))}
                  </div>
                </div>
                {isActive && (
                  <div style={{ borderTop: "1px solid #e8edf3", padding: "16px 24px", background: "#fafbfc" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1b7a4a" }} />
                      <span style={{ fontSize: 12, color: "#1b7a4a", fontWeight: 600 }}>Obsahuje diagram</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#7a8a9e", marginTop: 8, lineHeight: 1.5 }}>
                      Kliknutím na „Stiahnuť DOCX" získate kompletný dokument so všetkými 20 článkami, 20 diagrammi a hypertextovým obsahom.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* About section */}
      <section id="about" style={{ background: "#0c1f3f", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display'", color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
            O smernici
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: "📋", title: "Právny základ", text: "Vyhláška č. 401/2023 Z. z. v znení účinnom od 1. 4. 2025 — o riadení projektov a zmenových požiadaviek v prevádzke informačných technológií verejnej správy." },
              { icon: "🏛️", title: "Univerzálna platnosť", text: "Smernica je navrhnutá pre akýkoľvek orgán verejnej moci (OVM). Stačí doplniť názov organizácie, gestora a schvaľovateľa." },
              { icon: "📊", title: "Kompletná dokumentácia", text: "20 článkov pokrývajúcich celý životný cyklus IT projektu — od definície cez realizáciu po post-projektové monitorovanie a vzdelávanie." },
              { icon: "🔄", title: "Obe metodiky", text: "Waterfall (§ 4–§ 7) aj Agile (§ 11–§ 15) s detailnými diagrammi procesných tokov, rolí a zodpovedností." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: 28,
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ color: "#c8a84b", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document structure */}
      <section style={{ background: "#fff", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display'", color: "#0c1f3f", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Štruktúra dokumentu</h2>
          <p style={{ color: "#4a5568", fontSize: 14, marginBottom: 32 }}>Kompletný obsah smernice v3.0 s hypertextovými odkazmi</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 12 }}>
            {CHAPTERS.map(ch => (
              <div key={ch.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                borderRadius: 8, background: "#f8f9fb", border: "1px solid #e8edf3",
                cursor: "pointer", transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#eef1f6"; e.currentTarget.style.borderColor = "#c8a84b"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f8f9fb"; e.currentTarget.style.borderColor = "#e8edf3"; }}
                onClick={() => { setActive(ch.id); setFilter(null); document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div style={{
                  minWidth: 32, height: 32, borderRadius: 6, background: "#0c1f3f",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#c8a84b", fontWeight: 800, fontSize: 13,
                }}>{ch.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#0c1f3f" }}>{ch.title}</div>
                </div>
                <div style={{ fontSize: 11, color: "#c8a84b", fontWeight: 600, whiteSpace: "nowrap" }}>{ch.section}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0a1628", padding: "40px 32px 24px", borderTop: "2px solid #c8a84b" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
           <img src="/logo.jpg" alt="GTY logo" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>GTY.sk</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Infrastructure Project Management</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>
              Smernica o riadení IT projektov · Vyhláška č. 401/2023 Z. z. · Verzia 3.0
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>
            © {new Date().getFullYear()} GTY.sk · Všetky práva vyhradené
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}
