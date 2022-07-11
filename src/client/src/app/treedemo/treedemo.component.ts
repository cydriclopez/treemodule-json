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
