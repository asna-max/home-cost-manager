export const ENDPOINTS = {
  AUTH: {
    LOGIN: "token/",
  },

  BILLS: {
    LIST: "bills/",
    DETAIL: (id) => `bills/${id}`,
    EXTRACT: "bills/extract/",
  },

  HOUSEHOLDS: {
    LIST: "households/",
    INVITE_LIST: "households/invite/list/",
    ACCEPT: (id) => `households/invite/${id}/accept/`,
    DECLINE: (id) => `households/invite/${id}/decline/`,
  },
  HOMES: {
    DETAIL: (id) => `households/homes/${id}/`,
  },
};
