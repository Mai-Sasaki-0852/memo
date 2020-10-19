import Vuex from 'vuex'  //vuexインポート
import createPersistedState from "vuex-persistedstate"; //vuex-persisitedstateインポート

export const plugins = [  //createPersisitedStateをプラグインに追加
  createPersistedState(),
]