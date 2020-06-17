import React, { useState } from 'react';
import { authorsData } from '../raw-data/authors';

const AuthorsContext = React.createContext();

const AuthorsProvider = (props) => {
    const [authors, setAuthors] = useState(authorsData);

    const getAuthorById = (authorId) => {
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === authorId)
                return authors[i];
        }
        return null;
    }

    const toggleFollowAuthor = (authorId) => {
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].id === authorId) {
                const temp = [...authors];
                temp[i].followed = !temp[i].followed;
                setAuthors(temp);
            }
        }
    }

    return <AuthorsContext.Provider value={{authors, getAuthorById, toggleFollowAuthor}}>
        {props.children}
    </AuthorsContext.Provider>
}

export {AuthorsProvider, AuthorsContext}
