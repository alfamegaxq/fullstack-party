export const LOAD_REPOSITORY = 'LOAD_REPOSITORY';
export const REPOSIOTRY_LOADED = 'REPOSIOTRY_LOADED';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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

export const login = (token) => {
    return {
        type: LOGIN,
        token
    }
};

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
};


export const logout = (history) => {
    return {
        type: LOGOUT,
        history
    }
};

export const logoutSuccess = (payload) => {
    return {
        type: LOGOUT_SUCCESS,
        payload
    }
};
