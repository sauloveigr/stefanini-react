import {useState} from 'react';
import {handleFormError} from '../../../utils/api/errorHandler';

export const useFormOperations = () => {
    const [backendErrors, setBackendErrors] = useState<{[key: string]: string}>(
        {},
    );

    const clearFormErrors = () => {
        setBackendErrors({});
    };

    const handleFormOperation = async (
        operation: () => Promise<unknown>,
        onSuccess: () => void,
        showToast: (type: 'success' | 'error', message: string) => void,
        successMessage: string,
    ) => {
        try {
            setBackendErrors({});
            await operation();
            onSuccess();
            clearFormErrors();
            showToast('success', successMessage);
        } catch (error) {
            const errors = handleFormError(error);
            setBackendErrors(errors);
        }
    };

    return {
        backendErrors,
        clearFormErrors,
        handleFormOperation,
    };
};
