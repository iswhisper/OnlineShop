
 var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:'',
	},
	filters:{
		fomatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){   //因为mounted钩子函数不能保证实例vm是否已经插入到文档，所以vm.cartView()要写在$nextTick方法里面
			vm.cartView();
        });
	},
	methods:{
		cartView:function(){
			var _this = this;		
			//也可写成一下格式, =>代表作用域已经指向了最外层，不用再重新this，可直接使用上一层的js了
			// this.$http.get("data/cartData.json",{"id":123}).then(res=>{
			// 	this.productList = res.data.result.list;
 		// 	}); 
			
			this.$http.get("data/cartData.json", {
				"id": 123
			}).then(function(res) {
				_this.productList = res.data.result.list;

			});

		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{	
				if(product.productQuantity>1){
					product.productQuantity--;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct:function(item){
			if(typeof item.checked=='undefined'){ //判断item里面是否有checked字段（判断商品是否选中）
				Vue.set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this=this;
			console.log(this);
			
			this.productList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){   //判断item里面是否有checked字段（判断商品是否选中）
					_this.$set(item,"checked",_this.checkAllFlag);
					console.log(this);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});
			_this.calcTotalPrice();
		},
		calcTotalPrice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
			if(item.checked){
				_this.totalMoney+=item.productPrice*item.productQuantity;
			}
			});
		},
		delProduct:function(){
			this.productList.splice(this.pindex,1);
			this.delFlag=false;
		}
	}
});
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })