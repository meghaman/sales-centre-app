import { usePinchZoom } from '../hooks/usePinchZoom';
import { InlineSvgPlan } from './InlineSvgPlan';
import styles from './FloorPlanViewer.module.css';

type FloorPlanViewerProps = {
  imageUrl: string;
  alt: string;
  inlineSvg?: boolean;
  resetKey?: number;
};

export function FloorPlanViewer({
  imageUrl,
  alt,
  inlineSvg = false,
  resetKey = 0,
}: FloorPlanViewerProps) {
  const { transform, wrapRef, onTouchStart, onTouchMove, onTouchEnd } = usePinchZoom(`${imageUrl}:${resetKey}`);

  return (
    <section className={styles.viewer} aria-label="Floor plan">
      <div
        ref={wrapRef}
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
          {inlineSvg ? (
            <InlineSvgPlan
              url={imageUrl}
              alt={alt}
              className={styles.planSvg}
              fallbackClassName={styles.image}
            />
          ) : (
            <img className={styles.image} src={imageUrl} alt={alt} draggable={false} />
          )}
        </div>
      </div>
    </section>
  );
}
