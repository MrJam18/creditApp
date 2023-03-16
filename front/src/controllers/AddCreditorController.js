import {AbstractController} from "./AbstractController";
import {addCreditor} from "../store/creditors/actions";

export class AddCreditorController extends AbstractController
{
    async _handler(data)
    {
        if(!data.address) throw new Error('Введите адрес и выберите из списка!');
        await this._dispatch(addCreditor(data));
    }
}