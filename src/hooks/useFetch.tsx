import { useState, useEffect } from "react";

export type ApiResponse = {
  id: number;
  name: string;
  time: string;
};

export const useFetch = (url: string) => {
  const [data, setData] = useState<ApiResponse[]>([] as ApiResponse[]);

  const [config, setConfig] = useState({});
  const [method, setMethod] = useState<string>();
  const [callFetch, setCallFetch] = useState();

  const httpConfig = (data: ApiResponse, method: string) => {
    if (method === "POST") {
      setConfig({
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = (await response.json()) as ApiResponse[];
      setData(json);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        const res = await fetch(url, config);
        const json = await res.json();
        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig };
};
