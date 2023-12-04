// Vendors
import { AxiosResponse } from "axios";

// Api
import Api from "@/services/api/index";

// Models
import { Response } from "@/models/response";

// Services
import { getStatus, setNotification } from "@/services/app/common";

// Store
import store from "@/store/index";

const getRequest = async (options: { uri: string; formData?: any; isProtected?: boolean; isSuccessNotificationVisible?: boolean; isErrorNotificationVisible?: boolean }): Promise<Response> => {
  let response: Response = new Response();

  await Api({
    method: "GET",
    headers: {
      Authorization: `${options.isProtected ? `Bearer ${store.getters.getAuthentication.token}` : ``}`,
    },
    url: `${options.uri}`,
    params: options.formData,
  })
    .then((r: AxiosResponse) => {
      response = {
        data: r.data ?? null,
        message: r.data.message ?? "",
        status: getStatus(r.status),
      };

      if (options.isSuccessNotificationVisible) {
        setNotification(response.message, response.status);
      }
    })
    .catch((e) => {
      response = {
        data: e.response.data ?? null,
        message: e.response.data.message ?? "",
        status: getStatus(e.response.status),
      };

      if (options.isErrorNotificationVisible) {
        setNotification(response.message, response.status);
      }
    });

  return response;
};

const postRequest = async (options: { uri: string; formData?: any; isProtected?: boolean; isSuccessNotificationVisible?: boolean; isErrorNotificationVisible?: boolean }): Promise<Response> => {
  let response: Response = new Response();

  await Api({
    method: "POST",
    headers: {
      Authorization: `${options.isProtected ? `Bearer ${store.getters.getAuthentication.token}` : ``}`,
    },
    url: `${options.uri}`,
    data: options.formData,
  })
    .then((r: AxiosResponse) => {
      response = {
        data: r.data ?? null,
        message: r.data.message ?? "",
        status: getStatus(r.status),
      };

      if (options.isSuccessNotificationVisible) {
        setNotification(response.message, response.status);
      }
    })
    .catch((e) => {
      response = {
        data: e.response.data ?? null,
        message: e.response.data.message ?? "",
        status: getStatus(e.response.status),
      };

      if (options.isErrorNotificationVisible) {
        setNotification(response.message, response.status);
      }
    });

  return response;
};

const postRequestUpload = async (options: { uri: string; formData?: any; isProtected?: boolean; isSuccessNotificationVisible?: boolean; isErrorNotificationVisible?: boolean }): Promise<Response> => {
  let response: Response = new Response();

  await Api({
    method: "POST",
    headers: {
      Authorization: `${options.isProtected ? `Bearer ${store.getters.getAuthentication.token}` : ``}`,
      "Content-Type": "multipart/form-data"
    },
    url: `${options.uri}`,
    data: options.formData,
  })
    .then((r: AxiosResponse) => {
      response = {
        data: r.data ?? null,
        message: r.data.message ?? "",
        status: getStatus(r.status),
      };

      if (options.isSuccessNotificationVisible) {
        setNotification(response.message, response.status);
      }
    })
    .catch((e) => {
      response = {
        data: e.response.data ?? null,
        message: e.response.data.message ?? "",
        status: getStatus(e.response.status),
      };

      if (options.isErrorNotificationVisible) {
        setNotification(response.message, response.status);
      }
    });

  return response;
};

const putRequest = async (options: { uri: string; formData?: any; isProtected?: boolean; isSuccessNotificationVisible?: boolean; isErrorNotificationVisible?: boolean }): Promise<Response> => {
  let response: Response = new Response();

  await Api({
    method: "PUT",
    headers: {
      Authorization: `${options.isProtected ? `Bearer ${store.getters.getAuthentication.token}` : ``}`,
    },
    url: `${options.uri}`,
    data: options.formData,
  })
    .then((r: AxiosResponse) => {
      response = {
        data: r.data ?? null,
        message: r.data.message ?? "",
        status: getStatus(r.status),
      };

      if (options.isSuccessNotificationVisible) {
        setNotification(response.message, response.status);
      }
    })
    .catch((e) => {
      response = {
        data: e.response.data ?? null,
        message: e.response.data.message ?? "",
        status: getStatus(e.response.status),
      };

      if (options.isErrorNotificationVisible) {
        setNotification(response.message, response.status);
      }
    });

  return response;
};

const deleteRequest = async (options: { uri: string; formData?: any; isProtected?: boolean; isSuccessNotificationVisible?: boolean; isErrorNotificationVisible?: boolean }): Promise<Response> => {
  let response: Response = new Response();

  await Api({
    method: "DELETE",
    headers: {
      Authorization: `${options.isProtected ? `Bearer ${store.getters.getAuthentication.token}` : ``}`,
    },
    url: `${options.uri}`,
    data: options.formData,
  })
    .then((r: AxiosResponse) => {
      response = {
        data: r.data ?? null,
        message: r.data.message ?? "",
        status: getStatus(r.status),
      };

      if (options.isSuccessNotificationVisible) {
        setNotification(response.message, response.status);
      }
    })
    .catch((e) => {
      response = {
        data: e.response.data ?? null,
        message: e.response.data.message ?? "",
        status: getStatus(e.response.status),
      };

      if (options.isErrorNotificationVisible) {
        setNotification(response.message, response.status);
      }
    });

  return response;
};

export { getRequest, postRequest, postRequestUpload, putRequest, deleteRequest };
