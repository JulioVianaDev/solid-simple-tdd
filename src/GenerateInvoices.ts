import pg from "pg-promise"
export class GenerateInvoices{
    async execute():Promise<any>{
        const connection = await  pg()("postgres://julio:tomate@localhost:5432/julio")
        const contracts = await connection.query('select * from julio.contract',[]);
        console.log(contracts);
        return []
    }
}