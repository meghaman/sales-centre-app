export type FloorLevel = {
  id: string;
  label: string;
  imageUrl: string;
  inlineSvg?: boolean;
};

export type Unit = {
  id: string;
  label: string;
  levels: FloorLevel[];
};

export const ardenModel = {
  name: 'Arden',
  units: [
    {
      id: 'residence-1',
      label: 'Residence 1',
      levels: [
        {
          id: 'r1-original',
          label: 'Original',
          imageUrl: '/plans/arden/unit-1-upper-level.svg',
          inlineSvg: false,
        },
      ],
    },
    {
      id: 'residence-2',
      label: 'Residence 2',
      levels: [
        {
          id: 'r2-new',
          label: 'New SVG',
          imageUrl: '/plans/arden/unit-2-upper-level.svg',
          inlineSvg: true,
        },
      ],
    },
  ] as Unit[],
};

export const ardenUnits = ardenModel.units;

export const defaultLevelId = ardenModel.units[0].levels[0].id;

export function findLevel(id: string): FloorLevel | undefined {
  for (const unit of ardenModel.units) {
    const level = unit.levels.find((entry) => entry.id === id);
    if (level) {
      return level;
    }
  }
  return undefined;
}
