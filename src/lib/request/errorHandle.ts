import { AxiosError } from 'axios';

const HTTP_STATUS_MESSAGES = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  BANDWIDTH_LIMIT_EXCEEDED: 509,
};

const TIMEOUT_ERROR = 'ERR_CANCELED';

export const errorHandler = (error: unknown) => {
  let errorMensage = '';

  if (error instanceof AxiosError) {
    const listedErrors =
      Object.values(HTTP_STATUS_MESSAGES).filter(
        (knowError) => knowError === error.response?.status
      ).length > 0;
    if (listedErrors) {
      errorMensage = 'O servidor fahou em responder, tente recarregar a página';
      return errorMensage;
    }
    if (error.code === TIMEOUT_ERROR) {
      errorMensage = 'O servidor demorou para responder, tente mais tarde';
      return errorMensage;
    }
    errorMensage =
      'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde';
  }
  return errorMensage;
};
