import { Injectable } from "@angular/core";

@Injectable()
export class BrowserStorage {
    saveItem(key: string, value: string) {
        localStorage.setItem(key, value)
    }

    getItem(key: string): String | null {
        return localStorage.getItem(key)
    }

    clearStorage() {
        localStorage.clear()
    }
}

