export async function request(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    credentials: "include",
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return window.fetch(endpoint, config).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      return Promise.reject({ error: data, status_code: response.status });
    }
    return data;
  });
}
