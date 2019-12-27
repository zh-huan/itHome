function vuexStore(Vuex) {
    let store = new Vuex.Store({
        state: {
            user: {}
        },
        getter: {
            getCurrentUser: state => {
                return state.user;
            }
        },
        mutations: {
            setUser(state, user) {
                state.user = user;
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