/**
 *
 * @param {string} bigChunk first property of store
 * @returns function, which have chunk of store as string with max 3 nested properties
 */
import {capitalizeFirstLetter} from "../../utils/text/capitalize";

export const selectorCreator = (bigChunk) => {
    /**
     * @param {string} chunk several properties of store(max 3)
     * @returns function selector for redux-store
     */
    const selectorMiniChunkCreator = (chunk) => {
        if(/\./.test(chunk)) {
            const chunks = chunk.split('.', 3);
            switch(chunks.length) {
                case 2:
                    return (store) => store[bigChunk][chunks[0]][chunks[1]];
                case 3:
                    return (store) => store[bigChunk][chunks[0]][chunks[1]][chunks[2]];
            }
        }
        return (store) => store[bigChunk][chunk]
    }
    return selectorMiniChunkCreator;
    
}

export class SelectorCreator
{
    #bigChunk;
    easyCreator;
    /**
     * @param {string} chunk several properties of store(max 3)
     * @returns function selector for redux-store
     */
    chunkCreator;
    /**
     *
     * @param {string} bigChunk first property of store
     * @returns object with function chunkCreator, which have chunk of store as string with max 3 nested properties
     */
    constructor(bigChunk) {
        this.#bigChunk = bigChunk;
        this.easyCreator = (chunk) => {
            this['get' + capitalizeFirstLetter(chunk)] = (store) => store[bigChunk][chunk];
            return this['get' + chunk];
        }
        this.chunkCreator = (chunk) => {
            if (/\./.test(chunk)) {
                const chunks = chunk.split('.', 4);
                switch (chunks.length) {
                    case 2:
                        return (store) => store[bigChunk][chunks[0]][chunks[1]];
                    case 3:
                        return (store) => store[bigChunk][chunks[0]][chunks[1]][chunks[2]];
                    case 4:
                        return (store) => store[bigChunk][chunks[0]][chunks[1]][chunks[2]][chunks[3]];
                }
            }
            return (store) => store[bigChunk][chunk]
        }
    }
}
