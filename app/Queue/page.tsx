import styles from "page.module.css";

import Header from "components/header";
import Description from "components/description";
import QueueGrid from "Queue/queueGrid";
import Link from "next/link";

export default function Queue() {
  return (
    <div className={styles.page}>
      <Header>Queue</Header>
      <Description>
        A queue in data structures is a linear collection that follows the
        First-In, First-Out (FIFO) principle, meaning the first element added is
        the first one removed, like people waiting in a real-world line. Data is
        inserted at the rear (enqueue) and removed from the front (dequeue),
        using operations like enqueue, dequeue, peek, isEmpty, and size, and can
        be implemented with arrays or linked lists.
      </Description>
      <QueueGrid />
      <Link href="/">Home</Link>
    </div>
  );
}
