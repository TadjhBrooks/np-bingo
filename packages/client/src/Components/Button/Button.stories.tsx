import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'Button',
};

export const Contained = Template.bind({});
Contained.args = {
  ...Base.args,
  variant: 'contained',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Contained.args,
  disabled: true,
};
