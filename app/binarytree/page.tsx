import styles from "page.module.css"

import Header from "components/header";
import Description from "components/description";
import Link from "next/link";
import TreeGrid from "binarytree/TreeGrid";

export default function BinaryTree() {
    return (
        <div className={styles.page}>
            <Header>Binary Tree</Header>
            <Description>
                A binary tree is a type of data structure in which each node has at most two children, commonly referred to as the left and right child.
                It organizes data hierarchically, with a single root node at the top and other nodes branching out below. This structure allows for efficient searching,
                insertion, and deletion of data. Binary trees are widely used in computer science for tasks like sorting, searching, and implementing other data structures
                such as heaps and binary search trees. Their simple yet flexible design makes them ideal for representing hierarchical relationships, like folder structures
                or decision processes.
            </Description>
            <TreeGrid />
            <Link href="/">Home</Link>
        </div>
    );
}
