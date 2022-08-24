import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { GraphStoryTemplate } from '../models/templates/graph-story-template.model';
import { GraphPieComponent } from '@shared/components/graphs/graph-pie.component';
import { mockDataGraphPie } from '@stories/mock-data/mock-data-graph-pie.const';

export default {
  title: 'Graphs/Pie',
  component: GraphPieComponent,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    moduleMetadata({ imports: [SharedModule] })
  ],
} as Meta;

const Template: Story<GraphPieComponent> = (args: GraphPieComponent) => ({ props: args });

export const Regular: GraphStoryTemplate = Template.bind({});
Regular.args = mockDataGraphPie;
