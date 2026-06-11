import { useState } from 'react';
import { ardenModelName, ardenUnits, defaultLevelId, findLevel } from '../data/arden';
import { FloorPlanLightbox } from '../components/FloorPlanLightbox';
import { FloorPlanViewer } from '../components/FloorPlanViewer';
import { UnitButtonPanel } from '../components/UnitButtonPanel';
import styles from './FloorPlanPage.module.css';

export function FloorPlanPage() {
  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevelId);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const selectedLevel = findLevel(selectedLevelId) ?? findLevel(defaultLevelId)!;

  return (
    <main className={styles.page}>
      <div className={styles.viewerRegion}>
        <FloorPlanViewer
          modelName={ardenModelName}
          imageUrl={selectedLevel.imageUrl}
          alt={selectedLevel.label}
          onImageClick={() => setIsFullscreen(true)}
        />
      </div>
      <div className={styles.panelRegion}>
        <div className={styles.panelInner}>
          {ardenUnits.map((unit) => (
            <UnitButtonPanel
              key={unit.id}
              unit={unit}
              selectedLevelId={selectedLevelId}
              onSelectLevel={setSelectedLevelId}
            />
          ))}
        </div>
      </div>
      {isFullscreen && (
        <FloorPlanLightbox
          imageUrl={selectedLevel.imageUrl}
          alt={selectedLevel.label}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </main>
  );
}
