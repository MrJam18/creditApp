import {AbstractController} from "./AbstractController";
import {createIPInitDoc} from "../store/contracts/actions";

export class CreateIPInitController extends AbstractController
{
    async _handler(data)
    {
        if(!data.agent) throw new Error('Укажите представителя!');
        await this._dispatch(createIPInitDoc(data.contractId, data.agent.id));
    }
}