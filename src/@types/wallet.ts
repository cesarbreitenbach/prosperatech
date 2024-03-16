

export interface AmountProps{
    amountReal: string;
    amountBonus: string;
    saldo: number;
    endereco: string;
    taxaGanho: number;
}

export interface IInvestments {
    descricao: string;
    type: string;
    valorInvestido: string;
    taxaBase: string;
    nivelBoost: number;
}

export interface IPerks {
    idPerk: number;
    namePerk: string;
    taxPerk: string;
    efficiency_level: number;
    finalizaEm: string;
}

export interface IPerksTypes {
    id: number;
    name: string;
    description: string;
    mining_rate: string;
    cost: string;
    allowCoin: string;
    createAt: string;
}