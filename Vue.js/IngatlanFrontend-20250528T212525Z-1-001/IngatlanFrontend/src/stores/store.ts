import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import { api } from "src/boot/axios";
import router from "../router";

// === INTERFACES ===
// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

export interface IApp {
  showEditDialog: boolean;
  showNewDialog: boolean;
  filter: string;
  selected: Array<any>;
}

interface IOne {
  id?: number;
  megnevezes?: string;
}

export interface IMany {
  id?: number; // PK
  kategoriaId?: number; // FK
  kategoriaNev?: string;
  leiras?: string;
  hirdetesDatuma?: string;
  tehermentes?: boolean;
  kepUrl?: string;
}

export interface IOther {
  id?: number; // PK
}

interface IState {
  one: {
    // For handle CRUD operations:
    document: IOne; // use for create, update, delete and store one document
    documentOld: IOne; // use for only edit (diff and restore)
    documents: IOne[]; // use for only store many documents
  };
  many: {
    document: IMany;
    documentOld: IMany;
    documents: IMany[];
  };
  other: {
    document: IOther;
    documentOld: IOther;
    documents: IOther[];
  };
  app: IApp;
}

export const useStore = defineStore({
  id: "store",
  state: (): IState => ({
    one: {
      document: {},
      documentOld: {},
      documents: [],
    },
    many: {
      document: {},
      documentOld: {},
      documents: [],
    },
    other: {
      document: {},
      documentOld: {},
      documents: [],
    },
    app: {
      showEditDialog: false,
      showNewDialog: false,
      filter: "",
      selected: [],
    },
  }),
  getters: {},
  actions: {
    async one_GetAll(): Promise<void> {
      Loading.show();
      this.one.documents = [];
      api
        .get("api/kategoriak")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.one.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async many_GetAll(): Promise<void> {
      Loading.show();
      this.many.documents = [];
      api
        .get("api/ingatlan")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.many.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async many_Create(): Promise<void> {
      if (this.many?.document) {
        Loading.show();
        api
          .post("api/ujingatlan", this.many.document)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              this.many_GetAll(); // refresh data with read all data again from backend
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              router.push("/offers"); // redirect to offers page
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
    enabled: true,
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     { storage: sessionStorage, paths: ["one", "many"] },
  //     { storage: localStorage, paths: ["app"] },
  //   ],
  // },
});

Notify.setDefaults({
  position: "top",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = "Hiba!";

  // The optional chaining (?.) operator accesses an object's property or calls a function.
  // If the object accessed or function called is undefined or null,
  // it returns undefined instead of throwing an error.
  if (error?.response?.data?.status) {
    msg += ` (${error.response.data.status}):`;
  } else if (error?.response?.status) {
    msg += ` (${error.response.status}):`;
  } else {
    msg += ":";
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
    msg += " Unknow error message";
  }
  Notify.create({ message: msg, color: "negative" });
}
