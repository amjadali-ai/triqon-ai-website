/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEEDBACK_ENDPOINT?: string;
  readonly VITE_CMS_CONTENT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
