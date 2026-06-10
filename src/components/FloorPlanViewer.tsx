import styles from './FloorPlanViewer.module.css';

type FloorPlanViewerProps = {
  imageUrl: string;
  alt: string;
};

export function FloorPlanViewer({ imageUrl, alt }: FloorPlanViewerProps) {
  return (
    <section className={styles.viewer} aria-label="Floor plan">
      <div className={styles.imageWrap}>
        <img className={styles.image} src={imageUrl} alt={alt} />
        <div className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}
