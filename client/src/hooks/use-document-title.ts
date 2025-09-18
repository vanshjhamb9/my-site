import { useEffect } from "react";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title) {
      const prevTitle = document.title;
      document.title = title;
      
      // Cleanup function to restore original title
      return () => {
        document.title = prevTitle;
      };
    }
  }, [title]);
}

export function useDocumentMeta(meta: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  useEffect(() => {
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      
      if (name.startsWith("og:")) {
        element.setAttribute("property", name);
      } else {
        element.setAttribute("name", name);
      }
      element.setAttribute("content", content);
    };

    // Set document title
    if (meta.title) {
      document.title = meta.title;
    }

    // Set meta description
    if (meta.description) {
      updateMeta("description", meta.description);
      updateMeta("og:description", meta.description);
    }

    // Set Open Graph tags
    if (meta.title) {
      updateMeta("og:title", meta.title);
    }

    if (meta.image) {
      updateMeta("og:image", meta.image);
    }

    if (meta.url) {
      updateMeta("og:url", meta.url);
    }

    // Set basic OG type
    updateMeta("og:type", "article");
    
  }, [meta.title, meta.description, meta.image, meta.url]);
}