import {APIGatewayProxyEvent} from "aws-lambda";
import {validateTokenPk} from "../utils/validation";


export async function getChargesStatus(event: APIGatewayProxyEvent) {
    validateTokenPk(event);

    return "Test";
}
