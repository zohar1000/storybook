import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphType } from '../../app/shared/enums/graph-type.enum';
import { GraphData } from '@models/graph-data.model';

export const mockDataGraphPie: { metadata: GraphMetadata, data: GraphData } = {
  metadata: {
    type: GraphType.LinesRegular,
    height: '600px'
  },
  data: {
    title: {
      text: 'Pie Graph Example',
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
