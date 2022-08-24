import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { GraphStoryTemplate } from '../models/templates/graph-story-template.model';
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

export const Regular: GraphStoryTemplate = Template.bind({});
Regular.args = mockDataGraphLines;
