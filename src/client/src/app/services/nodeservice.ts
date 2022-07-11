import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

export interface TreeNode2 extends TreeNode {
    toexpand?:      boolean;
    /**
     * Hint: You can expand this to implement whatever
     * data you want persisted in this recursive structure
     * and to support whatever operation you want done on
     * the client or in the server.
     */
}

@Injectable({
    providedIn: 'root',
})
export class NodeService {

    files: TreeNode2[];

    constructor(private http: HttpClient) {
        this.getFiles().then(files => this.files = files);
    }

    getFiles() {
        return this.http.get<any>('assets/data/files.json')
        .toPromise()
        .then(res => <TreeNode2[]>res.data);
    }

    expandRecursive(node: TreeNode2, isExpand: boolean) {
        node.expanded = node.toexpand = isExpand;
        if (node.children) {
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    resetRecursive(node: TreeNode2) {
        node.expanded = node.toexpand;
        if (node.children) {
            node.children.forEach( childNode => {
                this.resetRecursive(childNode);
            });
        }
    }

    saveToexpend(event) {
        event.node.toexpand = event.node.expanded;
        console.log(
            'label:', event.node.label,
            '\ntoexpand:', event.node.toexpand
        );
    }

}
