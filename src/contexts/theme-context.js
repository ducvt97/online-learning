import React, { useState, useEffect } from 'react';
import { Colors } from '../globals/constants';
import { AsyncStorage } from 'react-native';

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

    useEffect(() => {
        // Get latest used theme
        const getStorageData = async () => {
            try {
                const value = await AsyncStorage.getItem("theme");
                if (value !== null) {
                    setTheme(value === "dark" ? themes.dark : themes.light);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getStorageData();
    }, []);

    // Check and set current theme, also save to LocalStorage to use next time
    const checkAndSetTheme = async (theme) => {
        if (theme !== "dark" && theme !== "light") return;
        else {
            try {
                await AsyncStorage.setItem("theme", theme);
                setTheme(theme === "dark" ? themes.dark : themes.light);
            } catch (error) {
                alert(error);
            }
        }
    }

    return <ThemeContext.Provider value={{theme, setTheme: checkAndSetTheme}}>
        {props.children}
    </ThemeContext.Provider>
}

export {ThemeProvider, ThemeContext, themes}
