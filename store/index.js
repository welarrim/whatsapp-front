export const state = () => ({
    isAuth: false,
    qrCode: null,
    contacts: [],
    messages: [],
    group: []
})

export const mutations = {
    setQrCode(state, payload) {
        state.qrCode = payload
    },
    setIsAuth(state, payload) {
        state.isAuth = payload
    },
    setContacts(state, payload) {
        state.contacts = payload
    },
    setMessages(state, payload) {
        state.messages = payload
    },
    setGroup(state, payload) {
        state.group = payload
    },
    appendMessage(state, payload) {
        state.messages = [...state.messages, payload];
    }
}
