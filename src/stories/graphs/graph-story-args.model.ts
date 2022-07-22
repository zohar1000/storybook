import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';

export interface GraphStoryArgs {
  args: {
    metadata: GraphMetadata;
    data: GraphData;
  }
}
