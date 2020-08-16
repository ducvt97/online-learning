import React, { useState } from 'react';

const HomeContext = React.createContext();

/*
    Context to store should update state for HomeComponent
    Use for ContinueLearning and Favorites list
*/
const HomeProvider = (props) => {
    const [shouldContinueLearningReload, setShouldContinueLearningReload] = useState(false);
    const [shouldFavoritesReload, setShouldFavoritesReload] = useState(false);

    return <HomeContext.Provider value={{shouldContinueLearningReload, shouldFavoritesReload, setShouldContinueLearningReload, setShouldFavoritesReload}}>
        {props.children}
    </HomeContext.Provider>
}

export {HomeProvider, HomeContext}
