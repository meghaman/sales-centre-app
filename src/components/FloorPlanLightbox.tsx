import { useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
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
        <TransformWrapper
          key={imageUrl}
          initialScale={1}
          minScale={1}
          maxScale={4}
          centerOnInit
          centerZoomedOut
          limitToBounds
          doubleClick={{ mode: 'toggle', step: 0.75 }}
          panning={{ velocityDisabled: true }}
          wheel={{ disabled: true }}
        >
          <TransformComponent
            wrapperClass={styles.zoomWrapper}
            contentClass={styles.zoomContent}
          >
            <img className={styles.image} src={imageUrl} alt={alt} draggable={false} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}
