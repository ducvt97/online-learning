import React, { useState } from 'react';

const HomeContext = React.createContext();

const HomeProvider = (props) => {
    const [shouldContinueLearningReload, setShouldContinueLearningReload] = useState(false);
    const [shouldFavoritesReload, setShouldFavoritesReload] = useState(false);

    return <HomeContext.Provider value={{shouldContinueLearningReload, shouldFavoritesReload, setShouldContinueLearningReload, setShouldFavoritesReload}}>
        {props.children}
    </HomeContext.Provider>
}

export {HomeProvider, HomeContext}
