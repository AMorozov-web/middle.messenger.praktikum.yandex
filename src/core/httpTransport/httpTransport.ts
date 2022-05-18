import {METHODS} from '../../constants';
import {queryStringify} from '../../utils';

type HTTPTransportOptions = {
  data: object;
  headers: object;
  method: keyof typeof METHODS;
  timeout: number;
};

/**
 * Класс для создания запросов
 */

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  get = (url: string, options: HTTPTransportOptions) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.GET}, options?.timeout);
  };

  post = (url: string, options: HTTPTransportOptions) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.POST}, options?.timeout);
  };

  put = (url: string, options: HTTPTransportOptions) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.PUT}, options?.timeout);
  };

  delete = (url: string, options: HTTPTransportOptions) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.PUT}, options?.timeout);
  };

  request = (url: string, options: HTTPTransportOptions, timeout = 5000) => {
    const {method, headers, data} = options;
    let params = '';

    if (method === METHODS.GET && data) {
      params = queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + params);

      xhr.timeout = timeout;
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.entries(headers).forEach(([k, v]) => {
          xhr.setRequestHeader(k, v);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
