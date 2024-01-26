export async function handeErrors (response: Response | Promise<Response>) {
  response = await response;
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`)
  }
  return response;
}
