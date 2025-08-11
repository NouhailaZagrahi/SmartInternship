import { useEffect } from 'react';

const useSidebarInit = () => {
  useEffect(() => {
    // Charge les scripts d'initialisation dynamiquement
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeSidebar = async () => {
      try {
        // Comme les fichiers sont publics dans Vite, ils sont servis à la racine "/"
        await loadScript('/js/js/quixnav-init.js');
        await loadScript('/js/js/custom.min.js');
        
        // Réinitialise le menu après le rendu
        if (window.MetisMenu) {
          new window.MetisMenu('#menu');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la sidebar:', error);
      }
    };

    initializeSidebar();

    return () => {
      // Nettoyage si nécessaire
    };
  }, []);
};

export default useSidebarInit;
