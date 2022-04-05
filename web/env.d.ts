interface ImportMetaEnv {
  readonly VITE_USER_ID: string;
  readonly VITE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
