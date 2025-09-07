import { instance } from ".";

export const get = async (url: string, options = {}) => {
  try {
    return await instance.get(url, { ...options });
  } catch (err) {
    throw err;
  }
};

export async function post(url: string, body: any, options = {}) {
  try {
    return await instance.post(url, body, { ...options });
  } catch (err) {
    throw err;
  }
}

export async function put(url: string, body?: any, options = {}) {
  try {
    return await instance.put(url, body, { ...options });
  } catch (err) {
    throw err;
  }
}

export async function remove(url: string, options = {}) {
  try {
    return await instance.delete(url, { ...options });
  } catch (err) {
    throw err;
  }
}
