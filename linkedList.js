import Node from "./node.js";
export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // adds a new node containing value to the end of the list
    append(key, value) {
        const newNode = new Node(key, value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            this.tail.nextNode = newNode;
        }
        this.tail = newNode;
    }

    // adds a new node containing value to the start of the list
    prepend(key, value) {
        const newNode = new Node(key, value);
        newNode.nextNode = this.head;
        this.head = newNode;
        if (this.tail === null) {
            this.tail = newNode;
        }
    }

    // returns the total number of nodes in the list
    size() {
        let count = 0;
        if (this.head === null) return "This list is empty! Disgraceful!";
        else {
            let currentNode = this.head;
            while (currentNode !== null) {
                count++;
                currentNode = currentNode.nextNode;
            }
        }
        return count;
    }

    // returns the first node in the list
    getHead() {
        return (this.head);
    }

    // returns the last node in the list
    getTail() {
        return (this.tail);
    }

    // returns the node at the given index
    at(index) {
        let currentIndex = 0;
        if (this.head === null) return "Since this list is empty, there's nothing to find!";
        if (index < 0) return "Give me a positive index instead please, negative integers make my head hurt!";
        if (index > this.size()) return "Your requested index value is too large!";
        else {
            let currentNode = this.head;
            while (currentIndex !== index) {
                currentIndex++;
                currentNode = currentNode.nextNode;
            }
            return currentNode;
        }
    }

    // removes the last element from the list
    pop() {
        if (this.head === null) return "I can't remove anything from an empty list!";
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return "Last node removed. List is now empty";
        } else {
            let removedNode = this.tail;
            let newTailIndex = this.size() - 2;
            let currentIndex = 0;
            let currentNode = this.head;
            while (currentIndex !== newTailIndex) {
                currentIndex++;
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = null;
            this.tail = currentNode;
            return `Last node ${removedNode.value} removed.`
        }
    }

    // returns true if the passed in value is in the list and otherwise returns false (or complains about the list being empty)
    contains(key) {
        if (this.head === null) return "Obviously this is going to be false. The list is empty!";
        else {
            let currentNode = this.head;
            while (currentNode !== null) {
                if (currentNode.key === key) {
                    return true;
                }
                currentNode = currentNode.nextNode;
            }
            return false;
        }
    }

    // access the key value pair of a key if it is found
    find(key) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.key === key) {
                return currentNode;  // Return the node itself
            }
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    // represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        if (this.head === null) return "Cannot make a string out of this list because it is empty!"
        let string = "";
        let currentNode = this.head;
        while (currentNode !== null) {
            string += ` ( ${currentNode.key} , ${currentNode.value} ) ->`;
            currentNode = currentNode.nextNode;
        }
        return string += ` null `;
    }

    // find index of given key
    getIndex(key) {
        let index = 0;
        let currentNode = this.head;
        while (currentNode !== null){
            if (currentNode.key === key) {
                return index;
            }
            index++;
            currentNode = currentNode.nextNode;
        }
        return "Key not found!";
    }

    // inserts a new node with the provided value at the given index.
    // if empty do nothing unless it's index of 0
    insertAt(key, value, index) {
        if (index < 0) return "Please use positive indices only. It's not an array after all!"
        if (this.head === null && index !== 0) return "I can only insert something into an empty list at index of 0!";
        if (this.head === null && index === 0) { 
            this.append(key, value);
            return this.toString(); 
        }
        if (index === 0) {
            this.prepend(key, value);
            return this.toString(); 
        }
        if (index > (this.size() - 1)) return "Your requested index value is too large!";
        let targetNode = this.at(index);
        let nodePreviousToTarget = this.at(index - 1);
        let newNode = new Node(key, value, targetNode);
        nodePreviousToTarget.nextNode = newNode;
        return this.toString();
    }

    // removes the node at the given index
    removeAt(index) {
        // deal with nonsense
        if (index < 0) return "Please give me a positive index only! Stop trying to be clever :P";
        if (index > (this.size() - 1)) return "Your requested index value is too large!";
        if (this.head === null) return "The list is empty, and I cannot remove something from nothing!";
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return "The list only had one item, which has now been removed, enjoy your empty list!";
        }
        if (index === 0) {
            this.head = this.head.nextNode;
            if (this.head === null) {
                this.tail = null;
            }
            return this.toString();
        }

        // now for the rest of the cases I want to grab the relevant nodes
        const targetNode = this.at(index);
        const previousNode = this.at(index - 1);

        // if the target node is the tail, the previous node is now the tail and must point to null
        // otherwise all that needs to happen is that the previous node's nextNode value is updated accordingly
        if (targetNode.nextNode === null) {
            previousNode.nextNode = null;
            this.tail = previousNode;
            return this.toString();
        } else {
            previousNode.nextNode = targetNode.nextNode;
            return this.toString();
        }
    }
    
    static listName = "I am a linked list abstraction";
}