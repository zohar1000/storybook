import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { GraphStoryArgs } from './graph-story-args.model';
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

export const Regular: GraphStoryArgs = Template.bind({});
Regular.args = mockDataGraphPie;
