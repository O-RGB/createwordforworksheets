async function FetchCustom<T>(
  apiName: string,
  data?: any,
  method: string = "GET",
  headers: any = undefined
): Promise<T> {
  return fetch(apiName, {
    method: method,
    body: data,
    headers: headers,
    
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
}

export default FetchCustom;
