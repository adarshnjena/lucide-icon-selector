# Icon Selector Component

## Overview

The Icon Selector is a React component that provides a user-friendly interface for searching and selecting icons from the Lucide icon library. It offers a searchable grid of icons with visual feedback for matching and selected icons.

## Features

- Search functionality to filter icons
- Responsive grid layout
- Visual feedback for matched and selected icons
- Accessibility support
- Error handling and loading states

## Installation

1. Ensure you have React and the required dependencies installed in your project.
2. Install the Lucide React library:
   ```
   npm install lucide-react
   ```
   or
   ```
   yarn add lucide-react
   ```

3. Copy the `IconSelector.tsx` file into your project's components directory.

## Usage

Import and use the IconSelector component in your React application:

```jsx
import IconSelector from './path/to/IconSelector';

function App() {
  return (
    <div>
      <h1>Icon Selector Demo</h1>
      <IconSelector />
    </div>
  );
}
```

## Props

Currently, the IconSelector component doesn't accept any props. All functionality is self-contained within the component.

## Dependencies

- React
- lucide-react
- lodash-es (for debounce functionality)

Make sure these dependencies are installed in your project.

## Styling

The component uses Tailwind CSS classes for styling. Ensure your project is set up with Tailwind CSS or replace the class names with your preferred styling solution.

## Accessibility

The component includes basic accessibility features:
- Proper ARIA attributes for the icon grid
- Keyboard navigation support

## Error Handling

The component includes error handling for cases where icons fail to load. It displays an error message and provides a retry option.

## Performance

The component uses React's useMemo hook to optimize the filtering of icons based on the search term, reducing unnecessary re-renders.

## Contributing

Contributions to improve the Icon Selector component are welcome. Please ensure that your code adheres to the existing style and includes appropriate tests.

## License

[Include your chosen license here]

## Contact

[Your contact information or link to issues page]