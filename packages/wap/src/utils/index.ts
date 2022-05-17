import { setupHttp } from '@commons/utils/http';
import { setupTheme } from '@commons/utils/theme';

export const setup = () => {
    setupHttp();
    setupTheme();
};
