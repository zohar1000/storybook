import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { GraphStoryArgs } from './graph-story-args.model';
import { GraphLinesComponent } from '@shared/components/graphs/graph-lines.component';
import { mockDataGraphLines } from '@stories/mock-data/mock-data-graph-lines.const';

export default {
  title: 'Graphs/Lines',
  component: GraphLinesComponent,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    moduleMetadata({ imports: [SharedModule] })
  ],
} as Meta;

const Template: Story<GraphLinesComponent> = (args: GraphLinesComponent) => ({ props: args });

export const Regular: GraphStoryArgs = Template.bind({});
Regular.args = mockDataGraphLines;
