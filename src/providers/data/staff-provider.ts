import { DataProvider } from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { API_URL, axiosInstance } from "../config";

export const usersDataProvider = (apiUrl: string): DataProvider => ({
  ...restDataProvider(apiUrl),
  getList: async ({ resource, hasPagination, filters, pagination }) => {
    const url = `${API_URL}${resource}`;

    let paramFilter;

    if (filters) {
      paramFilter = Object.fromEntries(
        //@ts-ignore
        filters.map((item) => [item.field, item.value])
      );
    }

    const { data, headers } = await axiosInstance.get(url, {
      params: {
        perPage: pagination?.pageSize,
        page: pagination?.current,
        ...paramFilter,
      },
    });

    return { data: data.data, total: data.total };
  },
  getOne: async ({ resource, id }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return { data };
  },

  create: async ({ resource, variables }) => {
    const url = `${API_URL}${resource}`;

    const { data } = await axiosInstance.post(url, variables);

    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return { data };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.delete(url);

    return { data };
  },
});
