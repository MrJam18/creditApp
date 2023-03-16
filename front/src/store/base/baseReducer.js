export const reducer = {
    setLoading(state, actions) {
        state.loading = actions.payload;
    },
    setError(state, action) {
        state.error = action.payload;
    }
}