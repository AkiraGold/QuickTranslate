let Prism = null;
let loading = null;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

export function whenPrismReady(listener) {
  if (Prism) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  loadPrism();
  return () => listeners.delete(listener);
}

function loadPrism() {
  if (Prism) return Promise.resolve(Prism);
  if (!loading) {
    loading = import('prismjs')
      .then(async (mod) => {
        Prism = mod.default || mod;
        // prism-markup attaches to the global Prism instance
        if (typeof window !== 'undefined') {
          window.Prism = Prism;
        }
        await import('prismjs/components/prism-markup');
        await import('prismjs/themes/prism-tomorrow.min.css');
        notify();
        return Prism;
      })
      .catch((error) => {
        loading = null;
        throw error;
      });
  }
  return loading;
}

if (typeof window !== 'undefined') {
  const warm = () => {
    loadPrism().catch(() => {});
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(warm, { timeout: 2000 });
  } else {
    setTimeout(warm, 1);
  }
}

export function highlightMarkup(code) {
  if (!code) return code;
  if (!Prism?.languages?.markup) {
    loadPrism();
    return code;
  }
  return Prism.highlight(code, Prism.languages.markup, 'markup');
}
