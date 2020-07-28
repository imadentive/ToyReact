import {ToyReact} from './ToyReact.js'
class MyComponent {

}
// let a = <MyComponent name="a" />

// MyComponent 和 div 小写是有区别的
let a = <div name="a" id="ida">
    <span></span>
    <span></span>
    <span></span>
</div>

console.log(a)
document.body.appendChild(a)
// var a = createElement(MyComponent, {
//     name: "a"
//   });