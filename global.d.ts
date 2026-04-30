// Type declarations for CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Google Tag Manager dataLayer
interface Window {
  dataLayer: Record<string, any>[];
}
