document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const visualizationContainer = document.getElementById('visualization-container');
    const codeDisplay = document.getElementById('code-display');
    const explanationText = document.getElementById('explanation-text');
    const valueInput = document.getElementById('value-input');
    const insertBtn = document.getElementById('insert-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const searchBtn = document.getElementById('search-btn');
    const generateRandomBtn = document.getElementById('generate-random');
    const clearAllBtn = document.getElementById('clear-all');
    const startAlgoBtn = document.getElementById('start-algo');
    const speedSlider = document.getElementById('speed-slider');
    
    // State variables
    let currentDataStructure = 'array';
    let currentAlgorithm = null;
    let data = [];
    let animationSpeed = 1000 / speedSlider.value;
    let isAnimating = false;
    
    // Data structure implementations
    const dataStructures = {
        array: {
            name: 'Array',
            explanation: 'An array is a collection of items stored at contiguous memory locations. Items can be accessed randomly using indices.',
            code: `// Basic array operations in JavaScript
const arr = [1, 2, 3, 4, 5];

// Access
console.log(arr[0]); // 1

// Insert at end
arr.push(6); // [1, 2, 3, 4, 5, 6]

// Remove from end
arr.pop(); // [1, 2, 3, 4, 5]

// Insert at beginning
arr.unshift(0); // [0, 1, 2, 3, 4, 5]

// Remove from beginning
arr.shift(); // [1, 2, 3, 4, 5]

// Insert at index
arr.splice(2, 0, 2.5); // [1, 2, 2.5, 3, 4, 5]

// Remove at index
arr.splice(2, 1); // [1, 2, 3, 4, 5]`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                const arrayContainer = document.createElement('div');
                arrayContainer.className = 'array-container';
                arrayContainer.style.display = 'flex';
                
                data.forEach((value, index) => {
                    const element = document.createElement('div');
                    element.className = 'array-element';
                    element.textContent = value;
                    element.dataset.index = index;
                    arrayContainer.appendChild(element);
                });
                
                visualizationContainer.appendChild(arrayContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function(value) {
                if (isAnimating) return;
                const index = data.indexOf(parseInt(value));
                if (index !== -1) {
                    data.splice(index, 1);
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const elements = document.querySelectorAll('.array-element');
                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('comparing');
                    await sleep(animationSpeed);
                    
                    if (parseInt(elements[i].textContent) === target) {
                        elements[i].classList.remove('comparing');
                        elements[i].classList.add('highlight');
                        isAnimating = false;
                        return;
                    }
                    
                    elements[i].classList.remove('comparing');
                }
                
                isAnimating = false;
            }
        },
        'linked-list': {
            name: 'Linked List',
            explanation: 'A linked list is a linear data structure where elements are linked using pointers. Each element points to the next element in the sequence.',
            code: `// Linked list implementation in JavaScript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Add to end
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // Add to beginning
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // Remove by value
    remove(value) {
        if (!this.head) return;
        
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }
}`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                const listContainer = document.createElement('div');
                listContainer.className = 'linked-list-container';
                
                if (data.length === 0) {
                    const emptyText = document.createElement('p');
                    emptyText.textContent = 'Linked list is empty';
                    listContainer.appendChild(emptyText);
                } else {
                    data.forEach((value, index) => {
                        const nodeContainer = document.createElement('div');
                        nodeContainer.className = 'linked-list-node';
                        
                        const node = document.createElement('div');
                        node.className = 'node';
                        node.textContent = value;
                        node.dataset.value = value;
                        
                        nodeContainer.appendChild(node);
                        
                        if (index < data.length - 1) {
                            const arrow = document.createElement('div');
                            arrow.className = 'arrow';
                            nodeContainer.appendChild(arrow);
                        }
                        
                        listContainer.appendChild(nodeContainer);
                    });
                }
                
                visualizationContainer.appendChild(listContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function(value) {
                if (isAnimating) return;
                const index = data.indexOf(parseInt(value));
                if (index !== -1) {
                    data.splice(index, 1);
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const nodes = document.querySelectorAll('.node');
                
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add('highlight');
                    await sleep(animationSpeed);
                    
                    if (parseInt(nodes[i].textContent) === target) {
                        isAnimating = false;
                        return;
                    }
                    
                    nodes[i].classList.remove('highlight');
                    await sleep(animationSpeed / 2);
                }
                
                isAnimating = false;
            }
        },
        stack: {
            name: 'Stack',
            explanation: 'A stack is a LIFO (Last In First Out) data structure. Elements are added and removed from the top of the stack.',
            code: `// Stack implementation in JavaScript
class Stack {
    constructor() {
        this.items = [];
    }
    
    // Add to top
    push(element) {
        this.items.push(element);
    }
    
    // Remove from top
    pop() {
        if (this.items.length === 0) return null;
        return this.items.pop();
    }
    
    // View top element
    peek() {
        if (this.items.length === 0) return null;
        return this.items[this.items.length - 1];
    }
    
    // Check if empty
    isEmpty() {
        return this.items.length === 0;
    }
}`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                const stackContainer = document.createElement('div');
                stackContainer.className = 'stack-container';
                stackContainer.style.display = 'flex';
                stackContainer.style.flexDirection = 'column-reverse';
                stackContainer.style.alignItems = 'center';
                stackContainer.style.gap = '5px';
                
                if (data.length === 0) {
                    const emptyText = document.createElement('p');
                    emptyText.textContent = 'Stack is empty';
                    stackContainer.appendChild(emptyText);
                } else {
                    data.slice().reverse().forEach((value, index) => {
                        const element = document.createElement('div');
                        element.className = 'array-element';
                        element.textContent = value;
                        element.style.width = '120px';
                        element.style.margin = '0 auto';
                        element.style.position = 'relative';
                        
                        if (index === 0) {
                            element.style.backgroundColor = '#f39c12';
                        }
                        
                        stackContainer.appendChild(element);
                    });
                }
                
                visualizationContainer.appendChild(stackContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function() {
                if (isAnimating) return;
                if (data.length > 0) {
                    data.pop();
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const elements = document.querySelectorAll('.stack-container .array-element');
                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('comparing');
                    await sleep(animationSpeed);
                    
                    if (parseInt(elements[i].textContent) === target) {
                        elements[i].classList.remove('comparing');
                        elements[i].classList.add('highlight');
                        isAnimating = false;
                        return;
                    }
                    
                    elements[i].classList.remove('comparing');
                }
                
                isAnimating = false;
            }
        },
        queue: {
            name: 'Queue',
            explanation: 'A queue is a FIFO (First In First Out) data structure. Elements are added to the rear and removed from the front.',
            code: `// Queue implementation in JavaScript
class Queue {
    constructor() {
        this.items = [];
    }
    
    // Add to rear
    enqueue(element) {
        this.items.push(element);
    }
    
    // Remove from front
    dequeue() {
        if (this.items.length === 0) return null;
        return this.items.shift();
    }
    
    // View front element
    peek() {
        if (this.items.length === 0) return null;
        return this.items[0];
    }
    
    // Check if empty
    isEmpty() {
        return this.items.length === 0;
    }
}`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                const queueContainer = document.createElement('div');
                queueContainer.className = 'queue-container';
                queueContainer.style.display = 'flex';
                queueContainer.style.gap = '5px';
                
                if (data.length === 0) {
                    const emptyText = document.createElement('p');
                    emptyText.textContent = 'Queue is empty';
                    queueContainer.appendChild(emptyText);
                } else {
                    data.forEach((value, index) => {
                        const element = document.createElement('div');
                        element.className = 'array-element';
                        element.textContent = value;
                        element.style.width = '100px';
                        
                        if (index === 0) {
                            element.style.backgroundColor = '#f39c12';
                        }
                        
                        if (index === data.length - 1) {
                            element.style.backgroundColor = '#2ecc71';
                        }
                        
                        queueContainer.appendChild(element);
                    });
                }
                
                visualizationContainer.appendChild(queueContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function() {
                if (isAnimating) return;
                if (data.length > 0) {
                    data.shift();
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const elements = document.querySelectorAll('.queue-container .array-element');
                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('comparing');
                    await sleep(animationSpeed);
                    
                    if (parseInt(elements[i].textContent) === target) {
                        elements[i].classList.remove('comparing');
                        elements[i].classList.add('highlight');
                        isAnimating = false;
                        return;
                    }
                    
                    elements[i].classList.remove('comparing');
                }
                
                isAnimating = false;
            }
        },
        tree: {
            name: 'Binary Tree',
            explanation: 'A binary tree is a hierarchical data structure where each node has at most two children referred to as left child and right child.',
            code: `// Binary tree implementation in JavaScript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Insert a value
    insert(value) {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    
    // Search for a value
    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                
                if (data.length === 0) {
                    const emptyText = document.createElement('p');
                    emptyText.textContent = 'Tree is empty';
                    visualizationContainer.appendChild(emptyText);
                    return;
                }
                
                // Create a simple binary search tree for visualization
                const tree = { root: null };
                const insert = (node, value) => {
                    if (!node) {
                        return { value, left: null, right: null };
                    }
                    if (value < node.value) {
                        node.left = insert(node.left, value);
                    } else {
                        node.right = insert(node.right, value);
                    }
                    return node;
                };
                
                data.forEach(value => {
                    tree.root = insert(tree.root, value);
                });
                
                const renderTree = (node, parentElement) => {
                    if (!node) return;
                    
                    const nodeContainer = document.createElement('div');
                    nodeContainer.className = 'tree-node';
                    
                    const valueElement = document.createElement('div');
                    valueElement.className = 'tree-value';
                    valueElement.textContent = node.value;
                    nodeContainer.appendChild(valueElement);
                    
                    if (node.left || node.right) {
                        const childrenContainer = document.createElement('div');
                        childrenContainer.className = 'tree-children';
                        
                        if (node.left) {
                            const leftContainer = document.createElement('div');
                            leftContainer.className = 'tree-child';
                            renderTree(node.left, leftContainer);
                            childrenContainer.appendChild(leftContainer);
                        }
                        
                        if (node.right) {
                            const rightContainer = document.createElement('div');
                            rightContainer.className = 'tree-child';
                            renderTree(node.right, rightContainer);
                            childrenContainer.appendChild(rightContainer);
                        }
                        
                        const connector = document.createElement('div');
                        connector.className = 'tree-connector';
                        nodeContainer.appendChild(connector);
                        nodeContainer.appendChild(childrenContainer);
                    }
                    
                    parentElement.appendChild(nodeContainer);
                };
                
                const treeContainer = document.createElement('div');
                treeContainer.style.textAlign = 'center';
                renderTree(tree.root, treeContainer);
                visualizationContainer.appendChild(treeContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function(value) {
                if (isAnimating) return;
                const index = data.indexOf(parseInt(value));
                if (index !== -1) {
                    data.splice(index, 1);
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const nodes = document.querySelectorAll('.tree-value');
                
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add('highlight');
                    await sleep(animationSpeed);
                    
                    if (parseInt(nodes[i].textContent) === target) {
                        isAnimating = false;
                        return;
                    }
                    
                    nodes[i].classList.remove('highlight');
                    await sleep(animationSpeed / 2);
                }
                
                isAnimating = false;
            }
        },
        graph: {
            name: 'Graph',
            explanation: 'A graph is a non-linear data structure consisting of nodes and edges. Nodes are connected by edges which can be directed or undirected.',
            code: `// Graph implementation in JavaScript (Adjacency List)
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    // Add a vertex
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    // Add an edge
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }
    
    // Depth First Search
    dfs(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        
        (function dfsHelper(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfsHelper(neighbor);
                }
            });
        })(start);
        
        return result;
    }
    
    // Breadth First Search
    bfs(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true;
        
        while (queue.length) {
            const currentVertex = queue.shift();
            result.push(currentVertex);
            
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        
        return result;
    }
}`,
            visualize: function(data) {
                visualizationContainer.innerHTML = '';
                const graphContainer = document.createElement('div');
                graphContainer.className = 'graph-container';
                
                if (data.length === 0) {
                    const emptyText = document.createElement('p');
                    emptyText.textContent = 'Graph is empty';
                    graphContainer.appendChild(emptyText);
                } else {
                    // Create a simple graph with random connections for visualization
                    const nodes = [...new Set(data)];
                    const edges = [];
                    
                    // Create some random edges
                    for (let i = 0; i < nodes.length; i++) {
                        if (i < nodes.length - 1) {
                            edges.push([nodes[i], nodes[i+1]]);
                        }
                        if (i < nodes.length - 2 && Math.random() > 0.7) {
                            edges.push([nodes[i], nodes[i+2]]);
                        }
                    }
                    
                    // Position nodes in a circle
                    const centerX = visualizationContainer.offsetWidth / 2;
                    const centerY = visualizationContainer.offsetHeight / 2;
                    const radius = Math.min(centerX, centerY) - 60;
                    
                    // Draw edges first (so they appear behind nodes)
                    edges.forEach(edge => {
                        const [from, to] = edge;
                        const fromIndex = nodes.indexOf(from);
                        const toIndex = nodes.indexOf(to);
                        
                        const fromAngle = (fromIndex / nodes.length) * 2 * Math.PI;
                        const toAngle = (toIndex / nodes.length) * 2 * Math.PI;
                        
                        const fromX = centerX + radius * Math.cos(fromAngle);
                        const fromY = centerY + radius * Math.sin(fromAngle);
                        const toX = centerX + radius * Math.cos(toAngle);
                        const toY = centerY + radius * Math.sin(toAngle);
                        
                        const edgeElement = document.createElement('div');
                        edgeElement.className = 'graph-edge';
                        
                        const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
                        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
                        
                        edgeElement.style.width = `${length}px`;
                        edgeElement.style.left = `${fromX}px`;
                        edgeElement.style.top = `${fromY}px`;
                        edgeElement.style.transform = `rotate(${angle}deg)`;
                        
                        graphContainer.appendChild(edgeElement);
                    });
                    
                    // Draw nodes
                    nodes.forEach((node, index) => {
                        const angle = (index / nodes.length) * 2 * Math.PI;
                        const x = centerX + radius * Math.cos(angle) - 25;
                        const y = centerY + radius * Math.sin(angle) - 25;
                        
                        const nodeElement = document.createElement('div');
                        nodeElement.className = 'graph-node';
                        nodeElement.textContent = node;
                        nodeElement.style.left = `${x}px`;
                        nodeElement.style.top = `${y}px`;
                        
                        graphContainer.appendChild(nodeElement);
                    });
                }
                
                visualizationContainer.appendChild(graphContainer);
            },
            insert: function(value) {
                if (isAnimating) return;
                data.push(parseInt(value));
                this.visualize(data);
            },
            delete: function(value) {
                if (isAnimating) return;
                const index = data.indexOf(parseInt(value));
                if (index !== -1) {
                    data.splice(index, 1);
                }
                this.visualize(data);
            },
            search: async function(value) {
                if (isAnimating) return;
                isAnimating = true;
                const target = parseInt(value);
                const nodes = document.querySelectorAll('.graph-node');
                
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add('highlight');
                    await sleep(animationSpeed);
                    
                    if (parseInt(nodes[i].textContent) === target) {
                        isAnimating = false;
                        return;
                    }
                    
                    nodes[i].classList.remove('highlight');
                    await sleep(animationSpeed / 2);
                }
                
                isAnimating = false;
            }
        }
    };
    
    // Algorithm implementations
    const algorithms = {
        'linear-search': {
            name: 'Linear Search',
            explanation: 'Linear search checks each element in the list sequentially until the target element is found or the list ends. Time complexity: O(n).',
            code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                const target = Math.max(...data); // Search for max value for demo
                const elements = document.querySelectorAll('.array-element');
                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('comparing');
                    await sleep(animationSpeed);
                    
                    if (parseInt(elements[i].textContent) === target) {
                        elements[i].classList.remove('comparing');
                        elements[i].classList.add('highlight');
                        isAnimating = false;
                        startAlgoBtn.disabled = false;
                        return;
                    }
                    
                    elements[i].classList.remove('comparing');
                    await sleep(animationSpeed / 2);
                }
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'binary-search': {
            name: 'Binary Search',
            explanation: 'Binary search works on sorted arrays by repeatedly dividing the search interval in half. Time complexity: O(log n).',
            code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                // Binary search requires sorted array
                const sortedData = [...data].sort((a, b) => a - b);
                dataStructures[currentDataStructure].visualize(sortedData);
                await sleep(animationSpeed);
                
                const target = sortedData[Math.floor(sortedData.length / 2)]; // Middle element for demo
                let left = 0;
                let right = sortedData.length - 1;
                const elements = document.querySelectorAll('.array-element');
                
                while (left <= right) {
                    const mid = Math.floor((left + right) / 2);
                    
                    // Highlight current mid element
                    elements[mid].classList.add('comparing');
                    await sleep(animationSpeed);
                    
                    if (parseInt(elements[mid].textContent) === target) {
                        elements[mid].classList.remove('comparing');
                        elements[mid].classList.add('highlight');
                        isAnimating = false;
                        startAlgoBtn.disabled = false;
                        return;
                    }
                    
                    // Highlight left/right partition
                    if (parseInt(elements[mid].textContent) < target) {
                        for (let i = left; i <= mid; i++) {
                            elements[i].classList.add('comparing');
                        }
                        left = mid + 1;
                    } else {
                        for (let i = mid; i <= right; i++) {
                            elements[i].classList.add('comparing');
                        }
                        right = mid - 1;
                    }
                    
                    await sleep(animationSpeed);
                    
                    // Clear highlights
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('comparing');
                    }
                }
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'bubble-sort': {
            name: 'Bubble Sort',
            explanation: 'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time complexity: O(n²).',
            code: `function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--; // Largest element is in place
    } while (swapped);
    
    return arr;
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                const arr = [...data];
                const elements = document.querySelectorAll('.array-element');
                let n = arr.length;
                let swapped;
                
                do {
                    swapped = false;
                    for (let i = 0; i < n - 1; i++) {
                        // Highlight elements being compared
                        elements[i].classList.add('comparing');
                        elements[i + 1].classList.add('comparing');
                        await sleep(animationSpeed / 2);
                        
                        if (arr[i] > arr[i + 1]) {
                            // Swap elements in array
                            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                            swapped = true;
                            
                            // Swap elements in visualization
                            const temp = elements[i].textContent;
                            elements[i].textContent = elements[i + 1].textContent;
                            elements[i + 1].textContent = temp;
                            
                            await sleep(animationSpeed);
                        }
                        
                        // Remove comparison highlight
                        elements[i].classList.remove('comparing');
                        elements[i + 1].classList.remove('comparing');
                    }
                    
                    // Mark last element as sorted
                    elements[n - 1].classList.add('sorted');
                    n--;
                } while (swapped);
                
                // Mark all elements as sorted
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('sorted');
                }
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'selection-sort': {
            name: 'Selection Sort',
            explanation: 'Selection sort divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region. Time complexity: O(n²).',
            code: `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in unsorted array
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                const arr = [...data];
                const elements = document.querySelectorAll('.array-element');
                
                for (let i = 0; i < arr.length - 1; i++) {
                    let minIndex = i;
                    elements[i].classList.add('highlight'); // Current position
                    
                    // Find minimum in unsorted part
                    for (let j = i + 1; j < arr.length; j++) {
                        elements[j].classList.add('comparing');
                        await sleep(animationSpeed / 2);
                        
                        if (arr[j] < arr[minIndex]) {
                            elements[minIndex]?.classList.remove('pivot');
                            minIndex = j;
                            elements[minIndex].classList.add('pivot');
                        }
                        
                        elements[j].classList.remove('comparing');
                    }
                    
                    // Swap if needed
                    if (minIndex !== i) {
                        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                        
                        // Update visualization
                        const temp = elements[i].textContent;
                        elements[i].textContent = elements[minIndex].textContent;
                        elements[minIndex].textContent = temp;
                        
                        await sleep(animationSpeed);
                    }
                    
                    // Reset styles
                    elements[minIndex]?.classList.remove('pivot');
                    elements[i].classList.remove('highlight');
                    elements[i].classList.add('sorted');
                }
                
                // Mark last element as sorted
                elements[arr.length - 1].classList.add('sorted');
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'insertion-sort': {
            name: 'Insertion Sort',
            explanation: 'Insertion sort builds the final sorted array one item at a time by repeatedly taking the next item and inserting it into the correct position. Time complexity: O(n²).',
            code: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        
        // Move elements greater than current to one position ahead
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert current in correct position
        arr[j + 1] = current;
    }
    
    return arr;
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                const arr = [...data];
                const elements = document.querySelectorAll('.array-element');
                
                for (let i = 1; i < arr.length; i++) {
                    const current = arr[i];
                    let j = i - 1;
                    
                    // Highlight current element
                    elements[i].classList.add('highlight');
                    await sleep(animationSpeed);
                    
                    while (j >= 0 && arr[j] > current) {
                        // Highlight comparison
                        elements[j].classList.add('comparing');
                        await sleep(animationSpeed / 2);
                        
                        // Shift element
                        arr[j + 1] = arr[j];
                        elements[j + 1].textContent = elements[j].textContent;
                        
                        elements[j].classList.remove('comparing');
                        elements[j].classList.add('sorted');
                        
                        j--;
                        await sleep(animationSpeed);
                    }
                    
                    // Insert current in correct position
                    arr[j + 1] = current;
                    elements[j + 1].textContent = current;
                    
                    // Reset styles
                    elements[i].classList.remove('highlight');
                    elements[j + 1].classList.add('sorted');
                    
                    await sleep(animationSpeed);
                }
                
                // Mark first element as sorted
                elements[0].classList.add('sorted');
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'dfs': {
            name: 'Depth First Search',
            explanation: 'DFS explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or via recursion). Time complexity: O(V + E).',
            code: `// DFS for a graph (recursive implementation)
function dfs(graph, start) {
    const result = [];
    const visited = {};
    
    (function dfsHelper(vertex) {
        if (!vertex || visited[vertex]) return;
        
        visited[vertex] = true;
        result.push(vertex);
        
        graph[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                dfsHelper(neighbor);
            }
        });
    })(start);
    
    return result;
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                // Create a simple graph from the data
                const nodes = [...new Set(data)];
                const graph = {};
                
                nodes.forEach(node => {
                    graph[node] = [];
                });
                
                // Create some random edges
                for (let i = 0; i < nodes.length; i++) {
                    if (i < nodes.length - 1) {
                        graph[nodes[i]].push(nodes[i+1]);
                        graph[nodes[i+1]].push(nodes[i]);
                    }
                    if (i < nodes.length - 2 && Math.random() > 0.5) {
                        graph[nodes[i]].push(nodes[i+2]);
                        graph[nodes[i+2]].push(nodes[i]);
                    }
                }
                
                // Visualize the graph
                dataStructures.graph.visualize(nodes);
                await sleep(animationSpeed);
                
                const startNode = nodes[0];
                const visited = {};
                const stack = [startNode];
                const result = [];
                
                while (stack.length > 0) {
                    const vertex = stack.pop();
                    
                    if (!visited[vertex]) {
                        visited[vertex] = true;
                        result.push(vertex);
                        
                        // Highlight the current node
                        const nodeElement = document.querySelector(`.graph-node[style*="${vertex}"]`);
                        if (nodeElement) {
                            nodeElement.classList.add('highlight');
                            await sleep(animationSpeed);
                        }
                        
                        // Push neighbors in reverse order to visit them left-to-right
                        for (let i = graph[vertex].length - 1; i >= 0; i--) {
                            const neighbor = graph[vertex][i];
                            if (!visited[neighbor]) {
                                stack.push(neighbor);
                            }
                        }
                    }
                }
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        },
        'bfs': {
            name: 'Breadth First Search',
            explanation: 'BFS explores all neighbors at the present depth prior to moving on to nodes at the next depth level. It uses a queue. Time complexity: O(V + E).',
            code: `// BFS for a graph
function bfs(graph, start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    
    while (queue.length) {
        const vertex = queue.shift();
        result.push(vertex);
        
        graph[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    
    return result;
}`,
            execute: async function() {
                if (isAnimating || data.length === 0) return;
                isAnimating = true;
                startAlgoBtn.disabled = true;
                
                // Create a simple graph from the data
                const nodes = [...new Set(data)];
                const graph = {};
                
                nodes.forEach(node => {
                    graph[node] = [];
                });
                
                // Create some random edges
                for (let i = 0; i < nodes.length; i++) {
                    if (i < nodes.length - 1) {
                        graph[nodes[i]].push(nodes[i+1]);
                        graph[nodes[i+1]].push(nodes[i]);
                    }
                    if (i < nodes.length - 2 && Math.random() > 0.5) {
                        graph[nodes[i]].push(nodes[i+2]);
                        graph[nodes[i+2]].push(nodes[i]);
                    }
                }
                
                // Visualize the graph
                dataStructures.graph.visualize(nodes);
                await sleep(animationSpeed);
                
                const startNode = nodes[0];
                const visited = {};
                const queue = [startNode];
                visited[startNode] = true;
                const result = [];
                
                while (queue.length > 0) {
                    const vertex = queue.shift();
                    result.push(vertex);
                    
                    // Highlight the current node
                    const nodeElement = document.querySelector(`.graph-node[style*="${vertex}"]`);
                    if (nodeElement) {
                        nodeElement.classList.add('highlight');
                        await sleep(animationSpeed);
                    }
                    
                    // Add neighbors to queue
                    graph[vertex].forEach(neighbor => {
                        if (!visited[neighbor]) {
                            visited[neighbor] = true;
                            queue.push(neighbor);
                        }
                    });
                }
                
                isAnimating = false;
                startAlgoBtn.disabled = false;
            }
        }
    };
    
    // Helper function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Event listeners
    document.querySelectorAll('.ds-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.ds-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDataStructure = this.dataset.structure;
            dataStructures[currentDataStructure].visualize(data);
            codeDisplay.textContent = dataStructures[currentDataStructure].code;
            explanationText.textContent = dataStructures[currentDataStructure].explanation;
            currentAlgorithm = null;
            document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
        });
    });
    
    document.querySelectorAll('.algo-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentAlgorithm = this.dataset.algorithm;
            codeDisplay.textContent = algorithms[currentAlgorithm].code;
            explanationText.textContent = algorithms[currentAlgorithm].explanation;
        });
    });
    
    insertBtn.addEventListener('click', function() {
        if (valueInput.value) {
            dataStructures[currentDataStructure].insert(valueInput.value);
            valueInput.value = '';
        }
    });
    
    deleteBtn.addEventListener('click', function() {
        if (valueInput.value) {
            dataStructures[currentDataStructure].delete(valueInput.value);
            valueInput.value = '';
        } else if (currentDataStructure === 'stack') {
            dataStructures.stack.delete();
        } else if (currentDataStructure === 'queue') {
            dataStructures.queue.delete();
        }
    });
    
    searchBtn.addEventListener('click', function() {
        if (valueInput.value) {
            dataStructures[currentDataStructure].search(valueInput.value);
        }
    });
    
    generateRandomBtn.addEventListener('click', function() {
        if (isAnimating) return;
        data = [];
        const count = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < count; i++) {
            data.push(Math.floor(Math.random() * 100) + 1);
        }
        dataStructures[currentDataStructure].visualize(data);
    });
    
    clearAllBtn.addEventListener('click', function() {
        if (isAnimating) return;
        data = [];
        dataStructures[currentDataStructure].visualize(data);
    });
    
    startAlgoBtn.addEventListener('click', function() {
        if (currentAlgorithm) {
            algorithms[currentAlgorithm].execute();
        }
    });
    
    speedSlider.addEventListener('input', function() {
        animationSpeed = 1000 / this.value;
    });
    
    // Initialize with array
    dataStructures.array.visualize(data);
    codeDisplay.textContent = dataStructures.array.code;
    explanationText.textContent = dataStructures.array.explanation;
});