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
});
