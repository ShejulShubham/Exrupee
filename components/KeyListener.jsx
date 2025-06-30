import { useEffect } from "react";

export function KeyListener(key, elementId) {
  useEffect(() => {
    function handler(e) {
      if (e.key === key) {
        const element = document.getElementById(elementId);
        if (element) {
          element.click();
        } else {
          console.warn(`Element with id "${elementId}" not found.`);
        }
      }
    }

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler); // Clean up
    };
  }, [key, elementId]);
}
