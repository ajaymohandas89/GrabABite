import React, {useState} from "react";
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./mythemes/theme";
import {GlobalStyles} from "./mythemes/global";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// The function that toggles between themes
function ToggleTheme() {
  const [theme, setTheme] = useState("light");
  const [state, setState] = React.useState({
    checkedInput: false,
  });
  const toggleChecked = (event) => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setState({...state, [event.target.name]: event.target.checked});
  };

  // Return the layout based on the current theme
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <FormGroup>
        <FormControlLabel control={<Switch size="small" checked={state.checkedInput} onChange={toggleChecked} name="checkedInput" />} label="" />
      </FormGroup>
    </ThemeProvider>
  );
}

export default ToggleTheme;
