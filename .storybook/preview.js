import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

const globalViewports = {
	w600h400: {
		name: '600x400',
		styles: {
			width: '600px',
			height: '400px',
		},
	},
	w1000h800: {
		name: '1000x800',
		styles: {
			width: '1000px',
			height: '800px',
		},
	}
};

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		}
	},
	docs: { inlineStories: true },
	viewport: { viewports: globalViewports }
}
