

export function getLocalStorage(id: string) :string {

    const localStorageItem = localStorage.getItem(id);

    if (localStorageItem != null) {
        return localStorageItem;
    }

    return "";
}

export function setLocalStorage(id: string, value: any) {
    localStorage.setItem(id, JSON.stringify(value));
}

export function deleteLocalStorage(id: string) {
    localStorage.removeItem(id);
}