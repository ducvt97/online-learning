import { useContext } from "react";
import { AuthorsContext } from "../../contexts/authors-context";

export const getAuthorById = (authorId) => {
    const {authors} = useContext(AuthorsContext);
    for (let i = 0; i < authors.length; i++) {
        if (authors[i].id === authorId)
            return authors[i];
    }
    return null;
}

export const toggleFollowAuthor = (authorId) => {
    const {toggleFollowAuthor} = useContext(AuthorsContext);
    toggleFollowAuthor(authorId);
}