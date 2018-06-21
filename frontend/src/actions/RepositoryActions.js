export const LOAD_REPOSITORY = 'LOAD_REPOSITORY';
export const REPOSIOTRY_LOADED = 'REPOSIOTRY_LOADED';

export const loadRepository = () => {
    return {
        type: LOAD_REPOSITORY
    }
};

export const repositoryLoaded = (payload) => {
    return {
        type: REPOSIOTRY_LOADED,
        payload
    }
};
