export const validateCPF = (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, '');

    if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) {
        return 'CPF inválido';
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(cleanCpf[i]) * (10 - i);
    }

    let check1 = (sum * 10) % 11;
    if (check1 === 10) check1 = 0;
    if (check1 !== Number(cleanCpf[9])) return 'CPF inválido';

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(cleanCpf[i]) * (11 - i);
    }

    let check2 = (sum * 10) % 11;
    if (check2 === 10) check2 = 0;
    if (check2 !== Number(cleanCpf[10])) return 'CPF inválido';

    return true;
};
