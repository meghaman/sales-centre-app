import styles from './FloorPlanViewer.module.css';

type FloorPlanViewerProps = {
  imageUrl: string;
  alt: string;
  onImageClick: () => void;
};

export function FloorPlanViewer({ imageUrl, alt, onImageClick }: FloorPlanViewerProps) {
  return (
    <section className={styles.viewer} aria-label="Floor plan">
      <div className={styles.imageWrap}>
        <button
          type="button"
          className={styles.imageButton}
          aria-label={`View ${alt} full screen`}
          onClick={onImageClick}
        >
          <img className={styles.image} src={imageUrl} alt={alt} />
        </button>
        <div className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}
