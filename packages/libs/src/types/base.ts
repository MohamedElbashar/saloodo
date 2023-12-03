import type { ObjectId } from 'bson';

export type Omit_id<T, K extends keyof any = ''> = Omit<T, '_id' | K>;

export type OmitBaseProps<T, K extends keyof any = ''> = Omit_id<
  T,
  'createdAt' | 'updatedAt' | K
>;

export type BaseProps = {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type Filter = {
  [key: string]: any;
};
