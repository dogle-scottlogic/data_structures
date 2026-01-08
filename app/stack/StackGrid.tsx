'use client';

import { ListNode } from 'types/list';
import { useState } from 'react';
import { drawList } from 'utils/drawList';
import Grid from 'components/grid';

export default function StackGrid() {
  const initialNode: ListNode = { value: 1, next: null };
  const [head, setHead] = useState<ListNode | null>(initialNode);

  const drawFunctions = drawList(head);
  const updateExitingNode = drawFunctions.updateExitingNode;

  const push = () => setHead((h) => pushNode(h));
  const pop = () => setHead((h) => popNode(h, updateExitingNode));
  const reset = () => setHead(null);

  return (
    <Grid
      draw={drawFunctions.draw}
      addNode={push}
      deleteNode={pop}
      reset={reset}
    />
  );
}

function pushNode(front: ListNode | null): ListNode {
  const newNode: ListNode = { value: nextValue(front), next: null };
  if (!front) return newNode;
  newNode.next = front;
  return newNode;
}

function popNode(
  front: ListNode | null,
  updateExitingNode: (exitingNode: ListNode, x: number) => void
): ListNode | null {
  if (!front) return null;
  updateExitingNode(front, 80);
  return front.next;
}

// Determine the next value for a new node
function nextValue(front: ListNode | null): number {
  if (front == null) {
    return 1;
  }
  return front.value + 1;
}
