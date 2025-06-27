/// <reference types="vite/client" />

// //<reference types="vite/client" /> imports Vite’s default types for import.meta.env.

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
