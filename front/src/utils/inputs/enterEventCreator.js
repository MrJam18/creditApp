export const enterEventCreator = (func) => {
    return (ev) => {
        if(ev.key === 'Enter') {
            ev.preventDefault();
            func(ev);
        }
    }
}