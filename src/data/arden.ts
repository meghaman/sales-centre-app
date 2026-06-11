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

export const ardenModel = {
  name: 'Arden',
  units: [
  {
    id: 'residence-1',
    label: 'Residence 1',
    levels: [
      {
        id: 'r1-main',
        label: 'Main Level',
        imageUrl: '/plans/arden/floor_plan.png',
      },
      {
        id: 'r1-office',
        label: 'Entry Level (Office)',
        imageUrl: 'https://placehold.co/1200x800?text=Entry+Level+(Office)',
      },
      {
        id: 'r1-tandem',
        label: 'Entry Level (Tandem Garage)',
        imageUrl: 'https://placehold.co/600x400?text=Entry+Level+(Tandem+Garage)',
      },
      {
        id: 'r1-lower',
        label: 'Lower Level',
        imageUrl: 'https://placehold.co/560x990?text=Lower+Level',
      },
      {
        id: 'r1-upper',
        label: 'Upper Level',
        imageUrl: 'https://placehold.co/800x800?text=Upper+Level',
      },
      {
        id: 'r1-garage',
        label: 'Garage Level',
        imageUrl: 'https://placehold.co/1600x600?text=Garage+Level',
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
        imageUrl: 'https://placehold.co/900x700?text=Upper+Level',
      },
      {
        id: 'r2-bedroom',
        label: 'Entry Level (Bedroom)',
        imageUrl: 'https://placehold.co/500x900?text=Entry+Level+(Bedroom)',
      },
      {
        id: 'r2-rec',
        label: 'Entry Level (Rec Rm)',
        imageUrl: 'https://placehold.co/1024x768?text=Entry+Level+(Rec+Rm)',
      },
      {
        id: 'r2-main',
        label: 'Main Level',
        imageUrl: 'https://placehold.co/600x400?text=Main+Level',
      },
      {
        id: 'r2-lower',
        label: 'Lower Level',
        imageUrl: 'https://placehold.co/700x500?text=Lower+Level',
      },
      {
        id: 'r2-garage',
        label: 'Garage Level',
        imageUrl: 'https://placehold.co/400x400?text=Garage+Level',
      },
    ],
  },
] as Unit[],
};

export const ardenUnits = ardenModel.units;

function getFirstUnitMainLevelId(units: Unit[]): string {
  const firstUnit = units[0];
  const mainLevel = firstUnit.levels.find((level) => level.label === 'Main Level');
  return mainLevel?.id ?? firstUnit.levels[0].id;
}

export const defaultLevelId = getFirstUnitMainLevelId(ardenModel.units);

export function findLevel(id: string): FloorLevel | undefined {
  for (const unit of ardenModel.units) {
    const level = unit.levels.find((entry) => entry.id === id);
    if (level) {
      return level;
    }
  }
  return undefined;
}
