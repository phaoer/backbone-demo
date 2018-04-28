var MyModel = Backbone.Model.extend({});      //实例化 model

var MyCollection = Backbone.Collection.extend({       //model集
    model:MyModel,
})

var c = new MyCollection();

var UlRow = Backbone.View.extend({   
    el: 'ul',
    render: function (html) {     //渲染方法
      this.el.innerHTML = html;
      return this;
    }
});

var MyView = Backbone.View.extend({       
	el:$("#div1"),
	collection:c,
	initialize:function(){
        console.log('this is a todoList by backbone')
        this.listenTo(this.collection,'add remove', this.render);   //监听collection的 add 和 remove
	},
	render:function(){
        var html = '';
       	_.forEach(this.collection.models,function(model){
       		html += '<li>' + model.get('key') + '<button class="del '+model.get('key')+'">del</button></li>';
        });
        var ul = new UlRow();
        ul.render(html)
	},
	events:{
       'click #todo': 'todo',   //this.$el.find().click()
       'click .del' : 'del'
	},
	todo:function(){
        c.add(new MyModel({'key':$("input[name=list]").val()}));
	},
	del:function(e){
		var obj = e.currentTarget;
        c.remove(this.collection.models[$(obj).parent().index()]);
	}
})

var v = new MyView();