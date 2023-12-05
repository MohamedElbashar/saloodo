import { Filter, IParcel, Parcels } from '../../types';

export async function findParcel(filter: Filter): Promise<IParcel | null> {
  const parcel = await Parcels.findOne(filter);
  return parcel;
}
