# wat-center
[![pl](https://img.shields.io/badge/README-PL-red.svg)](https://github.com/tymoteuszkosciuszko/wat-center/blob/main/README.md)

A website with learning materials for WAT (Military University of Technology), based on Vue 3, Vite, and Tailwind CSS.

## Project Structure
The materials are organized by subjects. Each subject can have its own subcategories (e.g., Reports, Theory, Notes), contained as subfolders *(TODO)*:
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
Due to the size (as well as the number) of files, they are obviously not stored in the repository; however, they are available on the [WAT Center website](https://wat.21152115.xyz) (Yes, I bought a .xyz domain because it was ridiculously cheap, don't blame me).

## Features (some still TODO)
- 🔄 Dynamic route generation for subjects and their subcategories using Vue Router
- 🔄 Support for not only files but also links to external materials
- 🔄 Built-in PDF viewer and image preview
- ✅ Automatic generation of index.json for all folders and subfolders (Node.js)
- ✅ Minimalist and responsive design with Tailwind CSS

## Project Configuration
1. Install dependencies:
```sh
npm install
```
2. Generate ```index.json``` files:
```shell
npm run generate-index
```
3. Run the local server:
```sh
npm run dev
```
4. To build the project for production, run:
```sh
npm run build
```

Please report any bugs on GitHub or via the email available on the website. I don't promise I'll fix them.

Similarly, if you have materials you would like to include, please send an email to the address provided on the website.