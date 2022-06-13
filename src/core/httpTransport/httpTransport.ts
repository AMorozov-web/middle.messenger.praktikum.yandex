import {METHODS} from '../../constants';
import {queryStringify} from '../../utils';

type HTTPTransportOptions = {
  data?: object;
  headers?: object;
  method: keyof typeof METHODS;
  timeout?: number;
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

  get = <T = unknown>(url: string, options?: Omit<HTTPTransportOptions, 'method'>) => {
    return this.request<T>(this.getUrl(url), {...options, method: METHODS.GET}, options?.timeout);
  };

  post = <T = unknown>(url: string, options?: Omit<HTTPTransportOptions, 'method'>) => {
    return this.request<T>(this.getUrl(url), {...options, method: METHODS.POST}, options?.timeout);
  };

  put = <T = unknown>(url: string, options?: Omit<HTTPTransportOptions, 'method'>) => {
    return this.request<T>(this.getUrl(url), {...options, method: METHODS.PUT}, options?.timeout);
  };

  delete = <T = unknown>(url: string, options?: Omit<HTTPTransportOptions, 'method'>) => {
    return this.request<T>(
      this.getUrl(url),
      {...options, method: METHODS.DELETE},
      options?.timeout,
    );
  };

  request = <T>(url: string, options: HTTPTransportOptions, timeout = 5000) => {
    const {method, headers, data} = options;
    let params = '';

    if (method === METHODS.GET && data) {
      params = queryStringify(data);
    }

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + params);

      xhr.withCredentials = true;
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
