import React, { useState } from 'react';
import { Colors } from '../globals/constants';

const themes = {
    dark: {
        background: {
            backgroundColor: Colors.black
        },
        titleColor: {
            color: Colors.white
        },
        textColor: {
            color: Colors.gainsboro
        },
        inputBackground: {
            backgroundColor: Colors.gainsboro
        },
        navigationHeader: {
            backgroundColor: Colors.boldGrey
        },
        backgroundColor: Colors.black,
        tintColor: Colors.white,
        inactiveTintColor: Colors.gainsboro
    },
    light: {
        background: {
            backgroundColor: Colors.light
        },
        titleColor: {
            color: Colors.black
        },
        textColor: {
            color: Colors.dark
        },
        inputBackground: {
            backgroundColor: Colors.transparent
        },
        navigationHeader: {
            backgroundColor: Colors.darkGrey
        },
        backgroundColor: Colors.light,
        tintColor: Colors.dark,
        inactiveTintColor: Colors.dimGrey,
    }
};

const ThemeContext = React.createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light);
    const toggleTheme = () => {
        if (theme === themes.light)
            setTheme(themes.dark);
        else
            setTheme(themes.light);
    }

    return <ThemeContext.Provider value={{theme, setTheme}}>
        {props.children}
    </ThemeContext.Provider>
}

export {ThemeProvider, ThemeContext, themes}
