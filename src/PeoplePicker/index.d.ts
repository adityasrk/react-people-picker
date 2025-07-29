declare module '@your-org/react-people-picker' { // Replace with your actual package name
  import * as React from 'react';

  /**
   * Defines the structure of a User object.
   */
  export interface User {
    id: string;
    name: string;
    alias?: string;
    email: string;
  }

  /**
   * Props for the PeoplePicker component.
   */
  export interface PeoplePickerProps {
    /**
     * Callback function to perform user search.
     * Receives the search query string and should return a Promise
     * that resolves with an array of User objects.
     */
    onSearch: (query: string) => Promise<User[]>;
    /**
     * Optional callback function that is called whenever the array of selected users changes.
     */
    onSelectedUsersChange?: (selectedUsers: User[]) => void;
    /**
     * Optional initial array of selected users.
     * @default []
     */
    initialSelectedUsers?: User[];
    /**
     * If true, the field will be marked as required for validation.
     * @default false
     */
    isRequired?: boolean;
    /**
     * Custom error message to display when the field is required and empty.
     * @default 'Required field'
     */
    requiredErrorMessage?: string;
  }

  /**
   * A React People Picker component mimicking Outlook's user search UI
   * with deletable chips and debounced search.
   *
   * @param {PeoplePickerProps} props - The component's props.
   */
  const PeoplePicker: React.FC<PeoplePickerProps>;

  export default PeoplePicker;
}