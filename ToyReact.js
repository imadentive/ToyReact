class ElementWrapper {
    constructor(type) {

        // this.root = document.createElement(type)
        this.type = type
        this.props = Object.create(null)
        this.children = []
    }

    setAttribute(name, value) {

        /*
        // 处理onClick 小技巧 [\s\S]表示所有字符
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1)
            let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
            
            this.root.addEventListener(eventName, value)
        }

        if (name === 'className')
            this.root.setAttribute("class", value) 

        this.root.setAttribute(name, value)

        */

        this.props[name] = value
    }

    // appendChild(vchild) {
    //     vchild.mountTo(this.root)
    // }

    // 改造
    appendChild(vchild) {

        /*
        let range = document.createRange();
        if(this.root.children.length){
            range.setStartAfter(this.root.lastChild)
            range.setEndAfter(this.root.lastChild)
        } else {
            range.setStart(this.root,0)
            range.setEnd(this.root,0)
        }
 
        vchild.mountTo(range)
        */
        this.children.push(vchild)

    }

    // mountTo(parent) {
    //     parent.appendChild(this.root)
    // }

    // 改造
    mountTo(range) {
        this.range = range
        range.deleteContents()
        let element = document.createElement(this.type)

        // 上面setAttribute方法都工作
        for (let name in this.props) {
            let value = this.props[name]

            if (name.match(/^on([\s\S]+)$/)) {
                console.log(RegExp.$1)
                let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())

                element.addEventListener(eventName, value)
            }

            if (name === 'className')
                element.setAttribute("class", value)


            element.setAttribute(name, value)
        }

        // console.log(this.children)

        // 上面appendChild的工作, 数组 for of 对象 for in
        for (let child of this.children) {
            let range = document.createRange();
            if (element.children.length) {
                range.setStartAfter(element.lastChild)
                range.setEndAfter(element.lastChild)
            } else {
                range.setStart(element, 0)
                range.setEnd(element, 0)
            }

            // console.log(child,'child')
            child.mountTo(range)
        }

        range.insertNode(element)
    }

}


class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
        // ++
        this.type = "#text" // 避免重名
        this.children = []
        this.props = Object.create(null)
    }


    // mountTo(parent) {
    //     parent.appendChild(this.root)
    // }

    // 所有的实dom操作都在这里执行
    mountTo(range) {
        this.range = range;
        range.deleteContents();
        range.insertNode(this.root)
    }
}

export class Component {
    // 解决MyComponent下有子元素会报错
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    
    // ++
    get type() {
        return this.constructor.name
    }
    setAttribute(name, value) {
        this[name] = value
        this.props[name] = value
        // if (name.match(/^on([\s\S]+)$/)) {

        //     console.log(RegExp.$1)

        // }


    }
    // mountTo(parent) {
    //     let vdom = this.render()
    //     vdom.mountTo(parent)
    // }
    // 改造
    mountTo(range) {

        this.range = range; // 存起来
        this.update()

    }
    // // 更新
    // update() {
    //     this.range.deleteContents()
    //     let vdom = this.render()
    //     vdom.mountTo(this.range)
    // }

    // 更新 修复bug
    update() {
        // 创建一个注释占位符
        /*
        let placeholder = document.createComment('placeholder')
        let range = document.createRange()
        range.setStart(this.range.endContainer, this.range.endOffset)
        range.setEnd(this.range.endContainer, this.range.endOffset)
        range.insertNode(placeholder)
        this.range.deleteContents()

        */

        // 第一步改造成vdom之后，上面不需要了，删掉？？？why 秀啊

        let vdom = this.render()
        if(this.vdom) { // 有了vdom，做更新操作

            // 定义两个对比函数
            let isSameNode = (node1, node2) => {
                if(node1.type !== node2.type){
                    return false
                }
                for (const name in node1.props) {
                    // 忽略onclick 和 数组属性的比较 ？？？  如果做到和react一样局部更新某个dom节点 ？？？？
                    if(typeof node1.props[name] === "function" && typeof node2.props[name] === "function"
                     && node1.props[name].toString() === node2.props[name].toString())
                        continue;

                    if(typeof node1.props[name] === "object" && typeof node2.props[name] === "object"
                    && JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name]))
                        continue;

                    if(node1.props[name] !== node2.props[name])
                        return false
                    
                }
                //
                if(Object.keys(node1.props).length !== Object.keys(node2.props).length)
                        return false

                return true;
            }

            let isSameTree = (node1, node2) => {
                if(!isSameNode(node1,node2)){
                    return false;
                }
                if(node1.children.length !== node2.children.length)
                    return false;
                
                for (let i = 0; i < node1.children.length; i++) {
                    if(!isSameTree(node1.children[i],node2.children[i]))
                        return false;
                }

                return true;
            }



            
            let replace = (newTree, oldTree, indent) => {
                console.log(indent + "new:", newTree)
                console.log(indent + "old:", oldTree)
                if(isSameTree(newTree, oldTree)){ // 没影响生成的树
                    console.log('all same')
                    return;
                }

                if(!isSameNode(newTree, oldTree)){
                    console.log('all different')
                    newTree.mountTo(oldTree.range)
                } else {
                    for(let i = 0; i < newTree.children.length; i++) {
                        replace(newTree.children[i],oldTree.children[i], "  " + indent)
                    }
                }
            }


        

            
            replace(vdom, this.vdom,"")

            

        } else {
            vdom.mountTo(this.range)
            
        }

        this.vdom = vdom
        
    }

    appendChild(vchild) {
        this.children.push(vchild)
    }
    setState(state) {
        let merge = (oldState, newState) => {

            for (let p in newState) {
                if (typeof newState[p] === 'object' && newState[p] !== null) {
                    if (typeof oldState[p] !== 'object') {
                        // oldState[p] = {}
                        if (newState[p] instanceof Array) {
                            oldState[p] = []
                        } else {
                            oldState[p] = {}
                        }
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
        this.update() // 难点，重新渲染实图
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
                    // 处理 null
                    if (child === null || child === void 0) {
                        child = ""
                    }
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
        let range = document.createRange();
        if (element.children.length) {
            range.setStartAfter(element.lastChild)
            range.setEndAfter(element.lastChild)
        } else {
            range.setStart(element, 0)
            range.setEnd(element, 0)
        }
        vdom.mountTo(range)
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