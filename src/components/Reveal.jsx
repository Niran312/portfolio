import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ 
  children, 
  className = '', 
  animation = 'fade-up', 
  delay = 0, 
  duration = 0.8,
  style = {}
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        // Stop observing once visible (triggers animation only once)
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.05, // Trigger when 5% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Margins around root element to trigger slightly before/after screen boundary
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const styles = {
    ...style,
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`
  };

  return (
    <div
      ref={ref}
      className={`reveal-el reveal-${animation} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={styles}
    >
      {children}
    </div>
  );
}
