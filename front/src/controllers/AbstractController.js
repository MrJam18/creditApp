import {formDataConverter} from "../utils/formDataConverter";
import {dispatch} from "../index";

export class AbstractController
{
    #setError;
    #setLoading;
    #data;
    #setShow;
    _handler;
    _dispatch = dispatch;
    /**
     *
     * @param {function} setError function which change error state
     * @param {function} setLoading function which change loading state
     * @param {function} setShow function which change show state for close modalWindow
     * @param {object} data data for use in handler
     * @param {object} formRef formRef what inserted to data properties
     */
    constructor(setError, setLoading, setShow = null, data = null, formRef = null,)
    {
        this.#setError = setError;
        this.#setLoading = setLoading;
        this.#data = data ?? {};
        if(formRef) this.#data = {...this.#data, ...formDataConverter(formRef)};
        this.#setShow = setShow;
    }

    async handle()
    {
        this.#setLoading(true);
        this.#setError(false);
        try{
            if(!this._handler) throw new Error('handler dont created');
            await this._handler(this.#data);
            if(this.#setShow) this.#setShow(false);
        }
        catch (e) {
            this.#setError(e);
        }
        finally {
            this.#setLoading(false);
        }
    }


}