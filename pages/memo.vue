<!--ストアを利用するメモのページ用コンポーネント-->
<template>
  <section class="container">
    <h1>Memo</h1>
    <table>
      <tr>
        <th>Title</th>
        <td><input type="text" name="title" class="title" size="40" v-model="title" @focus="set_flg"><button @click="find">find</button></td> 
        <!-- v-model: テキストボックスに入力された値を指定したdataプロパティの値にバインドする
        @:onイベントを表す-->
      </tr>
      <tr>
        <th>Memo</th>
        <td><textarea name="content" class="content" cols="50" rows="5" v-model="content"></textarea></td>
      </tr>
      <tr>
        <th></th> <!-- saveボタンの行のタイトル？みたいなところを表示するために作る -->
        <td><button @click="insert">save</button>
        <transition name="del"> <!--ふんわり表示する-->
          <button v-if="sel_flg != false" @click="remove">delete</button>
        </transition>
        </td>
      </tr>
    </table>
    <hr>
    <ul class="list">
      <li v-for="item in page_items" :key="item"> <!--キーをふらないと、page_itemsに同じものがあった時、並び替えとかの時に基準がわかんないから基準を設定(:はv-bind)-->
        <span @click="select(item)">{{ item.title }} ({{item.created}})</span>
      </li>
    </ul>
    <hr>
    <div class="nav">
      <span @click="prev">&lt;prev</span> |
      <span @click="next">next&gt;</span>
    </div>
  </section>
</template>

<script>
export default {
  data: function(){
    return {
      title: '', //入力された値が入る
      content: '', //入力された値が入る
      num_per_page: 7, //一度に表示されるメモの数
      find_flg: false, //検索実行中のフラグ tureなら検索中
      sel_flg: false, //選択状態を表すフラグ 選択状態じゃないならfalse 選択した場合はそのメモのオブジェクトが設定される
    };
  },
  computed: { //算術プロパティ用意
    memo: function(){
      return this.$store.state.memo.memo; //memoストアにあるmemoの値を取り出して返すプロパティ
    },
    page_items: function(){ //現在リストに表示されているメモの配列を表すプロパティ その時の状態によって取り出す値が変わる
      if(this.find_flg){ //検索時の表示
        var arr = [];
        var data = this.$store.state.memo.memo;
        data.forEach(element => {
          if(element.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0){
            arr.push(element);
          }
        });
        return arr;
      } else if(this.sel_flg != false){ //項目選択時の表示
        return [this.sel_flg];
      } else { //それ以外の時の表示
        return this.$store.state.memo.memo.slice(this.num_per_page * this.$store.state.memo.page, this.num_per_page * (this.$store.state.memo.page + 1));
      }
    },
    page: {
      get: function(){
        return this.$store.state.memo.page;
      },
      set: function(p){
        var pg = p > (this.$store.state.memo.memo.length - 1) / this.num_per_page ? Math.ceil((this.$store.state.memo.memo.length - 1) / this.num_per_page) -1 : p;
        pg = pg < 0 ? 0 : pg;
        this.$store.commit('memo/set_page', pg);
      }
    },
  },
  methods: { //名前をv-onの値に設定すると、その関数が実行される
    set_flg: function(){
      if(this.find_flg || this.sel_flg != false){
        this.find_flg = false;
        this.sel_flg = false;
        this.title = '';
        this.content = '';
      }
    },
    insert: function(){
      this.$store.commit('memo/insert',{title:this.title, content:this.content});
      this.title = '';
      this.content = '';
    },
    select: function(item){
      this.find_flg = false;
      this.sel_flg = item;
      this.title = item.title;
      this.content = item.content;
    },
    remove: function(){
      if(this.sel_flg == false){
        return;
      } else {
        this.$store.commit('memo/remove', this.sel_flg);
        this.set_flg();
      }
    },
    find: function(){
      this.sel_flg = false;
      this.find_flg = true;
    },
    next: function(){
      this.page++;
    },
    prev: function(){
      this.page--;
    },
  },
  created: function(){
    this.$store.commit('memo/set_page', 0);
  },
}
</script>

<style>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  font-size: 20pt;
}
div {
  font-size: 14pt;
}
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
}
input {
  font-size: 14pt;
  margin: 5px;
}
textarea {
  font-size: 14pt;
  margin: 5px;
}
button {
  font-size: 14pt;
  padding: 1px 10px;
  margin: 5px;
}
hr {
  border-style: none;
  border-top: solid;
  border-width: 5px;
  border-color: #def;
  margin: 20px 0px 10px 0px;
}
li {
  font-size: 14pt;
  height: 32px;
}
th {
  background-color:#345980;
  color: white;
}
td {
  background-color: aliceblue;
  color: #345980;
  padding: 5px;
}
.nav {
  padding: 0px 10px;
  cursor: pointer;
}
.list {
  cursor: pointer;
}
.del-enter-active, .del-leave-active {
  transition: opacity .5s;
}
.del-enter, .del-leave-to {
  opacity: 0;
}
</style>