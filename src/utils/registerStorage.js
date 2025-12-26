export const REGISTER_STORAGE_KEY = 'hf_registered_v1';

export function isRegistered() {
  try {
    return localStorage.getItem(REGISTER_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setRegistered() {
  try {
    localStorage.setItem(REGISTER_STORAGE_KEY, '1');
  } catch {
    // ignore
  }
}

export function clearRegistered() {
  try {
    localStorage.removeItem(REGISTER_STORAGE_KEY);
  } catch {
    // ignore
  }
}
