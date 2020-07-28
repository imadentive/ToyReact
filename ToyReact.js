class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {

        // 处理onClick 小技巧 [\s\S]表示所有字符
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1)
            let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
            
            this.root.addEventListener(eventName, value)
        }

        if (name === 'className')
            name = 'class'
        this.root.setAttribute(name, value)
    }

    appendChild(vchild) {
        vchild.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}


class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }


    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Component {
    // 解决MyComponent下有子元素会报错
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this[name] = value
        this.props[name] = value
        // if (name.match(/^on([\s\S]+)$/)) {

        //     console.log(RegExp.$1)

        // }


    }
    mountTo(parent) {
        let vdom = this.render()
        vdom.mountTo(parent)
    }
    appendChild(vchild) {
        this.children.push(vchild)
    }
    setState(state) {
        let merge = (oldState, newState) => {

            for(let p in newState) {
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] !== 'object') {
                        oldState[p] = {}
                    }
                    merge(oldState[p], newState[p])
                } else {
                    oldState[p] = newState[p]
                }

            }

            
        }

        if (!this.state && state) {
            this.state = {}
        }
        merge(this.state, state)
        // console.log(this.state)
        // this.update() // 难点，重新渲染实图
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        // console.log(arguments)
        let element;
        if (typeof type === 'string') {
            element = new ElementWrapper(type)
        } else {
            element = new type // Blean 那些？？？
        }
        // debugger;
        for (let name in attributes) {
            element.setAttribute(name, attributes[name])
        }

        //改进，用递归遍历子元素
        let insertChildren = (children) => {
            for (let child of children) {


                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(child)
                } else {
                    // 处理 {true} 这种情况
                    if (!(child instanceof Component)
                        && !(child instanceof TextWrapper)
                        && !(child instanceof ElementWrapper)) {
                        child = String(child)
                    }

                    if (typeof child === 'string') {
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child)
                }

            }

        }
        insertChildren(children)
        return element;

    },

    render(vdom, element) {
        vdom.mountTo(element)
    }
}



/*

export let ToyReact = {
    createElement(type,attributes,...children){
        // console.log(arguments)
        let element = document.createElement(type)
        // debugger;
        for (let name in attributes) {
            element.setAttribute(name, attributes[name])
        }
        for(let child of children) {
            if(typeof child === 'string'){
                child = document.createTextNode(child)
            }
            element.appendChild(child)
        }
        return element;
    },

    render(vdom, element){
        element.mountTo(element)
    }
}
 */