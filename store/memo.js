//メモアプリ用のストアファイル
export const state = () => ({  
  memo: [], //メモを保管する配列
  page: 0, //現在表示しているページ番号を示すもの
})

export const mutations = {
  insert: function(state, obj){ //メモを追加する機能 objっていう引数は送信されたフォームの値をまとめたオブジェクト
    var d = new Date();
    var fmt = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
    state.memo.unshift({ //objかtitleとcontentの値を取り出し、さらにDateオブジェクトから現在の日時の値をテキストにまとめたものを用意し、それらをオブジェクトにしてmemoという値としてmemoステートに追加 unshift=配列の一番最初に値を追加
      title: obj.title,
      content: obj.content,
      created: fmt
    });
  },

  set_page: function(state, p){ //引数に渡された番号をpageステートに設定
    state.page = p;
  },
  remove: function(state, obj) { 
    //メモデータの中から引数に渡されたメモを削除
    //メモをまとめてあるmemo配列から順にオブジェクトを取り出し、引数のオブジェクトと同じものを探してそれを削除する
    var num = 0;
    for (let i = 0; i < state.memo.length; i++){
      const ob = state.memo[i];
      if(ob.title == obj.title && ob.content == obj.content && ob.created == obj.created){
        alert('remove it! --' + ob.title);
        //memo配列から見つけた値を削除
        //splice 第一引数で指定したインデックス番号のものから、第2引数の数だけ要素を取り除く(第2引数が1だったらインデックス番号iのものだけ取り除く)
        state.memo.splice(i, 1); 
        return;
      }
    }
  },
}