# Fleeca Bank – NUI UI (React + TypeScript + Vite + Mantine)

Front-end panelu bankowego do FiveM, zbudowany zgodnie z Twoim briefem: React 18 + TypeScript + Vite + Mantine 7,
z zachowaniem podanej palety kolorów i fontu (Manrope) z Twojego snippetu CSS (`src/index.css`).

## Uruchomienie lokalnie

```bash
npm install
npm run dev       # podgląd na http://localhost:5173
npm run build     # build produkcyjny do folderu dist/ (podpiąć jako NUI w fxmanifest.lua)
```

## Co zawiera

- **Ekran wyboru profilu** (`src/components/LoadingPage.tsx`) – wybór "Konto prywatne" / "Konto służbowe" przed wejściem do panelu.
- **Dashboard** (`src/pages/Dashboard.tsx`) – tygodniowy wykres przychodów/wychodów (`@mantine/charts`), karta konta (numer, data ważności, nazwa/typ), panel szybkich akcji (wpłata/wypłata/przelew, szybkie kwoty, pole Player ID / IBAN) oraz skrót ostatnich transakcji z przyciskiem "Zobacz wszystkie".
- **Transakcje** (`src/pages/Transactions.tsx`) – pełna tabela z wyszukiwarką i filtrami, eksport do CSV, pierścień miesięcznych statystyk (przychody/wychody/saldo + liczba transakcji na środku) oraz te same dane jako paski postępu.
- **Konta** (`src/pages/Accounts.tsx`) – karuzela kont (Mantine Carousel) z kafelkiem "Nowe konto", informacja o limicie 3 kont w pakiecie Basic, szczegóły wybranego konta (typ, właściciel, saldo, rola, numer z kopiowaniem), logi konta (Normal / Risk / Medium, każdy w innym kolorze) oraz panel ustawień (zmiana nazwy, zmiana właściciela, zarządzanie użytkownikami z uprawnieniami, usuwanie konta).
- **Rodzaje konta** (`src/pages/AccountTypes.tsx`) – karuzela pakietów Basic / Silver / Gold / Diamond z listą korzyści i ikonami; pakiety odblokowują się sekwencyjnie (żeby kupić Gold trzeba mieć Silver), zablokowane karty są wyszarzone z ikoną kłódki.
- Stuby dla **Faktur** i **Pożyczek**, gotowe do rozbudowy.

## Dane

Wszystkie dane (konta, transakcje, logi, pakiety) są zamockowane w `src/data/mockData.ts` i trzymane w stanie
`App.tsx` (useState) – wpłaty/wypłaty/przelewy, tworzenie/usuwanie kont, zarządzanie użytkownikami i upgrade
pakietu realnie aktualizują UI.

## Podpięcie pod FiveM (NUI)

To jest czysty front-end. Aby połączyć go z Twoim resource'em Lua:

1. W `fxmanifest.lua` dodaj `ui_page 'dist/index.html'` i `files { 'dist/**/*' }`.
2. Zastąp funkcje w `App.tsx` (np. `addTransaction`, `handleCreateAccount`) wywołaniami `fetch` do NUI callbacków:
   ```ts
   await fetch(`https://${GetParentResourceName()}/deposit`, {
     method: 'POST',
     body: JSON.stringify({ amount, target }),
   })
   ```
3. Nasłuchuj eventów z klienta Lua przez `window.addEventListener('message', ...)`, aby otwierać/zamykać UI i
   przekazywać prawdziwe dane konta zamiast `mockData.ts`.

## Struktura

```
src/
  components/   – Sidebar, LoadingPage, modale (tworzenie konta, zarządzanie użytkownikami)
  pages/        – Dashboard, Transactions, Accounts, AccountTypes, Invoices, Loans
  data/         – mockData.ts (konta, transakcje, logi, pakiety)
  theme.ts      – motyw Mantine dopasowany do palety z Twojego CSS
  index.css     – Twoje zmienne CSS + reset dla NUI (transparent, user-select: none)
```
