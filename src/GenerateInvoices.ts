import pg from "pg-promise"
export class GenerateInvoices{
    async execute(){
        const connection = await  pg()("postgres://julio:tomate@localhost:5432/julio")
        const contracts = await connection.query('select * from julio.contract',[]);
        console.log(contracts);
        return []
    }
}