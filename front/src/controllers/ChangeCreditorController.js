import {AbstractController} from "./AbstractController";
import {changeCreditor} from "../store/creditors/actions";

export class ChangeCreditorController extends AbstractController
{
    async _handler(data)
    {
        await this._dispatch(changeCreditor(data));
    }

}