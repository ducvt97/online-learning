import React, { useState } from 'react';
import { pathsData } from '../raw-data/paths';

const PathsContext = React.createContext();

const PathsProvider = (props) => {
    const [paths, setPaths] = useState(pathsData);

    const getPathById = (pathId) => {
        for (let i = 0; i < paths.length; i++) {
            if (paths[i].id === pathId)
                return paths[i];
        }
        return null;
    }

    return <PathsContext.Provider value={{paths, getPathById}}>
        {props.children}
    </PathsContext.Provider>
}

export {PathsProvider, PathsContext}
