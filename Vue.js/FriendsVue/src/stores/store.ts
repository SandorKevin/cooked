import { api } from '../boot/axios';
import { defineStore } from 'pinia';
import { Notify, Loading } from 'quasar';

// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Interface for Application
export interface IApp {
  filter: string;
  filterURL: string;
  numerOfRec: number;
  page: number;
  limit: number;
}

// Interfaces for ManySide
export interface IMany {
  id: number
  url: string
  name: string
  seasonId: number
  number: number
  airstamp: string
  runtime: number
  image: {
    medium: string
    original: string
  }
  summary: string
  season: {
    id: number
    season: string
    years: string
  }
}
interface IManyDoc {
  documents: IMany[]; // use for store API responses
}

export interface IStore {
  app: IApp;
  many: IManyDoc;
}

export const useStore = defineStore('Store', {
  state: (): IStore => ({
    app: {
      filter: 'where',
      filterURL: 'where',
      numerOfRec: 0,
      page: 1,
      limit: 15,
    },
    many: {
      documents: [] as IMany[], // empty array for store API responses
    },
  }),
  getters: {
    numberOfPage(): number {
      return Math.ceil(this.app.numerOfRec / this.app.limit);
    }
  },
  actions: {
    async ManyGetAll(): Promise<void> {
      try {
        Loading.show();
        this.many.documents = [];
        const res = await api.get(`/api/friends/${this.app.page}/${this.app.limit}/${this.app.filterURL}`);
        if (res?.data) {
          this.many.documents = res.data;
          this.app.numerOfRec = res.headers['number-of-records'];
        }
      } catch (error) {
        ShowErrorWithNotify(error);
      } finally {
        Loading.hide();
      }
    },
  },
  // all "state" data is stored in browser session store:
  persist: {
    storage: sessionStorage,
  },
});

Notify.setDefaults({
  position: 'top',
  textColor: 'yellow',
  timeout: 3000,
  actions: [{ icon: 'close', color: 'white' }],
});

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = 'Hiba!';

  // The JavaScript optional chaining (?.) operator accesses an object's property or calls a function.
  // If the object accessed or function called is undefined or null,
  // it returns undefined instead of throwing an error.
  if (error?.response?.data?.status) {
    msg += ` (${error.response.data.status}):`;
  } else if (error?.response?.status) {
    msg += ` (${error.response.status}):`;
  } else {
    msg += ':';
  }

  if (error?.response?.data?.message) {
    msg += ` ${error.response.data.message}`;
  } else if (error?.response?.message) {
    msg += ` ${error.response.message}`;
  } else if (error?.request && error?.message) {
    msg += ` No response(${error.message})`; // if no response
  } else if (error?.message) {
    msg += ` Message(${error.message})`;
  } else {
    msg += ' Unknow error message';
  }
  Notify.create({ message: msg, color: 'negative' });
}
