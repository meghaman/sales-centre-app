import { usePinchZoom } from '../hooks/usePinchZoom';
import styles from './FloorPlanViewer.module.css';

type FloorPlanViewerProps = {
  imageUrl: string;
  alt: string;
};

export function FloorPlanViewer({ imageUrl, alt }: FloorPlanViewerProps) {
  const { transform, onTouchStart, onTouchMove, onTouchEnd } = usePinchZoom(imageUrl);

  return (
    <section className={styles.viewer} aria-label="Floor plan">
      <div
        className={styles.imageWrap}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className={styles.zoomSurface}
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <img className={styles.image} src={imageUrl} alt={alt} draggable={false} />
        </div>
      </div>
    </section>
  );
}
