
export const formatarMoeda = (value: string) => {
    const paresed = parseFloat(value);
    return paresed.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const formatToPostgresDecimal = (number: string): number | string => {
 // Remove todos os pontos da string, exceto o último
 const parts = number.split('.');
 const integerPart = parts.slice(0, -1).join('').replace(/\./g, '');
 const decimalPart = parts[parts.length - 1];
 const numberWithDecimal = `${integerPart}.${decimalPart}`;

 // Verifica se o número é uma string vazia ou contém caracteres inválidos
 if (!numberWithDecimal || isNaN(Number(numberWithDecimal))) {
     return 'Número inválido';
 }

 // Converte a string para um número decimal
 const numberFormatted = parseFloat(numberWithDecimal);

 console.log(`fucking numero ${numberFormatted}`)
 return numberFormatted;
}
