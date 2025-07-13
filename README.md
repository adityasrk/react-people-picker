# React People Picker

A versatile and customizable React People Picker component built with Material-UI, featuring search, debounce, and multi-selection capabilities.

## ✨ Features

* **Material-UI Integration:** Seamlessly integrates with your Material-UI themed applications.
* **Search Functionality:** Filter available options by typing in the input field.
* **Debounced Search:** Optimizes performance by delaying search queries, reducing unnecessary API calls or list filtering.
* **Customizable Options:** Easily provide your own list of people.
* **Controlled Component:** Manage selected values from parent component state.
* **Clear Selection:** Option to clear all selected items.

## 🚀 Installation

First, install the package in your React project:

```bash
npm install @sadhu/react-people-picker
  or
yarn add @sadhu/react-people-picker
```

This component relies on <mark>react</mark>, <mark>react-dom</mark>, <mark>@mui/material</mark>, <mark>@mui/icons-material</mark>, <mark>@emotion/react</mark>, and <mark>@emotion/styled</mark> as peer dependencies. Ensure these are also installed in your project:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
  or
yarn add react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## 💡 Usage

```bash
import React, { useState } from 'react';
import PeoplePicker from '@sadhu/react-people-picker';

function App() {
  // Example data structure for people (typically fetch this from an API)
  const allPeople = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com' },
    { id: '5', name: 'Eve Adams', email: 'eve@example.com' },
  ];

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log('Selected People:', newSelection);
    setSelectedUsers(newSelection);
  };

  const loadPeopleOptions = (searchTerm) => {
    // In your application, you would make an API call here.
    // For this example, we are filtering the local array.
    console.log('Searching for:', searchTerm);
    return new Promise(resolve => {
      setTimeout(() => { // Simulate API delay
        const filtered = allPeople.filter(person =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  };

  return (
    <div>
      <div style={{ width: 400, margin: '20px auto' }}>
        <PeoplePicker
            autocompleteBordercolor="dimgray"
            chipBGcolor="dimgray"
            debounceDelay={300} // Optional. Default debounce search input by 300ms
            initialSelected={selectedUsers}
            loadOptions={loadPeopleOptions}
            maxWidth="400px"
            minSearchLength={3}
            onSelectionChange={handleSelectionChange}
            placeholder="Search user by name/email/alias"
            tooltipColor="darkgray"
            isRequired={true} // Optional. Default is false, if the control mandatory in the form
            requiredErrorMessage="At least one user is required" // required when isRequired
            isError={formSubmitted && selectedUsers.length === 0}
        />
      </div>
    </div>
  );
}

export default App;
```

## ⚙️ Props

```

```

| Prop Name       | Type                                                | Default                             | Description                                     |
| :------------   | :-----------                                        | :--------------------------------   | :-------------------------------------------    |
| initialSelected | Array<{id: string, name: string, email?: string}>   | []                                  | An array of initial selected people objects. Each object should at least have `id` and `name`.   |
| loadOptions     | (searchTerm: string)  => Promise<Array<{id: string, name: string, email?: string}>> | undefined | A function that receives the search term and should return a Promise resolving to an array of people objects. This is where your API call or data filtering logic goes. |
| onSelectionChange | (selected: Array<{id: string, name: string, email?: string}>) => void | undefined | Callback function triggered when the selection changes, receiving the updated array of selected people. |
| debounceDelay | number  | 300 | The time in milliseconds to debounce the `loadOptions` function calls. |
| minSearchLength | number  | 3 | Minumum character length needed for a search to trigger. |
| maxWidth  | number  | 600px | Maximum width of the control.  |
| autocompleteBordercolor | string  | theme.palette.primary.dark  | border color of the autocomplete control.  |
| chipColor | string  | theme.palette.primary.dark  | fill color of the chip holding the user name in the autocomplete control.  |
| tooltipColor  | string  | theme.palette.primary.light | color of the tooltip when the cursor is hovered on the chip.  |
| placeholder     | string  | 'Search User' | The placeholder text for the input field. |
| isRequired  | boolean | false | If the control mandatory in the form.  |
| requiredErrorMessage  | string  | null  | This field is mandatory when `isRequired` field is part of the control. |

## 🛠️ Development
To set up the development environment for this component library:

1. Clone the repository:
``` 
git clone [https://github.com/your-username/my-people-picker-library.git](https://github.com/your-username/my-people-picker-library.git)
cd my-people-picker-library
```
2. Install dependencies:
```
npm install or yarn install
```
3. Run the Rollup build in watch mode (optional, for library development):
```
npm run dev
```
This will recompile your library files (`dist/`) automatically on changes.

4. Run the demo application:

In a separate terminal, navigate to the `demo-app` directory and start the CRA development server:
```
cd demo-app
npm install # Only if not done during the main 'npm install' or 'yarn install' at root
npm start
```
This will open the demo application in your browser, where you can test the PeoplePicker component.

## Color Reference

| Color         | Hex           |
| :------------ | :---------    |
| theme.palette.primary.dark |  #1565c0    |
| theme.palette.primary.light |  #42a5f5    |
| dimgray |  #696969    |
| darkgray |  #A9A9A9    |

##  🤝 Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

##  📄 License
This project is licensed under the MIT License. See the `LICENSE` file for details.


