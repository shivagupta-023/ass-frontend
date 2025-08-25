// src/components/InputField/InputField.tsx

import React, { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff, X, LoaderCircle } from 'lucide-react';

export interface InputFieldProps {
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  value,
  onChange,
  type = 'text',
  variant = 'outlined',
  size = 'md',
  disabled = false,
  invalid = false,
  loading = false,
}) => {
  const id = React.useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleClear = () => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: '' } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const variantClasses = {
    outlined: 'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
    filled: 'bg-gray-100 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-indigo-500',
    ghost: 'border-transparent bg-transparent hover:bg-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500',
  };
  
  const baseInputClasses = 'block w-full rounded-md shadow-sm transition duration-150 ease-in-out';
  const isDisabled = disabled || loading;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isDisabled}
          className={clsx(
            baseInputClasses,
            sizeClasses[size],
            variantClasses[variant],
            invalid && 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500',
            isDisabled && 'bg-gray-100 cursor-not-allowed opacity-50',
            (type === 'password' || (value && !isDisabled)) && 'pr-10'
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
          {loading && <LoaderCircle size={20} className="animate-spin text-gray-500" />}
          
          {!loading && value && !isDisabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Clear input"
            >
              <X size={20} />
            </button>
          )}

          {!loading && type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
      {invalid && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
      {!invalid && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;