import { api } from '../boot/axios';
import { defineStore } from 'pinia';
import { Notify, Loading } from 'quasar';

// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Interface for Application
export interface IApp {}

// Interfaces for OneSide
export interface IOne {
  id: number;
  megnevezes: string;
}
interface IOneDoc {
  // For handle CRUD operations:
  document: IOne; // use for create, update, delete and store one document
  documentOld: IOne; // use for only edit (diff and restore)
  documents: IOne[]; // use for store API responses
}

// Interfaces for ManySide
export interface IMany {
  id: number;
  kategoriaId: number;
  leiras: string;
  hirdetesDatuma: string;
  tehermentes: boolean;
  kepUrl: string;
  kategoriaNev: string;
}
interface IManyDoc {
  document: IMany; // use for create, update, delete and store one document
  documentOld: IMany; // use for only edit (diff and restore)
  documents: IMany[]; // use for store API responses
}

export interface IStore {
  app: IApp;
  one: IOneDoc;
  many: IManyDoc;
}

export const useStore = defineStore('Store', {
  state: (): IStore => ({
    app: {},
    one: {
      document: {} as IOne,
      documentOld: {} as IOne,
      documents: [] as IOne[], // empty array for store API responses
    },
    many: {
      document: {} as IMany,
      documentOld: {} as IMany,
      documents: [] as IMany[], // empty array for store API responses
    },
  }),
  // getters: {},
  actions: {
    async OneGetAll(): Promise<void> {
      Loading.show();
      this.one.documents = [];
      api
        .get('/api/kategoriak')
        .then((res) => {
          Loading.hide();
          if (res.data) {
            this.one.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async ManyGetAll(): Promise<void> {
      Loading.show();
      this.many.documents = [];
      api
        .get('/api/ingatlan')
        .then((res) => {
          Loading.hide();
          if (res.data) {
            this.many.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async ManyCreate(): Promise<void> {
      if (this.many.document) {
        Loading.show();
        api
          .post('/api/ujingatlan', this.many.document)
          .then((res) => {
            Loading.hide();
            const data: IMany = res.data;
            if (data) {
              Notify.create({
                message: `New document with id=${data.id} has been saved successfully!`,
                color: 'positive',
              });
              // Example page routing from store (no import required)
              // this.router.push('/page_path');
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
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
