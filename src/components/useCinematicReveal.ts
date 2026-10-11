import { useEffect } from 'react';

/**
 * Site-wide scroll reveals. Any element with a `data-reveal` attribute starts
 * hidden and settles into place the first time it scrolls into view (styles in
 * index.css). Markers are written as data attributes rather than classes, so
 * React re-renders that change an element's className never undo a reveal.
 *
 * Nothing is revealed until `enabled` is true, which lets the intro finish first.
 */
export const useCinematicReveal = (enabled: boolean): void => {
  // Scroll progress line.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        '--scroll',
        max > 0 ? String(Math.min(1, window.scrollY / max)) : '0'
      );
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (typeof IntersectionObserver === 'undefined') return;
    root.classList.add('reveal-ready');
    if (!enabled) return;

    const reveal = (el: HTMLElement) => {
      el.dataset.revealed = 'true';
      // After the entrance finishes, release the transition for hover styles.
      const delay = parseFloat(getComputedStyle(el).getPropertyValue('--reveal-delay')) || 0;
      window.setTimeout(() => {
        el.dataset.revealDone = 'true';
      }, delay + 1000);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => {
        io.observe(el);
      });
    };
    watch(document);

    // Pick up elements that mount later (filters, tier switches, language toggle).
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]:not([data-revealed])')) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [enabled]);
};
