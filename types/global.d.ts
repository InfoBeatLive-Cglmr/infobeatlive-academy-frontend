
declare global {
  interface Window {
    gtag: (...args) => void;
  }
}

export {};

