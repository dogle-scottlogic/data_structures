import styles from "page.module.css"

import Header from "components/header";
import Description from "components/description";
import LinkedListGrid from "linkedlist/linkedListGrid";

export default function LinkedList() {
    return (
        <div className={styles.page}>
            <Header>Linked List</Header>
            <Description>
                A linked list is a linear data structure composed of a sequence of elements called nodes, where each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation, allowing efficient insertion and deletion of elements at any position without shifting other elements. They can be singly linked, where each node points only to the next node, or doubly linked, where nodes maintain pointers to both the next and previous nodes, enabling traversal in both directions. Linked lists are commonly used in scenarios where dynamic memory allocation and frequent modifications are needed, such as implementing stacks, queues, and graph adjacency lists.
            </Description>
            <LinkedListGrid />
        </div>
    );
}
