(function(){

   function foo(num1,num2){
      return num1 + num2
   }

   console.log(foo(10,20))
   
})();
(function(){

   var arr = [1,2,3,4]

   var result = arr.map((item, index) => {
      return item + 10
   })

   console.log(result)

})();