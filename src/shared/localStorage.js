const getStorage = name => {
  const storage = localStorage.getItem(name);

  if (storage) {
    return storage;
  } else {
    return null;
  }
};

const setStorage = (name, value) => {
  if (!value) {
    return false;
  }
  localStorage.setItem(name, value);
};

const clearStorage = name => {
  localStorage.removeItem(name);
};

export { getStorage, setStorage, clearStorage };
