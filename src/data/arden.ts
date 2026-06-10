export type FloorLevel = {
  id: string;
  label: string;
  imageUrl: string;
};

export type Unit = {
  id: string;
  label: string;
  levels: FloorLevel[];
};

export const ardenUnits: Unit[] = [
  {
    id: 'residence-1',
    label: 'Residence 1',
    levels: [
      {
        id: 'r1-main',
        label: 'Main Level',
        imageUrl: '/plans/arden/r1-main.svg',
      },
      {
        id: 'r1-office',
        label: 'Entry Level (Office)',
        imageUrl: '/plans/arden/r1-office.svg',
      },
      {
        id: 'r1-tandem',
        label: 'Entry Level (Tandem Garage)',
        imageUrl: '/plans/arden/r1-tandem.svg',
      },
    ],
  },
  {
    id: 'residence-2',
    label: 'Residence 2',
    levels: [
      {
        id: 'r2-upper',
        label: 'Upper Level',
        imageUrl: '/plans/arden/r2-upper.svg',
      },
      {
        id: 'r2-bedroom',
        label: 'Entry Level (Bedroom)',
        imageUrl: '/plans/arden/r2-bedroom.svg',
      },
      {
        id: 'r2-rec',
        label: 'Entry Level (Rec Rm)',
        imageUrl: '/plans/arden/r2-rec.svg',
      },
    ],
  },
];

export const defaultLevelId = ardenUnits[0].levels[0].id;

export function findLevel(id: string): FloorLevel | undefined {
  for (const unit of ardenUnits) {
    const level = unit.levels.find((entry) => entry.id === id);
    if (level) {
      return level;
    }
  }
  return undefined;
}
