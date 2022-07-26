import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';

export interface GraphStoryTemplate {
  args: {
    direction?: 'rtl' | 'ltr'
    metadata: GraphMetadata;
    data: GraphData;
  }
}
