import { useState } from 'react';
import { ardenUnits, defaultLevelId, findLevel } from '../data/arden';
import { FloorPlanViewer } from '../components/FloorPlanViewer';
import { UnitButtonPanel } from '../components/UnitButtonPanel';
import styles from './FloorPlanPage.module.css';

export function FloorPlanPage() {
  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevelId);
  const selectedLevel = findLevel(selectedLevelId) ?? findLevel(defaultLevelId)!;

  return (
    <main className={styles.page}>
      <div className={styles.viewerRegion}>
        <FloorPlanViewer
          imageUrl={selectedLevel.imageUrl}
          alt={selectedLevel.label}
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
