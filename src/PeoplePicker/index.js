import React, { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  CircularProgress,
  Box,
  Typography,
  styled,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import useDebounce from "./useDebounce";

function PeoplePicker({
  onSearch,
  onSelectedUsersChange,
  initialSelectedUsers,
  ...props
}) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedInputValue = useDebounce(
    searchInput,
    props?.debounceDelay || 300
  );

  useEffect(() => {
    if (!onSearch || debouncedInputValue.trim().length < props?.minSearchLength) {
      setSearchResults([]);
      return undefined;
    }

    setLoading(true);

    onSearch(debouncedInputValue)
      .then((results) => {
        const uniqueResults = results.filter(
          (user) =>
            !selectedUsers.some((selected) => selected.email === user.email)
        );
        setSearchResults(uniqueResults);
      })
      .catch((error) => {
        console.error("PeoplePicker: Error during user search:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedInputValue, onSearch, selectedUsers]);

  useEffect(() => {
    if (onSelectedUsersChange) {
      onSelectedUsersChange(selectedUsers);
    }
  }, [selectedUsers, onSelectedUsersChange]);

  useEffect(() => {
    if (props?.isRequired && props?.isError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [props?.isRequired, props?.isError]);

  const handleChipDelete = useCallback((userToDelete) => {
    setSelectedUsers((prevSelected) => {
      const updatedUsers = prevSelected.filter(
        (user) => user.email !== userToDelete.email
      );
      return updatedUsers;
    });
  }, []);

  const handleUserSelect = useCallback((event, newValue) => {
    setSelectedUsers(newValue);
    setSearchInput("");
  }, []);

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: props?.tooltipColor || theme.palette.primary.light,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: props?.tooltipColor || theme.palette.primary.light,
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: props?.maxWidth || 600,
        margin: "20px auto",
      }}
    >
      <Autocomplete
        multiple
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={searchResults}
        getOptionLabel={(option) => option.name}
        filterOptions={(x) => x}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        value={selectedUsers}
        onChange={handleUserSelect}
        onInputChange={(event, newInputValue) => {
          setSearchInput(newInputValue);
        }}
        inputValue={searchInput}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={props?.placeholder || "Search User"}
            required={props?.isRequired}
            error={isError}
            helperText={isError ? props?.requiredErrorMessage : null}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((user, index) => (
            <CustomTooltip key={user.email} title={user.email} arrow>
              <Chip
                key={user.email}
                label={user.name}
                // {...getTagProps({ index })}
                onDelete={() => handleChipDelete(user)}
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            </CustomTooltip>
          ))
        }
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.email}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box>
                <Typography variant="body1">{option.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.alias ? `${option.alias} • ` : ""}
                  {option.email}
                </Typography>
              </Box>
              {selected && <CheckIcon sx={{ ml: "auto" }} />}
            </Box>
          </li>
        )}
        sx={{
          "& .MuiChip-root": {
            backgroundColor: (theme) =>
              props.chipColor || theme.palette.primary.dark,
            color: (theme) => theme.palette.primary.contrastText,
            "& .MuiChip-deleteIcon": {
              color: (theme) => theme.palette.primary.contrastText,
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: (theme) =>
                (props.autocompleteBordercolor || theme.palette.primary.dark) +
                " solid 1px",
            },
        }}
      />
    </Box>
  );
}

export default PeoplePicker;
