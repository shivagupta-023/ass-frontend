// src/components/DataTable/DataTable.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import DataTable from './DataTable';
import type { Column, DataTableProps } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
}

type Story = StoryObj<DataTableProps<User>>;

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User' },
  { id: 4, name: 'Alice Williams', email: 'alice.w@example.com', role: 'Guest' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email Address', dataIndex: 'email', sortable: false },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const Loading: Story = {
  args: {
    columns: columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns,
    data: [],
    loading: false,
  },
};

export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
    // onRowSelect: action('onRowSelect'),
  },
};