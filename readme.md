# Daniel Kukucska (sqabsb)

Webprogramozás%20II. tantárgy második beadandó

## Fájlstruktúra
    .
    ├── src                     # javascript forráskódok
    ├── index.html              # kezdőlap
    ├── .gitignore              #
    ├── package.json            # a megoldás leíró adatai és használt npm csomagok, script(ek)
    └── README.md
Csomagkezeló: [npm](https://www.npmjs.com).

```bash
npm install
```
```bash
#összes fájl formázása
npm run pretty
```
## Elérés
[Forráskód](https://github.com/danielkukucska/webprog1beadando2_js)
\
[Live demo](https://danielkukucska.github.io/webprog1beadando2_js/)
\
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Megjegyzések
A megoldást először TypeScript és Vite használatával kezdtem el megírni, de láttam, hogy csak JavaScript-et lehet használni így átálltam arra.

Próbáltam SPA szerű módon megvalósítani a feladatot.

A reqres API leírását nem minden esetben találtam konzisztensnek a kitűzött feladattal, így ott egy-két megoldás eltérhet. Más struktúrájú adatot ad vissza, mint amit létrehozáskor és frissítéskor elvár, bár ezeket szerver oldalon nem validálja. De ettől még működik oda vissza a létrehozás visszatöltésén kívül minden CRUD művelet. Létrehozáskor a feladat kiírása szerinti validáció történt, de az nem illene bele a táblázatba, így csak a toast üzenetben jelenik meg az eredmény.