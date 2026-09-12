// Function for save data in local storage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}



// Function for get data from local storage
export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}



// Function to remove data from local storage
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}


