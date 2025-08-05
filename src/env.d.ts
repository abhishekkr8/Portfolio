/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EmailJS_EMAIL_SERVICE_ID: string;
  readonly VITE_EmailJS_EMAIL_TEMPLATE_ID: string;
  readonly VITE_EmailJS_EMAIL_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
