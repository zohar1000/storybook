import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { ConcentratedDisplayStoryTemplate } from '@stories/models/templates/concentrated-display-story-template.model';
import { MedicationTesterComponent } from '@stories/components/medication-tester/medication-tester.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MedicationListerComponent } from '@stories/components/medication-lister/medication-lister.component';
import { MedicationListerItemComponent } from '@stories/components/medication-lister-item/medication-lister-item.component';

export default {
  title: 'רכיבים/תצוגה מרוכזת',
  component: MedicationTesterComponent,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    argName: {
      isSettings: true
    }
  },
  decorators: [
    moduleMetadata({
      declarations: [
        MedicationListerComponent,
        MedicationListerItemComponent
      ],
      imports: [SharedModule],
      providers: [BsModalService]
    })
  ],
} as Meta;

const Template: Story<MedicationTesterComponent> = (args: MedicationTesterComponent) => ({ props: args });

export const Rtl: ConcentratedDisplayStoryTemplate = Template.bind({});
// Rtl.args = { ...textHe, resolution: TimelineResolution.Hours1 }
Rtl.args = { }

export const Ltr: ConcentratedDisplayStoryTemplate = Template.bind({});
// Ltr.args = { ...textEn, resolution: TimelineResolution.Hours1 }
Ltr.args = { }
