import styles from './FloorPlanViewer.module.css';

type FloorPlanViewerProps = {
  modelName: string;
  imageUrl: string;
  alt: string;
  onImageClick: () => void;
};

export function FloorPlanViewer({
  modelName,
  imageUrl,
  alt,
  onImageClick,
}: FloorPlanViewerProps) {
  return (
    <section className={styles.viewer} aria-label="Floor plan">
      <h1 className={styles.modelName}>{modelName}</h1>
      <div className={styles.imageWrap}>
        <button
          type="button"
          className={styles.imageButton}
          aria-label={`View ${alt} full screen`}
          onClick={onImageClick}
        >
          <img className={styles.image} src={imageUrl} alt={alt} />
        </button>
      </div>
    </section>
  );
}
