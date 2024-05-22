import { Gallery, Property } from '@prisma/client';

export interface iProperty extends Property {
  galleries: Gallery[];
}
