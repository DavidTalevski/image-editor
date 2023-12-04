import { StoredUserPreferences } from "./storedUserPreferences";
import { StorageType } from "./enum/storageType.enum";
// import { LocalStorage } from "node-localstorage";
import structuredClone from '@ungap/structured-clone';

export class UserPreferences {

    /** @private */
    TAG = "[User Preferences]"

    /** @type {StoredUserPreferences} */
    data;

    /** @private */
    key;

    /** @type {StorageType} */
    storageType;

    /**
     * @private
     * @type {Storage}
     */
    storage;

    /**
     * @param {string=} key 
     * @param {StorageType=} storage_type
     */
    constructor(key, storage_type) {
        this.key = key ?? "user-preferences";
        this.storageType = storage_type;

        this.setStorageType();
        this.setInitialData();
    }

    /**
     * @param {keyof(typeof this.data) key 
     */
    getPreference(key) {
        return this.data[key];
    }

    /**
     * @param {string} key 
     * @param {any} data 
     */
    setPreference(key, data) {
        this.data[key] = data;
        this.storage.setItem(this.key, JSON.stringify(this.data));
    }

    getAllPreferences() {
        return this.data;
    }

    /**
     * @param {StoredUserPreferences} preferences 
     */
    setAllPreference(preferences) {
        this.data = preferences;
        this.storage.setItem(this.key, JSON.stringify(this.data));
    }

    /** @private */
    setStorageType() {
        switch (this.storageType) {
            case StorageType.LOCAL_STORAGE:
                this.storage = localStorage;
                break;
            // case StorageType.NODE_LOCAL_STORAGE:
            //     this.storage = new LocalStorage(this.key);
            default:
                this.storage = sessionStorage;
                break;
        }
    }

    /** @private */
    setInitialData() {
        const existing_data = JSON.parse(this.storage.getItem(this.key));
        const staticd = structuredClone(StoredUserPreferences);

        if (existing_data) {
            this.synchronizeData(staticd, existing_data);
        }

        this.data = staticd;
    }

    /** @private */
    synchronizeData(staticd, saved) {
        Object.keys(staticd).forEach(key => {
            if (typeof staticd[key] === 'object' && staticd[key] !== null) {
                if (!saved[key]) {
                    console.log(this.TAG, `Adding new object: "${key}"`)
                    saved[key] = staticd[key];
                } else this.synchronizeData(staticd[key], saved[key])
            } else if (!saved.hasOwnProperty(key)) {
                console.log(this.TAG, `Adding new property: "${key}"`)
                saved[key] = staticd[key];
            }
        })
    }
}