import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from '@shared/shared.module';
import { ConcentratedDisplayStoryTemplate } from '@stories/models/templates/concentrated-display-story-template.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { textHe } from '@stories/const/text-he.const';
import { textEn } from '@stories/const/text-en.const';
import { defaultSettings } from '@stories/const/default-settings.const';
import { ToastrService } from 'ngx-toastr';
import { MediconTesterComponent } from '@stories/components/medicon-tester/medicon-tester.component';
import { MediconListerComponent } from '@stories/components/medicon-lister/medicon-lister.component';
import { MediconListerItemComponent } from '@stories/components/medicon-lister-item/medicon-lister-item.component';
import { MediconService } from '@shared/components/system/shared/services/medicon.service';

export default {
  title: 'רכיבים/תצוגה מרוכזת',
  component: MediconTesterComponent,
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
        MediconListerComponent,
        MediconListerItemComponent
      ],
      imports: [SharedModule],
      providers: [BsModalService, ToastrService, MediconService]
    })
  ],
} as Meta;

const Template: Story<MediconTesterComponent> = (args: MediconTesterComponent) => ({ props: args });

export const עברית: ConcentratedDisplayStoryTemplate = Template.bind({});
עברית.args = { ...textHe, defaultSettings }

export const English: ConcentratedDisplayStoryTemplate = Template.bind({});
English.args = { ...textEn, defaultSettings }
