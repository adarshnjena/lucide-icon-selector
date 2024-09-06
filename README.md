Here’s an updated README that includes details about optimizations and efficiency improvements:

---

# Lucide Icon Selector

This project is a simple, optimized icon selector component built using React and the Lucide library for customizable icons. The project includes two primary components: a **Normal Icon Selector** and a **Dropdown Icon Selector**.

## Demo Links

- **Normal Icon Selector**: [Normal Icon Selector](https://lucide-icon-selector.vercel.app/)
- **Dropdown Icon Selector**: [Dropdown Icon Selector](https://lucide-icon-selector.vercel.app/icon-selector-dropdown)

## Components

### 1. Normal Icon Selector

A regular icon selector allowing users to browse and choose icons from the Lucide library.

- **Component File**: `IconSelector.tsx`
- **Features**:
  - Displays a grid of icons.
  - Users can select an icon from the list.
  - Icons are sourced from the Lucide library, making it flexible and lightweight.

### 2. Dropdown Icon Selector

An advanced version of the icon selector, this component allows users to choose icons from a dropdown menu.

- **Component File**: `IconSelectorDropdown.tsx`
- **Features**:
  - Icons can be selected from a dropdown.
  - More compact than the normal icon selector, suitable for forms or restricted spaces.

## Optimizations and Efficiency Improvements

Several optimizations were implemented to improve the performance and usability of the icon selector:

1. **Memoization of Components**:
   By leveraging `React.memo`, the icon components are only re-rendered when necessary. This prevents unnecessary rendering of large lists of icons and improves performance, especially when the user interacts with the dropdown or filters icons.

2. **Virtualized List Rendering**:
   For large icon sets, virtualized rendering has been implemented. This ensures that only a subset of the icons visible in the viewport is rendered at any given time. By avoiding the rendering of off-screen elements, memory usage and initial load times are significantly reduced.

3. **Lazy Loading of Icons**:
   Icons are lazy-loaded as the user scrolls through the list or interacts with the dropdown, reducing the initial page load time and improving the user experience on slower networks.

4. **Debouncing User Input**:
   When searching for an icon, input is debounced to prevent multiple renders and state updates. This allows for a smoother user experience while typing in the search box without overloading the app with excessive re-renders.

5. **Optimized State Management**:
   React’s `useState` and `useReducer` hooks are used efficiently to ensure that the component state is handled in an optimal way, minimizing re-renders and avoiding unnecessary computations.

## Repository

You can find the repository for this project [here](https://github.com/adarshnjena/lucide-icon-selector).

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adarshnjena/lucide-icon-selector.git
   ```

2. Navigate to the project folder and install dependencies:

   ```bash
   cd lucide-icon-selector
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Visit the demo on `http://localhost:3000`.

### Usage

- Import the components where needed:

  ```jsx
  import IconSelector from "./components/IconSelector";
  import IconSelectorDropdown from "./components/IconSelectorDropdown";
  ```

- Use the **Normal Icon Selector** in your project:

  ```jsx
  <IconSelector />
  ```

- Use the **Dropdown Icon Selector**:
  ```jsx
  <IconSelectorDropdown />
  ```

## Dependencies

This project primarily depends on the following packages:

- **React**: JavaScript library for building user interfaces.
- **Lucide Icons**: A set of beautiful and customizable icons.


---

Feel free to adjust any sections or add more details!
