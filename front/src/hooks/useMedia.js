import {useEffect} from "react";


/**
 *  media query hook using Javascript
 * @param {string} mediaQuery  media query. Example: 'max-width: 900px'.
 * @param {object} styles styles which applied when media query match;
 * @param {function} setStyles function(set state) which change styles.
 * @param {object} defaultStyles styles which applied when media query don't match;
 */
export const useMedia = (mediaQuery, styles, setStyles, defaultStyles = null) => {
    const eventHandler = (e) => {
            if(e.matches) setStyles(styles);
            else setStyles(defaultStyles);
        };
    useEffect(()=> {
        const matchMedia = window.matchMedia(`(${mediaQuery})`);
        if(matchMedia.matches) setStyles(styles);
        matchMedia.addEventListener('change', eventHandler);
        return ()=> {
            setStyles(null);
        }
    }, []);
}