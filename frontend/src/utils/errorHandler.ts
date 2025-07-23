export interface FormErrors {
    [key: string]: string;
}

export const parseValidationErrors = (errorMessage: string): FormErrors => {
    const errors: FormErrors = {};

    if (errorMessage.includes('email must be an email')) {
        errors.email = 'Email deve ser um email válido';
    }
    if (errorMessage.includes('CPF must have 11 numeric digits')) {
        errors.cpf = 'CPF deve ter 11 dígitos numéricos';
    }

    return errors;
};

export const parseUniquenessErrors = (errorMessage: string): FormErrors => {
    const errors: FormErrors = {};

    if (errorMessage.includes('User with this CPF already exists')) {
        errors.cpf = 'CPF já está cadastrado no sistema';
    } else if (errorMessage.includes('CPF') || errorMessage.includes('cpf')) {
        errors.cpf = 'CPF já está cadastrado no sistema';
    }

    if (Object.keys(errors).length === 0) {
        errors.cpf = 'CPF já está cadastrado no sistema';
    }

    return errors;
};

export const handleFormError = (error: unknown): FormErrors => {
    console.error('Form error:', error);
    const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

    const isValidationError =
        errorMessage.includes('email must be an email') ||
        errorMessage.includes('CPF must have 11 numeric digits') ||
        errorMessage.includes('validation');

    const isUniquenessError =
        errorMessage.includes(
            'User creation failed: User with this CPF already exists',
        ) ||
        errorMessage.includes(
            'User update failed: User with this CPF already exists',
        ) ||
        errorMessage.includes('User with this CPF already exists') ||
        errorMessage.includes('already exists');

    if (isValidationError) {
        return parseValidationErrors(errorMessage);
    } else if (isUniquenessError) {
        return parseUniquenessErrors(errorMessage);
    }

    return {};
};
