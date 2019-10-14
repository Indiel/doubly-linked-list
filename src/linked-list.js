const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);

        if (!this.length) {
            this._head = node;
            this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }

        this.length++;

        return this;
    }

    head() {
        // return this._head;
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    getNeedfulNode(index) {
        let start;
        let node;
        if (index > Math.abs(index - this.length)) {
            start = this.length - 1;
            node = this._tail;
            while (index !== start) {
                node = node.prev;
                start--;
            }
        } else {
            start = 0;
            node = this._head;
            while (index !== start) {
                node = node.next;
                start++;
            }
        }

        return node;
    }

    at(index) {
        if (this.length > 0 && index < this.length) {
            return this.getNeedfulNode(index).data;
        } else {
            return null;
        }
    }

    insertAt(index, data) {
        let newNode = new Node(data);

        if (this.length === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            let node = this.getNeedfulNode(index);

            newNode.prev = node.prev;
            newNode.next = node;
            node.prev.next = newNode;
            node.prev = newNode;
        }

        this.length++;

        return this;
    }

    isEmpty() {
        return !this.length ? true : false;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        if (this.length === 0) {
            return this;
        } if (this.length === 1) {
            this.clear();
        } else {
            let node = this.getNeedfulNode(index);

            node.prev.next = node.next;
            node.next.prev = node.prev;

            this.length--;
        }

        return this;
    }

    reverse() {
        let node = this._head;
        for (let i = 0, next; i < this.length; i++) {
            next = node.next;
            node.next = node.prev;
            node.prev = next;

            if(node.prev !== null) {
                node = node.prev;
            }
        }

        this._tail = this._head;
        this._head = node;

        return this;
    }

    indexOf(data) {
        let node = this._head;
        for (let i = 0; i < this.length; i++) {
            if (node.data !== data) {
                node = node.next;
            } else {
                return i;
            }
        }
        
        return -1;
    }
}

module.exports = LinkedList;
