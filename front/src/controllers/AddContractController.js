import {AbstractController} from "./AbstractController";
import {createContract} from "../store/contracts/actions";

export class AddContractController extends AbstractController
{
    async _handler(data)
    {
        if(!data.cessionId) throw new Error('Выберите договор цессии!');
        if(!data.creditorId) throw new Error('Выберите кредитора, которому принадлежит заем!');
        await this._dispatch(createContract(data));
    }
}