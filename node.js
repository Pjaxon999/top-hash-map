export default class Node {
    constructor(key = null, value = null, nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}