import { useState } from 'react';
import { ardenUnits, defaultLevelId, findLevel } from '../data/arden';
import { FloorPlanViewer } from '../components/FloorPlanViewer';
import { UnitButtonPanel } from '../components/UnitButtonPanel';
import { useInactivityReset } from '../hooks/useInactivityReset';
import styles from './FloorPlanPage.module.css';

export function FloorPlanPage() {
  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevelId);
  const [viewerResetKey, setViewerResetKey] = useState(0);
  const selectedLevel = findLevel(selectedLevelId) ?? findLevel(defaultLevelId)!;

  useInactivityReset(() => {
    setSelectedLevelId(defaultLevelId);
    setViewerResetKey((key) => key + 1);
  });

  return (
    <main className={styles.page}>
      <div className={styles.viewerRegion}>
        <FloorPlanViewer
          imageUrl={selectedLevel.imageUrl}
          alt={selectedLevel.label}
          resetKey={viewerResetKey}
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
    </main>
  );
}
