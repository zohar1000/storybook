import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphData } from '@models/graph-data.model';
import { GraphType } from '@shared/enums/graph-type.enum';

export const mockDataGraphPie: { metadata: GraphMetadata, data: GraphData } = {
  metadata: {
    type: GraphType.LinesRegular,
    height: '600px'
  },
  data: {
    title: {
      text: 'Pie Graph Example'
    },
    legend: {
      data: ['Direct Visit', 'Union Ads', 'Search Engine']
    },
    series: {
      data: [
        { name: 'Direct Visit', value: 335 },
        { name: 'Union Ads', value: 234 },
        { name: 'Search Engine', value: 1548 }
      ]
    }
  }
}
