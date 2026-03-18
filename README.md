# Smernica o riadení IT projektov — GTY.sk

Interná smernica o riadení IT projektov podľa vyhlášky č. 401/2023 Z. z. pre orgány verejnej moci.

**Live:** [smernica.gty.sk](https://smernica.gty.sk)

## Nasadenie na smernica.gty.sk

### Krok 1 — Nahrať kód do repozitára

```bash
cd smernica-repo
git init
git add .
git commit -m "Initial commit: Smernica OVM v3.0"
git branch -M main
git remote add origin https://github.com/TVOJ-USERNAME/smernica.git
git push -u origin main
```

### Krok 2 — Nainštalovať závislosti a spustiť lokálne (voliteľné)

```bash
npm install
npm run dev
# Otvorí sa na http://localhost:5173
```

### Krok 3 — Nastaviť GitHub Pages

1. Choď na **github.com/TVOJ-USERNAME/smernica** → **Settings** → **Pages**
2. V sekcii **Build and deployment**:
   - **Source:** vyberte **GitHub Actions**
3. Push na `main` branch automaticky spustí deployment

### Krok 4 — Nastaviť DNS pre subdoménu `smernica.gty.sk`

Choď do DNS správy tvojej domény **gty.sk** (u registrátora alebo Cloudflare, Wedos, Websupport atď.) a pridaj:

```
Typ      Názov       Hodnota                          TTL
──────   ─────────   ──────────────────────────────   ────
CNAME    smernica    TVOJ-USERNAME.github.io.         3600
```

> **Dôležité:** Hodnota CNAME musí byť `TVOJ-USERNAME.github.io.` (s bodkou na konci), kde `TVOJ-USERNAME` je tvoje GitHub meno.

### Krok 5 — Potvrdiť doménu v GitHub

1. **Settings** → **Pages** → **Custom domain**
2. Zadaj: `smernica.gty.sk`
3. Klikni **Save**
4. Počkaj na DNS overenie (zvyčajne 5–30 minút)
5. Zaškrtni **Enforce HTTPS** (po overení)

### Krok 6 — Hotovo!

Po DNS propagácii (5–30 min) bude stránka dostupná na:

🌐 **https://smernica.gty.sk**

---

## Štruktúra projektu

```
smernica/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy pri push na main
├── public/
│   ├── CNAME                   # Custom doména pre GitHub Pages
│   └── favicon.svg             # GTY favicon
├── src/
│   ├── App.jsx                 # Hlavná React komponenta (celá appka)
│   └── main.jsx                # Vstupný bod
├── index.html                  # HTML šablóna
├── package.json                # Závislosti a skripty
├── vite.config.js              # Vite konfigurácia
└── README.md                   # Tento súbor
```

## Technológie

- **React 18** + **Vite 5** — moderný, rýchly build
- **GitHub Pages** — bezplatný hosting
- **GitHub Actions** — automatický CI/CD

## Obsah smernice

20 článkov pokrývajúcich celý životný cyklus IT projektu podľa vyhlášky č. 401/2023 Z. z.:

| Čl. | Téma | § vyhlášky |
|-----|------|-----------|
| 1 | Definícia IT projektu | § 2 ods. 1 |
| 2 | Finančná hodnota projektov | § 4 |
| 3 | Hodnotenie a validácia | § 5–§ 7 |
| 4 | Požiadavky na kvalitu | § 5 ods. 9c |
| 5 | Projektový tím | § 5 ods. 13 |
| 6 | Riadiaci výbor | § 5 ods. 4–12 |
| 7 | Projektové zabezpečenie | § 5, PRINCE2 |
| 8 | Zmenové požiadavky | § 4 ods. 9 |
| 9 | Zmluvné doložky | § 5 ods. 8 |
| 10 | Riadenie zmien | § 10a–§ 10g |
| 11 | Verejné obstarávanie | § 9 ods. 4 |
| 12 | Vzdelávanie | § 12 ods. 5 |
| 13 | Waterfall životný cyklus | § 4–§ 7 |
| 14 | Agile životný cyklus | § 11–§ 15 |
| 15 | Riadenie rizík | § 4 ods. 1e |
| 16 | Monitorovanie | § 10 |
| 17 | Projektové výstupy | Príl. č. 1–2 |
| 18 | UX a elektronizácia | § 8 |
| 19 | Kybernetická bezpečnosť | § 8a |
| 20 | Programové riadenie | § 3 |

## Licencia

© GTY.sk — Infrastructure Project Management. Všetky práva vyhradené.
