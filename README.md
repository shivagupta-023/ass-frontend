# React Component Development Assignment

This project is a submission for the React Component Development assignment. It includes two reusable UI components: an InputField and a DataTable, built with modern web technologies.

## Tech Stack
- React
- TypeScript
- TailwindCSS
- Storybook

## Components Built

### 1. InputField
A flexible and customizable input component with the following features:
- [cite_start]Support for labels, placeholders, helper text, and error messages[cite: 10].
- [cite_start]Different states: `disabled`, `invalid`, `loading`[cite: 11].
- [cite_start]Three variants: `filled`, `outlined`, `ghost`[cite: 12].
- [cite_start]Multiple sizes: `small`, `medium`, `large`[cite: 13].
- [cite_start]Optional features like a password toggle and a clear button[cite: 15].

### 2. DataTable
A data table to display tabular data with these features:
- [cite_start]Renders data from a given array of objects[cite: 33].
- [cite_start]Column sorting (ascending/descending)[cite: 34].
- [cite_start]Row selection (single and multiple)[cite: 35].
- [cite_start]Loading and Empty states for better user experience[cite: 36, 37].

## How to Run the Project Locally

Follow these steps to run the project on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <your-project-folder>
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run Storybook:**
    ```bash
    npm run storybook
    ```
    This will open Storybook in your browser, where you can view and interact with the components.

## My Approach
(Yahan par 1-2 line mein batayein ki aapne kaam kaise kiya. উদাহৰণ ke liye:)
In this project, I focused on creating a clean and scalable folder structure. For styling, I used `clsx` to dynamically apply TailwindCSS classes based on the component's props. For state management within components, I used React hooks like `useState` and `useMemo` to handle features like sorting and selection efficiently.
