import type { Unit } from '../data/arden';
import styles from './UnitButtonPanel.module.css';

type UnitButtonPanelProps = {
  unit: Unit;
  selectedLevelId: string;
  onSelectLevel: (levelId: string) => void;
};

export function UnitButtonPanel({
  unit,
  selectedLevelId,
  onSelectLevel,
}: UnitButtonPanelProps) {
  return (
    <div className={styles.column}>
      <h2 className={styles.unitLabel}>{unit.label}</h2>
      <div className={styles.buttons}>
        {unit.levels.map((level) => {
          const isActive = level.id === selectedLevelId;
          return (
            <button
              key={level.id}
              type="button"
              className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
              aria-pressed={isActive}
              onClick={() => onSelectLevel(level.id)}
            >
              {level.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
