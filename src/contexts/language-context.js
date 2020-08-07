import React, { useState, useEffect } from 'react';
import en from '../../assets/translations/en.json';
import vi from '../../assets/translations/vi.json';
import { AsyncStorage } from 'react-native';

// Default language if no language set before
const initState = {
    locale: "en",
    translation: en
};

const LanguageContext = React.createContext();

const LanguageProvider = (props) => {
    const [state, setState] = useState(initState);

    useEffect(() => {
        // Get latest used language
        const getStorageData = async () => {
            try {
                const value = await AsyncStorage.getItem("locale");
                if (value !== null) {
                    setState({...state, locale: value, translation: value === "vi" ? vi : en});
                }
            } catch (error) {
                console.log(error);
            }
        }
        getStorageData();
    }, []);

    // Check and set current locale, also save to LocalStorage to use next time
    const setLocale = async (locale) => {
        if (locale !== "vi" && locale !== "en") return;
        else {
            try {
                await AsyncStorage.setItem("locale", locale);
                setState({...state, locale: locale, translation: locale === "vi" ? vi : en});
            } catch (error) {
                alert(error);
            }
        }
    }

    return <LanguageContext.Provider value={{state, setLocale}}>
        {props.children}
    </LanguageContext.Provider>
}

export {LanguageProvider, LanguageContext}
