import styles from "page.module.css";

import Header from "components/header";
import Description from "components/description";
import Link from "next/link";
import RedBlackTreeGrid from "./redBlackTreeGrid";

export default function BinaryTree() {
  return (
    <div className={styles.page}>
      <Header>Binary Tree</Header>
      <Description>
        In computer science, a red–black tree is a self-balancing binary search
        tree data structure noted for fast storage and retrieval of ordered
        information. The nodes in a red-black tree hold an extra colour bit,
        often drawn as red and black, which help ensure that the tree is always
        approximately balanced. When the tree is modified, the new tree is
        rearranged and repainted to restore the colouring properties that
        constrain how unbalanced the tree can become in the worst case. The
        properties are designed such that this rearranging and recolouring can
        be performed efficiently. The (re-)balancing is not perfect, but
        guarantees searching in O log n time, where n is the number of entries
        in the tree. The insert and delete operations, along with tree
        rearrangement and recolouring, also execute in O log n time. Tracking
        the color of each node requires only one bit of information per node
        because there are only two colors (due to memory alignment present in
        some programming languages, the real memory consumption may differ). The
        tree does not contain any other data specific to it being a red–black
        tree, so its memory footprint is almost identical to that of a classic
        (uncoloured) binary search tree. In some cases, the added bit of
        information can be stored at no added memory cost.
      </Description>
      <RedBlackTreeGrid />
      <Link href="/">Home</Link>
    </div>
  );
}
