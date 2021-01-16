import Axios, { AxiosError, AxiosPromise, AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

export interface IAppService {
    axios: AxiosInstance;
    accessToken: string;
    authorize: Function;
    isAuthorized?: boolean;
}

const AppService: IAppService = {} as IAppService;
const axios = Axios.create();
AppService.axios = axios;
AppService.authorize = (token: string): AxiosInstance => {
    AppService.accessToken = token;
    AppService.isAuthorized = true;
    return axios;
};

const requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig => {
    // if (AppService.isAuthorized && AppService.accessToken) {
    //     request.headers["Authorization"] = "Bearer " + AppService.accessToken;
    // }
    return request;
};
const successHandler = (result: AxiosResponse): AxiosResponse => {
    return result;
};
const errorHandler = (error: AxiosError): AxiosPromise => {
    return Promise.reject(error.response);
};
AppService.axios.interceptors.request.use(requestHandler);
AppService.axios.interceptors.response.use(successHandler, errorHandler);

export default AppService;
