import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import PeoplePicker from './PeoplePicker';


// Mock API call in the CONSUMING APPLICATION
const mockUsersApiCall = (query) => {
  console.log('Consumer App: API Call for search:', query);
  const allUsers = [];

  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercasedQuery = query.toLowerCase();
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        (user.alias && user.alias.toLowerCase().includes(lowercasedQuery)) 
      );
      resolve(filtered);
    }, 300);
  });
};


function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

const handleSubmit = () => {
    setFormSubmitted(true); // Trigger validation
    
    // do respective form submission logic here
  };

  return (
    <>
      <PeoplePicker
        onSearch={mockUsersApiCall}
        onSelectedUsersChange={setSelectedUsers}
        initialSelectedUsers={[]}
        minSearchLength={3}
        maxWidth="400px"
        autocompleteBordercolor="dimgray"
        chipBGcolor="dimgray"
        tooltipColor="darkgray"
        placeholder="Search user by name/email/alias"
        debounceDelay={300}
        isRequired={true}
        requiredErrorMessage="At least one user is required"
        isError={formSubmitted && selectedUsers.length === 0}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          size="small"
          sx={{ backgroundColor: "black", color: "white" }}
        >
          submit
        </Button>
      </Box>
    </>
  );
}

export default App;