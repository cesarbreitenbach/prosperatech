

export interface AmountProps{
    amountReal: string;
    amountBonus: string;
    saldo: string;
    endereco: string;
    taxaGanho: number;
}

export interface IInvestments {
    descricao: string;
    type: string;
    valorInvestido: string;
    taxaBase: string;
    nivelBoost: number;
    finalizaEm: string;
}

export interface IPerks {
    idPerk: number;
    namePerk: string;
    taxPerk: string;
    efficiency_level: number;
    finalizaEm: string;
    count: number;
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

export interface IActivePerk {
    id: number;
    name: string;
    cost: string;
  }

  export interface IBuyUserPercs{
    idPerk: number;
    totalItems: number;
  }

  export interface ILastCalculate {
    lastTimeCalculated: string;
    nextTimeToCalculate: string;
  }

  export interface IUserMovimentation {
    id?: number;
		idWallet?: number;
		deposito?: string;
		saque?: string;
		amountBonus: string;
		amountReal: string;
		tipo: string;
    createdAt: string;
  }