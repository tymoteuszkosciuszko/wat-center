# wat-center
[![en](https://img.shields.io/badge/README-EN-blue.svg)](https://github.com/tymoteuszkosciuszko/wat-center/blob/main/README-en.md)

Strona z materiałami do nauki na WAT, oparta o Vue 3, Vite i Tailwind CSS.

## Struktura projektu
Materiały są zorganizowane według przedmiotów. Każdy przedmiot może mieć własne podkategorie (np. Sprawozdania, Teoria, Notatki), zawarte jako podfoldery *(TODO)*:
```
public/
└── files/
    ├── fizyka/
    │   ├── Sprawozdania/
    │   │   ├── Sprawko1.pdf
    │   │   └── index.json
    │   └── index.json
    ├── aok/
    └── jee/
```
Z powodu wielkości (jak i liczebności) plików, nie są one przechowywane w repozytorium.

## Funkcjonalności (niektóre jeszcze TODO)
- ✅ Dynamiczne generowanie tras dla przedmiotów i ich podkategorii z użyciem Vue Routera
- 🔄 Obsługa nie tylko plików, ale także linków do materiałów zewnętrznych
- ✅ Wbudowana przeglądarka PDF i podgląd obrazków
- ✅ Automatyczne generowanie index.json dla wszystkich folderów i podfolderów (Node.js)
- ✅ Minimalistyczny i responsywny design z Tailwind CSS

## Konfiguracja projektu
1. Zainstaluj zależności:
```sh
npm install
```
2. Wygeneruj pliki ```index.json```:
```shell
npm run generate-index
```
3. Uruchom lokalny serwer:
```sh
npm run dev
```
4. Aby zbudować projekt do produkcji, uruchom:
```sh
npm run build
```

Wszelkie usterki proszę zgłaszać na GitHubie lub na mailu dostępnym na stronie. Nie obiecuję, że się nimi zajmę.

Tak samo, jeżeli posiadasz materiały, które chciałbyś umieścić, napisz maila na adres podany na stronie.