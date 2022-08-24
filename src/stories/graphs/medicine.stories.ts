import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { ConcentratedDisplayStoryTemplate } from '@stories/models/templates/concentrated-display-story-template.model';
import { textEn } from '@stories/const/text-en.const';
import { textHe } from '@stories/const/text-he.const';
import { TimelineResolution } from '@shared/enums/timeline-resolution.enum';
import { MedicineTesterComponent } from '@stories/components/medicine-tester/medicine-tester.component';
import { BsModalService } from 'ngx-bootstrap/modal';

export default {
  title: 'רכיבים/תצוגה מרוכזת',
  component: MedicineTesterComponent,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
      providers: [BsModalService]
    })
  ],
} as Meta;

const Template: Story<MedicineTesterComponent> = (args: MedicineTesterComponent) => ({ props: args });

export const Rtl: ConcentratedDisplayStoryTemplate = Template.bind({});
Rtl.args = { ...textHe, resolution: TimelineResolution.Hours1 }

export const Ltr: ConcentratedDisplayStoryTemplate = Template.bind({});
Ltr.args = { ...textEn, resolution: TimelineResolution.Hours1 }
