export const setAlert = (header, text, type)=> ({
    type: 'ALERT::CHANGE',
    payload: {
        header,
        text,
        type: type ? type : 'success'
    }
})

export const hideAlert = () => ({
    type: 'ALERT::HIDE'
})
