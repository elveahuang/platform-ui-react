import { setupTheme } from '@commons/utils/theme';
import { setupHttp } from '@commons/utils/http';
import { FormInstance } from 'antd';

export const setup = () => {
    setupTheme();
    setupHttp();
};

/**
 * 处理后台表单验证错误
 */
export const handleRemoteValidationError = (form: FormInstance, errors: Array<any>) => {
    const fieldErrors = errors.map((e) => {
        return {
            name: e.property,
            errors: [e.message],
        };
    });
    form.setFields(fieldErrors);
};
