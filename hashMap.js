import LinkedList from "./linkedList.js";
export default class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    // resizes buckets array when there is insufficient capacity then repopulates with old data
    resize() {
        const oldBuckets = this.buckets;
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        // now we rehash. I know this is ugly but it's the best I could come up with!
        for (const bucket of oldBuckets) {
            if (bucket !== null) {
                let currentNode = bucket.head;
                while(currentNode !== null) {
                    this.set(currentNode.key, currentNode.value, true); 
                    currentNode = currentNode.nextNode;
                }
            }
        }
    }

    // takes a key and produces a hash code
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    } 

    // takes the key and the value assigned to the key. If a key already exists, the old value is overwritten. Update size at the end
    set(key, value, skipSizeIncrement = false) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[index] === null) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].append(key, value);
        } else {
            // if a head(key value pair) exists in a bucket, we follow that Linked List to add to the end of the bucket.
            const indexToCheck = this.buckets[index];
            let currentNode = indexToCheck.head;
            while (currentNode !== null) {
                if (currentNode.key === key) {
                    currentNode.value = value;
                    return;
                }
                currentNode = currentNode.nextNode;
            }
            this.buckets[index].append(key, value);
        }
        // now that we have added something to a bucket, increment the size (unless we are rehashing), then check to see if the load factor has been exceeded
        if (skipSizeIncrement === false) this.size++;
        if ((this.size / this.capacity) > this.loadFactor) {
            this.resize();
        }
    }
}