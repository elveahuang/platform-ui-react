import { setupHttp } from '@commons/utils/http';
import { setupTheme } from '@commons/utils/theme';

const setup = () => {
    setupHttp();
    setupTheme();
};

export default setup;
