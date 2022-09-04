import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { ConcentratedDisplayStoryTemplate } from '@stories/models/templates/concentrated-display-story-template.model';
import { MedicationTesterComponent } from '@stories/components/medication-tester/medication-tester.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MedicationListerComponent } from '@stories/components/medication-lister/medication-lister.component';
import { MedicationListerItemComponent } from '@stories/components/medication-lister-item/medication-lister-item.component';
import { textHe } from '@stories/const/text-he.const';
import { textEn } from '@stories/const/text-en.const';
import { defaultSettings } from '@stories/const/default-settings.const';
import { ToastrService } from 'ngx-toastr';

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
      providers: [BsModalService, ToastrService]
    })
  ],
} as Meta;

const Template: Story<MedicationTesterComponent> = (args: MedicationTesterComponent) => ({ props: args });

export const עברית: ConcentratedDisplayStoryTemplate = Template.bind({});
עברית.args = { ...textHe, defaultSettings }

export const English: ConcentratedDisplayStoryTemplate = Template.bind({});
English.args = { ...textEn, defaultSettings }
