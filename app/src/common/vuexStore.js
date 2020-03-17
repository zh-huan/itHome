function vuexStore(Vuex) {
    let store = new Vuex.Store({
        state: {
            user: null
        },
        getters: {
            getCurrentUser: state => {
                return state.user;
            }
        },
        mutations: {
            setUser(state, user) {
                state.user = user;
            },
            removeUser(state) {
                state.user = null;
            }
        },
        actions: {

        },
        modules: {

        }
    });
    return store;
}

export default vuexStore;