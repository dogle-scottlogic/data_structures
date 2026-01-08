export type ListNode = {
  value: number;
  next: ListNode | null;
};

export type OptionalListNode = ListNode | null;

export type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  _subtreeWidth?: number;
};

export type OptionalTreeNode = TreeNode | null;
