import React from 'react';
import { Story, Meta } from '@storybook/react';
import List, { ListProps } from '.';

export default {
  title: 'List/List',
  component: List,
} as Meta;

const Template: Story<ListProps> = (args) => <List {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'List',
};
