# treemodule-json

## Feed JSON data to a tree component

> ***This tutorial requires some knowledge in Angular, TypeScript, and Primeng components.***


The ***server*** folder will contain the Go server-side software. In succeeding iteration of this folder it will contain files. As of now it is empty. The ***pgsql*** folder will contain the Postgresql scripts called by the Go server-side app. For now this folder is also empty.

The ***client*** folder contains the Angular project. For now our focus is this ***client*** folder.

This demo code started life as a clone of the [PrimeNG Angular-CLI](https://github.com/primefaces/primeng-quickstart-cli) project. It is the quickest way to scaffold your project using the Primeng UI components. I have looked around for various UI component libraries and have learned to like Primeng.

I added the ***Tree Demo*** button to display the tree-demo page:<br/>
<img src="images/primeng-quickstart-cli.png" width="650"/>

This is the ***Tree Demo*** and clicking on ***List Demo*** brings you back to the previous list-demo page.<br/>
<img src="images/primeng-tree-demo.png" width="650"/>

This ***Tree Demo*** started life as the [Primeng tree-demo](https://www.primefaces.org/primeng/tree). Here is the [StackBlitz tree-demo](https://stackblitz.com/edit/primeng-tree-demo?file=src%2Fapp%2Fapp.component.ts).

Below is code for the StackBlitz AppComponent (app.component.ts) code. However, the moment your code takes on the semblance of a half-decent app you stop coding this way. For demo purposes yes it is perfectly fine.
```typescript
import {Component,OnInit} from '@angular/core';
import {NodeService} from './nodeservice';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    files1: TreeNode[];

    files2: TreeNode[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFiles().then(files => this.files2 = files);
    }

    expandAll(){
        this.files2.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.files2.forEach( node => {
            this.expandRecursive(node, false);
        } );
    }

    private expandRecursive(node:TreeNode, isExpand:boolean){
        node.expanded = isExpand;
        if (node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }
}
```

Below is my suggestion of how to code it.
```typescript
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../services/nodeservice';

@Component({
  // selector: 'app-treedemo',
  templateUrl: './treedemo.component.html',
  styleUrls: ['./treedemo.component.css'],
})
export class TreedemoComponent implements OnInit {

    constructor(private nodeService: NodeService) { }

    public get files() {
        return this.nodeService.files;
    }

    ngOnInit() { }

    expandAll() {
        this.files.forEach( node => {
            this.nodeService.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files.forEach( node => {
            this.nodeService.expandRecursive(node, false);
        });
    }

    saveToexpend(event) {
        this.nodeService.saveToexpend(event);
    }
}
```


---
Under construction... 😊
