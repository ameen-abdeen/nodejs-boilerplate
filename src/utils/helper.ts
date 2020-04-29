// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const asyncForEach = async (array, callback): Promise<void> => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    await callback(array[index], index, array);
  }
};

/** Format the access token to be included within HTTP request */
export const formatToken = (token: string): object => ({
  timeout: 10000,
  headers: { Authorization: token },
});
