async function FetchCustom<T>(
  apiName: string,
  data?: any,
  method: string = "GET"
): Promise<T> {
  return fetch(apiName, {
    method: method,
    body: data,
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
}

export default FetchCustom;
