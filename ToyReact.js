export let ToyReact = {
    createElement(type,attributes,...children){
        console.log(arguments)
        let element = document.createElement(type)
        // debugger;
        for (let name in attributes) {
            element.setAttribute(name, attributes[name])
        }
        for(let child of children) {
            element.appendChild(child)
        }
        return element;
    }
}