import ContractRepository from "./ContractRepository";

import pg from "pg-promise"

export default class ContractDatabaseRepository implements ContractRepository {

    async list(): Promise<any> {
        const connection = await pg()("postgres://julio:tomate@localhost:5432/julio")
        const contracts = await connection.query('select * from julio.contract', []);
        for (const contract of contracts) {
            contract.payments = await connection.query('select * from julio.payment where id_contract = $1', [contract.id_contract])

        }
        await connection.$pool.end();
        return contracts
    }
}
