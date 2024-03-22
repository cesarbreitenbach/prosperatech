 
export default () => {
    const generateRandomNumber = async (numDigits: number, possibilities: number, lastGeneratedNumber: string, counter: number, dificult: number): Promise<string> => {
        console.log(`peguei dificuldate: ${dificult}`)
        let digits = Array.from({ length: possibilities }, (_, i) => i);

        let randomNumber = '';
    
        // Modifica porcentagem de ganho. 
        const allEqual = Math.random() < dificult;
    
        if (allEqual) {
            // Escolhe um dígito aleatório
            const digit = Math.floor(Math.random() * possibilities);
            // Preenche o número aleatório com o mesmo dígito repetido
            randomNumber = digit.toString().repeat(numDigits);
        } else {
            for (let i = 0; i < numDigits; i++) {
                // Se houver dígitos disponíveis para escolher
                if (digits.length > 0) {
                    // Escolhe um dígito aleatório entre os disponíveis
                    let randomIndex = Math.floor(Math.random() * digits.length);
                    let digit = digits[randomIndex];
    
                    // Remove o dígito escolhido do array de dígitos disponíveis
                    digits.splice(randomIndex, 1);
    
                    // Verifica se o dígito escolhido é igual ao dígito correspondente no último número gerado
                    if (lastGeneratedNumber.length > 0 && lastGeneratedNumber[i] === digit.toString()) {
                        // Se for igual, escolhe um novo dígito até que seja diferente
                        while (lastGeneratedNumber[i] === digit.toString()) {
                            randomIndex = Math.floor(Math.random() * digits.length);
                            digit = digits[randomIndex];
                        }
                    }
    
                    // Adiciona o dígito ao número aleatório
                    randomNumber += digit.toString();
                } else {
                    // Se não houver mais dígitos disponíveis, apenas adiciona dígitos aleatórios
                    randomNumber += Math.floor(Math.random() * possibilities).toString();
                }
            }
        }

        // if (counter === 100 || counter === 1000) {
        //     randomNumber = '888';
        // }

        return randomNumber;
    }
    
    const verifyWinniner = (randomNumber: string, amount: number, setPremio: (value: string) => void) => {

        const char1 = randomNumber[0];
        const char2 = randomNumber[1];
        const char3 = randomNumber[2];
        
        if (char1 === char2 && char2 === char3) {
            let premio = 0;
            const sum = Number(char1) + Number(char2) + Number(char3) 
            if (sum > 25) {
              premio = (Number(amount) * 10); 
            } else if (sum > 21) {
              premio = Number(amount) * 5; 
            } else {
              premio = Number(amount) * 3;
            }
            setPremio(premio.toFixed(2))
        return true;
        }
        return false;
    }

  return ({
    generateRandomNumber,
    verifyWinniner
  })
}