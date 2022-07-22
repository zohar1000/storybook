import { GraphMetadata } from '@models/graph-metadata.model';
import { GraphType } from '../../app/shared/enums/graph-type.enum';
import { GraphData } from '@models/graph-data.model';

export const mockDataGraphLines: { metadata: GraphMetadata, data: GraphData } = {
  metadata: {
    type: GraphType.LinesRegular,
    height: '600px'
  },
  data: {
    title: {
      text: 'Lines Graph Example',
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: {
      data: [
        { name: 'Email', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Video Ads', data: [150, 232, 201, 154, 190, 330, 410] },
        { name: 'Direct', data: [320, 332, 301, 334, 390, 330, 320] },
        { name: 'Search Engine', data: [820, 932, 901, 934, 1290, 1330, 1320] }
      ]
    }
  }
}
