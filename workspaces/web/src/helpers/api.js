import cookies from 'js-cookie';
import Logger from 'helpers/logger';
import Ajv from 'ajv';
import NotFoundError from 'errors/NotFoundError';

const ajv = new Ajv();
const validator = ajv.compile({
  type: 'object',
  title: 'API Response Body Schema',
  properties: {
    status: { type: 'integer' },
    message: { type: ['string', 'null'] },
    payload: { type: ['array', 'object'] },
  },
});

export class Api {
  constructor() {
    this.apiUrl = `${process.env.API_HOST}:${process.env.API_PORT}`;
    this.token = cookies.get('accessToken');
    this.defaultErrorMessage = 'Unexpected error happened, please try again!';
  }

  header() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Basic ${this.token}`;
    }

    return headers;
  }

  fetch(url, params) {
    return fetch(url, {
      ...params,
      headers: this.header(),
    })
      .catch(error => {
        Logger.error(error);

        return Promise.reject(new Error(this.defaultErrorMessage));
      })
      .then(response =>
        response
          .json()
          // Sorting is important here, this "catch" block should be called before the "then" state
          .catch(error => {
            Logger.error({
              status: response.status,
              headers: response.headers,
              error,
            });

            return Promise.reject(new Error(this.defaultErrorMessage));
          })
          .then(jsonBody => {
            // "response.ok" means that the status code is in range of 200-299
            if (response.ok) {
              const valid = validator(jsonBody);

              if (valid) {
                if (jsonBody.message && response.status !== 200) {
                  return Promise.reject(new Error(jsonBody.message || this.defaultErrorMessage));
                }

                return Promise.resolve(jsonBody.payload);
              }

              Logger.error({
                validationErrors: validator.errors,
                responseDetails: {
                  status: response.status,
                  headers: response.headers,
                  body: jsonBody,
                },
              });
            } else {
              Logger.error({
                status: response.status,
                headers: response.headers,
                body: jsonBody,
              });
            }

            if (response.status === 404) {
              return Promise.reject(
                new NotFoundError(jsonBody.message || this.defaultErrorMessage)
              );
            }

            return Promise.reject(new Error(jsonBody.message || this.defaultErrorMessage));
          })
      );
  }

  login(email) {
    return this.fetch(`${this.apiUrl}/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email }),
    }).then(response => {
      const { token } = response;

      if (token) {
        this.token = token;
        return Promise.resolve(response);
      }

      return Promise.reject(new Error('Token not given'));
    });
  }

  register({ name, email, role }) {
    return this.fetch(`${this.apiUrl}/auth/register`, {
      method: 'post',
      body: JSON.stringify({ name, email, role }),
    }).then(response => {
      const { token } = response;

      if (token) {
        this.token = token;
        return Promise.resolve(response);
      }

      return Promise.reject(new Error('Token not given'));
    });
  }

  getUserDetails() {
    return this.fetch(`${this.apiUrl}/auth/user-details`);
  }

  listSessions() {
    return this.fetch(`${this.apiUrl}/session/list`);
  }

  createSession({ title, voterCount, stories }) {
    return this.fetch(`${this.apiUrl}/session`, {
      method: 'post',
      body: JSON.stringify({
        title,
        voterCount,
        stories,
      }),
    });
  }
}

export default new Api();
