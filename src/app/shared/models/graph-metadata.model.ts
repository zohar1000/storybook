import { GraphType } from '../enums/graph-type.enum';

export interface GraphMetadata {
  type: GraphType;
  langDir?: 'lrt' | 'rtl';
  letterSize?: number;
  height?: number | string;
}
