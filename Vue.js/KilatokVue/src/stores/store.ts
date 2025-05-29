import { api } from '../boot/axios';
import { defineStore } from 'pinia';
import { Notify, Loading } from 'quasar';

// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Interface for Application
export interface IApp {
  locationName: string;
}

// Interfaces for OneSide
export interface IOne {
  id: number;
  locationName: string;
}
interface IOneDoc {
  // For handle CRUD operations:
  document: IOne; // use for create, update, delete and store one document
  documentOld: IOne; // use for only edit (diff and restore)
  documents: IOne[]; // use for store API responses
}

// Interfaces for ManySide
export interface IMany {
  id: number; // PK
  viewpointName: string;
  mountain: string;
  locationId: number; // FK hegység id
  height: number;
  description: string;
  built: string;
  imageUrl: string;
}
interface IManyDoc {
  document: IMany; // use for create, update, delete and store one document
  documentOld: IMany; // use for only edit (diff and restore)
  documents: IMany[]; // use for store API responses
}

// Interfaces for OtherSide
export interface IOther {
  id: number; // PK
  viewpointId: number; //FK
  rating: number;
  email: string;
  comment: string;
}
interface IOtherDoc {
  document: IOther; // use for create, update, delete and store one document
  documentOld: IOther; // use for only edit (diff and restore)
  documents: IOther[]; // use for store API responses
}

export interface IStore {
  app: IApp;
  one: IOneDoc;
  many: IManyDoc;
  other: IOtherDoc;
}

export const useStore = defineStore('Store', {
  state: (): IStore => ({
    app: {
      locationName: 'Bükk',
    },
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
    other: {
      document: {} as IOther,
      documentOld: {} as IOther,
      documents: [] as IOther[], // empty array for store API responses
    },
  }),
  // getters: {},
  actions: {
    async LocationsGetAll(): Promise<void> {
      Loading.show();
      this.one.documents = [];
      api
        .get('/api/locations')
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

    async ViewpointsGetAll(): Promise<void> {
      Loading.show();
      this.many.documents = [];
      api
        .get('/api/viewpoints')
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

    async ViewpointsGetByLocation(): Promise<void> {
      if (this.app.locationName.length > 0) {
        Loading.show();
        this.many.documents = [];
        api
          .get(`/api/${this.app.locationName}/viewpoints`)
          .then((res) => {
            Loading.hide();
            if (res.data) {
              this.many.documents = res.data;
              // store startig data to PATCH method:
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },

    async Create(): Promise<void> {
      if (this.other.document) {
        Loading.show();
        api
          .post('/api/rate', this.other.document)
          .then((res) => {
            Loading.hide();
            const data: any = res.data;
            if (data) {
              Notify.create({
                message: `A kilátó eddigi értékelése ${data.average}, ${data.count} látogató véleménye alapján`,
                color: 'positive',
                // START: VIDEÓBOL KIMARADT!!! "majd navigáljon át a kilátók leírását tartalmazó oldalra":
                onDismiss: () => {
                  this.router.push('/');
                }
                // END: VIDEÓBOL KIMARADT!!!
              });
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
