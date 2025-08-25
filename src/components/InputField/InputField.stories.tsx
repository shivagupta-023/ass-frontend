// src/components/InputField/InputField.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const Filled: Story = {
  args: { ...Outlined.args, variant: 'filled', label: 'Full Name (Filled)' },
};

export const Ghost: Story = {
  args: { ...Outlined.args, variant: 'ghost', label: 'Username (Ghost)' },
};

export const Invalid: Story = {
  args: { ...Outlined.args, invalid: true, label: 'Password (Invalid)', errorMessage: 'Password must be at least 8 characters long.' },
};

export const WithHelperText: Story = {
  args: { ...Outlined.args, label: 'Coupon Code', helperText: 'Enter a valid coupon code for a discount.' },
};

export const Disabled: Story = {
  args: { ...Outlined.args, disabled: true, label: 'Country (Disabled)', value: 'India' },
};

export const Password: Story = {
  args: { ...Outlined.args, type: 'password', label: 'Password', placeholder: 'Enter your password' },
};

export const Clearable: Story = {
  args: { ...Outlined.args, label: 'Search', placeholder: 'Type to see clear button...' },
  render: (args) => {
    const [value, setValue] = useState('');
    return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Loading: Story = {
  args: { ...Outlined.args, loading: true, label: 'Loading Data' },
};