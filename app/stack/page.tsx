import styles from "page.module.css";

import Header from "components/header";
import Description from "components/description";
import Link from "next/link";
import StackGrid from "./StackGrid";

export default function Stack() {
  return (
    <div className={styles.page}>
      <Header>Stack</Header>
      <Description>
        A stack is a linear data structure following the Last-In, First-Out
        (LIFO) principle, like a pile of plates where you add and remove items
        only from the top. Key operations include push (add to top) and pop
        (remove from top), with peek to view the top item without removing it,
        used in undo functions, browser history, and function call management in
        programming.
      </Description>
      <StackGrid />
      <Link href="/">Home</Link>
    </div>
  );
}
