import {AbstractController} from "./AbstractController";
import {createCourtClaim} from "../store/contracts/actions";

export class CreateCourtClaimController extends AbstractController
{
    async _handler(data)
    {
        await this._dispatch(createCourtClaim(data));
    }
}