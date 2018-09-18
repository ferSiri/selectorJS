var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if(matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  if(startEl.children){
    for(var i=0;i<startEl.children.length;i++){
      resultSet=resultSet.concat(traverseDomAndCollectElements(matchFunc,startEl.children[i]));
    }
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  var arreglo = Array.from(selector);
  if (arreglo[0]==="#") return "id"
  if (arreglo[0]===".") return "class"
  for(var i =1; i < arreglo.length; i++)
  {
    if (arreglo[i]===".") return "tag.class"
    if (arreglo[i]===">") return "child"

  }
  return "tag";

};
// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(nodo){
      return nodo.id===selector.substr(1);
    }
  } else if (selectorType === "class") {
    matchFunction = function(nodo){
      var arr=nodo.className.split(" ");
      for(var i=0;i<arr.length;i++){
          if (arr[i]===selector.substr(1)){
            return true;
          }
        }
        return false;
    }

  } else if (selectorType === "tag.class") {
    matchFunction = function(nodo){
      // console.log("slector:"+selector+" nodo:"+nodo)
      var arreglo=selector.split(".");
      var arr=nodo.className.split(" ");
      var flag1=false;
      var flag2=false;
      if (nodo.nodeName.toLowerCase()===arreglo[0]){ flag1=true; }
        for(var i=0;i<arr.length;i++){
          if (arreglo[1]===arr[i]){ flag2=true;}
        }
      if(flag1===true && flag2===true) return true;
      return false;
    }

  } else if (selectorType === "tag") {
    matchFunction = function(nodo){
      return nodo.nodeName.toLowerCase()===selector;
    }
  }else if(selectorType ==="child"){
    var arr = selector.split(' > ');
    matchFunction = function(node){
      var flag1=false, flag2=false
      if(arr[0]===node.parentNode.nodeName.toLowerCase()) flag1=true;
      if(arr[1]===node.nodeName.toLowerCase()) flag2=true;
      console.log(flag1, flag2)
      return (flag1===true && flag2===true);
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
