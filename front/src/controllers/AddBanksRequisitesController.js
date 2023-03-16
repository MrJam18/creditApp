import {AbstractController} from "./AbstractController";
import {addBanksRequisites} from "../store/creditors/actions";

export class AddBanksRequisitesController extends AbstractController
{
    async _handler(data)
    {
        if(data.name === '' || data.BIK === '') throw new Error('Заполните все поля!');
        if(!/^\d{9}$/.test(data.BIK)) throw new Error("БИК должен состоять из 9 цифр!");
        await this._dispatch(addBanksRequisites(data.name, data.BIK));
    }
}