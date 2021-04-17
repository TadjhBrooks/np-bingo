import React from 'react';
import { Story, Meta } from '@storybook/react';
import Status, { StatusProps } from './Status';

export default {
  title: 'Components/Status/Player',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = (args) => <Status {...args} />;

export const Init = Template.bind({});

export const Ready = Template.bind({});
Ready.args = {
  gamestate: 'ready',
};

export const Standby = Template.bind({});
Standby.args = {
  gamestate: 'standby',
};

export const Start = Template.bind({});
Start.args = {
  gamestate: 'start',
};

export const Validate = Template.bind({});
Validate.args = {
  gamestate: 'validate',
};

export const Pause = Template.bind({});
Pause.args = {
  gamestate: 'pause',
};

export const Failure = Template.bind({});
Failure.storyName = 'Failure (Randomized)';
Failure.args = {
  gamestate: 'failure',
};

export const End = Template.bind({});
End.args = {
  gamestate: 'end',
};

export const Win = Template.bind({});
Win.args = {
  gamestate: 'win',
};
