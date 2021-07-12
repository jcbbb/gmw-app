export async function request(endpoint, { body, stringify = true, ...customConfig } = {}) {
  const headers = stringify
    ? {
        "Content-Type": "application/json",
      }
    : {};

  const config = {
    method: body ? "POST" : "GET",
    body: body && stringify ? JSON.stringify(body) : body || undefined,
    credentials: "include",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return window.fetch(endpoint, config).then(async (response) => {
    const data = await response.json().catch(() => {});
    if (!response.ok) {
      return Promise.reject({ error: data, status_code: response.status });
    }
    return data;
  });
}
