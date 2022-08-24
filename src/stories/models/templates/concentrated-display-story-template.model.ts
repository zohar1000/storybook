import { Direction } from '@stories/models/direction.model';

export interface ConcentratedDisplayStoryTemplate {
  args: {
    direction: Direction;
    text: any;
    defaultSettings: any;
    // resolution: TimelineResolution;
    // metadata: GraphMetadata;
    // data: GraphData;
  }
}
