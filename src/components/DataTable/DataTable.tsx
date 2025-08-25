// src/components/DataTable/DataTable.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { LoaderCircle, ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortKey, sortOrder]);

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selectedRows);
    }
  }, [selectedRows, onRowSelect]);

  const handleSelectRow = (row: T) => {
    setSelectedRows((prevSelected) => {
      const isSelected = prevSelected.some((r) => r.id === row.id);
      if (isSelected) {
        return prevSelected.filter((r) => r.id !== row.id);
      } else {
        return [...prevSelected, row];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={data.length > 0 && selectedRows.length === data.length}
                  onChange={handleSelectAll}
                  disabled={loading}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div
                  className={clsx('flex items-center gap-2', col.sortable && 'cursor-pointer hover:text-gray-700')}
                  onClick={() => col.sortable && handleSort(col.dataIndex)}
                >
                  {col.title}
                  {sortKey === col.dataIndex && (
                    <span>{sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
             <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-10"><div className="flex justify-center items-center"><LoaderCircle className="animate-spin h-8 w-8 text-gray-500" /></div></td></tr>
          ) : sortedData.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-10 text-gray-500">No data available.</td></tr>
          ) : (
            sortedData.map((row) => {
              const isRowSelected = selectedRows.some((r) => r.id === row.id);
              return (
                <tr key={row.id} className={clsx("hover:bg-gray-50", isRowSelected && 'bg-indigo-50')}>
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={isRowSelected}
                        onChange={() => handleSelectRow(row)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row[col.dataIndex] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;