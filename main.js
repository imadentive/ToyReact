import {ToyReact} from './ToyReact.js'
// class MyComponent {

// }
// let a = <MyComponent name="a" />

// MyComponent 和 div 小写是有区别的
let a = <div name="a" id="ida">
    <span>hello</span>
    <span>world</span>
    <span>！</span>
</div>

console.log(a)

/*
var a = _ToyReact.ToyReact.createElement("div", {
    name: "a",
    id: "ida"
  }, 
  _ToyReact.ToyReact.createElement("span", null, "hello"), 
  _ToyReact.ToyReact.createElement("span", null, "world"), 
  _ToyReact.ToyReact.createElement("span", null, "\uFF01"))

  */
document.body.appendChild(a)
// var a = createElement(MyComponent, {
//     name: "a"
//   });