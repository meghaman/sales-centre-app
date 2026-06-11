import { useEffect } from 'react';
import styles from './FloorPlanLightbox.module.css';

type FloorPlanLightboxProps = {
  imageUrl: string;
  alt: string;
  onClose: () => void;
};

export function FloorPlanLightbox({ imageUrl, alt, onClose }: FloorPlanLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} full screen`}
      onClick={onClose}
    >
      <div className={styles.content} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close full screen"
          onClick={onClose}
        >
          ×
        </button>
        <img className={styles.image} src={imageUrl} alt={alt} />
      </div>
    </div>
  );
}
