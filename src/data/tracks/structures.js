// Data structures problems, ordered from easiest to hardest.
// See src/data/problems.js for how problems are scheduled and what each field means.

export default [
  {
    slug: 'contains-duplicate',
    title: 'Contains a duplicate',
    difficulty: 'Easy',
    prompt: `<p>Write <code>has_duplicate(nums)</code> that returns <code>True</code> if any value appears more than once in the list. Make it O(n).</p>`,
    example: `has_duplicate([1, 2, 3, 1])   # True
has_duplicate([1, 2, 3])      # False`,
    hint: `<p>A set can tell you in O(1) whether you have seen a value before.</p>`,
    code: `def has_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
    answer: `<p>Checking every pair would be O(n<sup>2</sup>). A set makes each lookup O(1) on average, so one pass is enough, and the loop stops at the first repeat. The one-liner <code>len(set(nums)) != len(nums)</code> is also O(n) but always processes the whole list.</p>`,
  },
  {
    slug: 'two-sum',
    title: 'Two sum',
    difficulty: 'Easy',
    prompt: `<p>Given a list of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>. Exactly one answer exists, and you may not use the same element twice.</p><p>Can you beat O(n<sup>2</sup>)?</p>`,
    example: `two_sum([2, 7, 11, 15], 9)
# [0, 1]`,
    hint: `<p>As you walk the list, remember every number you have already seen and where. For each new number, what partner are you looking for?</p>`,
    code: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i`,
    answer: `<p>A dictionary gives O(1) lookups, so one pass is enough: O(n) time and O(n) extra space. Checking before inserting stops a number from pairing with itself.</p>`,
  },
  {
    slug: 'intersection-of-two-lists',
    title: 'Intersection of two lists',
    difficulty: 'Easy',
    prompt: `<p>Write <code>common(a, b)</code> that returns the values found in both lists, without duplicates, in sorted order.</p>`,
    example: `common([4, 9, 5, 4], [9, 4, 9, 8, 4])   # [4, 9]
common([1, 2], [3])                     # []`,
    hint: `<p>Python sets support <code>&amp;</code> for intersection.</p>`,
    code: `def common(a, b):
    return sorted(set(a) & set(b))`,
    answer: `<p>Building the two sets is O(len(a) + len(b)), and the intersection checks each item of the smaller set against the larger. Sorting the result adds O(k log k) for k shared values. A nested loop with <code>in</code> on lists would be O(len(a) &times; len(b)).</p>`,
  },
  {
    slug: 'the-missing-number',
    title: 'The missing number',
    difficulty: 'Easy',
    prompt: `<p>A list contains <code>n</code> distinct numbers taken from the range 0 to <code>n</code>, so exactly one number in that range is missing. Find it in O(n) time and O(1) extra space.</p>`,
    example: `missing([3, 0, 1])        # 2
missing([0, 1])           # 2
missing([9,6,4,2,3,5,7,0,1])  # 8`,
    hint: `<p>You know what 0 + 1 + ... + n adds up to without looking at the list.</p>`,
    code: `def missing(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
    answer: `<p>The full range sums to n(n+1)/2. Subtract what is actually there and the difference is the missing number. Another way: XOR every index and value together, and the pairs cancel out, leaving the missing number.</p>`,
  },
  {
    slug: 'balanced-brackets',
    title: 'Balanced brackets',
    difficulty: 'Easy',
    prompt: `<p>Write <code>is_balanced(s)</code> that returns <code>True</code> if every bracket in <code>s</code> is closed by the same type of bracket in the right order. The string contains only <code>()[]{}</code>.</p>`,
    example: `is_balanced("([]{})")  # True
is_balanced("([)]")    # False
is_balanced("((")      # False`,
    hint: `<p>The most recently opened bracket must be the first one closed. Which data structure gives you "last in, first out"?</p>`,
    code: `def is_balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
    answer: `<p>Push every opening bracket. On a closing bracket, the top of the stack must be its partner. At the end the stack must be empty, otherwise something was never closed. O(n) time.</p>`,
  },
  {
    slug: 'first-unique-character',
    title: 'First unique character',
    difficulty: 'Easy',
    prompt: `<p>Write <code>first_unique(s)</code> that returns the index of the first character that appears exactly once in <code>s</code>, or <code>-1</code> if there is none.</p>`,
    example: `first_unique("leetcode")       # 0
first_unique("loveleetcode")   # 2
first_unique("aabb")           # -1`,
    hint: `<p>Two passes: one to count, one to find.</p>`,
    code: `from collections import Counter

def first_unique(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1`,
    answer: `<p>The first pass builds a frequency table; the second finds the earliest character with a count of 1. Two passes are still O(n), and the table holds at most one entry per distinct character.</p>`,
  },
  {
    slug: 'binary-search-by-hand',
    title: 'Binary search, by hand',
    difficulty: 'Easy',
    prompt: `<p>Write <code>search(nums, target)</code> that returns the index of <code>target</code> in a sorted list, or <code>-1</code> if it is not there. It must run in O(log n). No <code>bisect</code>.</p>`,
    example: `search([1, 3, 5, 7, 9], 7)   # 3
search([1, 3, 5, 7, 9], 4)   # -1`,
    hint: `<p>Keep two indices, <code>lo</code> and <code>hi</code>, for the part of the list that could still contain the target. Look at the middle and throw away half.</p>`,
    code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    answer: `<p>Each loop halves the range, giving O(log n). The common bugs are using <code>lo &lt; hi</code> (which misses one-element ranges) and setting <code>lo = mid</code> instead of <code>mid + 1</code> (which can loop forever).</p>`,
  },
  {
    slug: 'merge-two-sorted-lists',
    title: 'Merge two sorted lists',
    difficulty: 'Easy',
    prompt: `<p>Write <code>merge(a, b)</code> that merges two sorted lists into one sorted list in O(len(a) + len(b)) time, without calling <code>sort</code>.</p>`,
    example: `merge([1, 4, 9], [2, 3, 10, 12])
# [1, 2, 3, 4, 9, 10, 12]`,
    hint: `<p>Keep one index into each list and always take the smaller of the two front items.</p>`,
    code: `def merge(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,
    answer: `<p>Each comparison places one item, and when one list runs out the rest of the other is already sorted. This is the "merge" step of merge sort. Using <code>&lt;=</code> keeps equal items in their original order, which makes the sort stable.</p>`,
  },
  {
    slug: 'depth-of-a-binary-tree',
    title: 'Depth of a binary tree',
    difficulty: 'Easy',
    prompt: `<p>Given the root of a binary tree, return its maximum depth: the number of nodes on the longest path from the root down to a leaf. An empty tree has depth 0.</p>`,
    example: `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right`,
    hint: `<p>The depth of a tree is 1 plus the depth of its deeper subtree.</p>`,
    code: `def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left),
                   max_depth(root.right))`,
    answer: `<p>The empty tree is the base case. Every other node adds one level on top of its deeper child. Each node is visited once: O(n) time, and O(h) stack space for a tree of height h.</p>`,
  },
  {
    slug: 'middle-of-a-linked-list',
    title: 'Middle of a linked list',
    difficulty: 'Easy',
    prompt: `<p>Given the head of a singly linked list, return its middle node in one pass. If there are two middle nodes, return the second.</p>`,
    example: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# 1 -> 2 -> 3 -> 4 -> 5        middle is 3
# 1 -> 2 -> 3 -> 4 -> 5 -> 6   middle is 4`,
    hint: `<p>Move one pointer one step at a time and another two steps at a time.</p>`,
    code: `def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    answer: `<p>When the fast pointer reaches the end, the slow one has gone exactly half as far. One pass and O(1) space, without counting the length first. The same two-speed idea detects cycles.</p>`,
  },
  {
    slug: 'insertion-sort',
    title: 'Insertion sort',
    difficulty: 'Easy',
    prompt: `<p>Implement <code>insertion_sort(nums)</code>, which sorts the list in place and returns it. Do not use <code>sort</code> or <code>sorted</code>.</p>`,
    example: `insertion_sort([5, 2, 4, 6, 1, 3])
# [1, 2, 3, 4, 5, 6]`,
    hint: `<p>Like sorting a hand of cards: take the next card and slide it left past every larger card.</p>`,
    code: `def insertion_sort(nums):
    for i in range(1, len(nums)):
        current = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > current:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = current
    return nums`,
    answer: `<p>Everything left of <code>i</code> is always sorted. Each new item shifts larger items right until it finds its place. The worst case is O(n<sup>2</sup>), but on nearly sorted data it is close to O(n), and it is stable. Python's built-in sort (Timsort) uses insertion sort for short runs for exactly that reason.</p>`,
  },
  {
    slug: 'best-window-sum',
    title: 'Best window sum',
    difficulty: 'Easy',
    prompt: `<p>Write <code>max_window_sum(nums, k)</code> that returns the largest sum of any <code>k</code> consecutive items. Assume 1 &le; <code>k</code> &le; <code>len(nums)</code>. Aim for O(n).</p>`,
    example: `max_window_sum([2, 1, 5, 1, 3, 2], 3)   # 9  (5 + 1 + 3)`,
    hint: `<p>When the window slides one step right, one item enters and one item leaves. You do not need to add up the whole window again.</p>`,
    code: `def max_window_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best`,
    answer: `<p>Re-summing every window would be O(n &middot; k). The sliding window updates the sum in O(1) per step, so the whole thing is O(n). Sliding windows solve a whole family of "best consecutive stretch" problems.</p>`,
  },
  {
    slug: 'reverse-a-linked-list',
    title: 'Reverse a linked list',
    difficulty: 'Medium',
    prompt: `<p>Given the head of a singly linked list, reverse the list in place and return the new head.</p>`,
    example: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# 1 -> 2 -> 3 -> None
# becomes
# 3 -> 2 -> 1 -> None`,
    hint: `<p>Walk the list once, keeping track of the previous node. Before you repoint <code>node.next</code>, save where you were going.</p>`,
    code: `def reverse(head):
    prev = None
    node = head
    while node:
        nxt = node.next
        node.next = prev
        prev = node
        node = nxt
    return prev`,
    answer: `<p>Each step flips one arrow to point backwards. <code>nxt</code> stops you from losing the rest of the list. When <code>node</code> runs off the end, <code>prev</code> is the old tail, which is the new head. O(n) time, O(1) extra space.</p>`,
  },
  {
    slug: 'queue-from-two-stacks',
    title: 'Queue from two stacks',
    difficulty: 'Medium',
    prompt: `<p>Implement a first-in, first-out queue with <code>push(x)</code> and <code>pop()</code>, using only two stacks (Python lists where you only call <code>append</code> and <code>pop()</code>).</p><p>Each operation should be O(1) on average.</p>`,
    hint: `<p>Pouring one stack into another reverses its order. You only need to pour when the "out" stack is empty.</p>`,
    code: `class Queue:
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def push(self, x):
        self.inbox.append(x)

    def pop(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
        return self.outbox.pop()`,
    answer: `<p>New items go on <code>inbox</code>. When <code>outbox</code> is empty, move everything across, which reverses it so the oldest item is on top. Each item is moved at most once, so the cost averages out to O(1) per operation (amortised).</p>`,
  },
  {
    slug: 'does-the-list-loop',
    title: 'Does the list loop?',
    difficulty: 'Medium',
    prompt: `<p>Given the head of a singly linked list, return <code>True</code> if the list contains a cycle (some node's <code>next</code> points back to an earlier node). Use O(1) extra space.</p>`,
    hint: `<p>Send two pointers down the list at different speeds. If there is a loop, what must eventually happen?</p>`,
    code: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    answer: `<p>This is Floyd's "tortoise and hare". Without a loop, the fast pointer reaches the end. With a loop, the fast pointer gains one step per round on the slow one inside the cycle, so they must meet. O(n) time, O(1) space.</p>`,
  },
  {
    slug: 'group-the-anagrams',
    title: 'Group the anagrams',
    difficulty: 'Medium',
    prompt: `<p>Write <code>group_anagrams(words)</code> that groups words which are anagrams of each other. Return a list of groups; the order does not matter.</p>`,
    example: `group_anagrams(["eat", "tea", "tan", "ate", "nat"])
# [["eat", "tea", "ate"], ["tan", "nat"]]`,
    hint: `<p>Anagrams look identical once their letters are sorted. Use that as a dictionary key.</p>`,
    code: `from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())`,
    answer: `<p>Sorting the letters gives every anagram the same "signature", and the dictionary collects words by signature. For n words of length up to k, this is O(n &middot; k log k).</p>`,
  },
  {
    slug: 'top-k-frequent',
    title: 'Top k frequent',
    difficulty: 'Medium',
    prompt: `<p>Write <code>top_k(nums, k)</code> that returns the <code>k</code> most frequent values in <code>nums</code>, most frequent first. You can assume the answer is unique.</p>`,
    example: `top_k([1, 1, 1, 2, 2, 3], 2)
# [1, 2]`,
    hint: `<p>Count with a dictionary, then you need the k largest counts. A heap does that without sorting everything.</p>`,
    code: `import heapq
from collections import Counter

def top_k(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts, key=counts.get)`,
    answer: `<p>Counting is O(n). <code>heapq.nlargest</code> keeps a heap of size k, so selecting is O(m log k) for m distinct values, which beats a full O(m log m) sort when k is small. <code>Counter(nums).most_common(k)</code> is the built-in shortcut.</p>`,
  },
  {
    slug: 'merge-intervals',
    title: 'Merge intervals',
    difficulty: 'Medium',
    prompt: `<p>Write <code>merge_intervals(intervals)</code> that merges all overlapping <code>[start, end]</code> intervals. Intervals that touch, like [1, 4] and [4, 5], count as overlapping.</p>`,
    example: `merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])
# [[1, 6], [8, 10], [15, 18]]

merge_intervals([[1, 4], [4, 5]])
# [[1, 5]]`,
    hint: `<p>Sort by start time first. Then each interval either overlaps the last merged one or starts a new one.</p>`,
    code: `def merge_intervals(intervals):
    out = []
    for start, end in sorted(intervals):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out`,
    answer: `<p>After sorting, an interval can only overlap the most recent merged one. <code>max</code> handles an interval completely inside another, like [1, 10] and [2, 3]. Sorting dominates, so it is O(n log n). Calendars and booking systems use exactly this.</p>`,
  },
  {
    slug: 'maximum-subarray',
    title: 'Maximum subarray',
    difficulty: 'Medium',
    prompt: `<p>Write <code>max_subarray(nums)</code> that returns the largest sum of any non-empty run of consecutive items. The list may contain negative numbers.</p>`,
    example: `max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])   # 6  (4, -1, 2, 1)
max_subarray([-3, -1, -2])                       # -1`,
    hint: `<p>At each position, the best run ending there either extends the best run ending at the previous position, or starts fresh at this item.</p>`,
    code: `def max_subarray(nums):
    best = current = nums[0]
    for n in nums[1:]:
        current = max(n, current + n)
        best = max(best, current)
    return best`,
    answer: `<p>This is Kadane's algorithm. If the run so far has a negative total, it can only hurt, so drop it and start again at <code>n</code>. One pass, O(n) time, O(1) space. Starting <code>best</code> at <code>nums[0]</code> rather than 0 makes the all-negative case correct.</p>`,
  },
  {
    slug: 'product-except-self',
    title: 'Product of everything else',
    difficulty: 'Medium',
    prompt: `<p>Write <code>product_except_self(nums)</code> that returns a list where each item is the product of every <em>other</em> item. Do it in O(n) without using division.</p>`,
    example: `product_except_self([1, 2, 3, 4])   # [24, 12, 8, 6]
product_except_self([0, 1, 2])      # [2, 0, 0]`,
    hint: `<p>The answer at position i is (product of everything to the left) &times; (product of everything to the right). You can compute both in two passes.</p>`,
    code: `def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    left = 1
    for i in range(n):
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(n - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out`,
    answer: `<p>The first pass stores the product of everything to the left of each position, and the second multiplies in everything to the right. Dividing the total product by each item would fail as soon as the list contains a zero, which is why the problem bans division.</p>`,
  },
  {
    slug: 'min-stack',
    title: 'Min stack',
    difficulty: 'Medium',
    prompt: `<p>Design a stack class with <code>push(x)</code>, <code>pop()</code>, <code>top()</code> and <code>get_min()</code>, where every operation runs in O(1) time.</p>`,
    example: `s = MinStack()
s.push(5)
s.push(2)
s.push(7)
s.get_min()   # 2
s.pop()       # 7
s.pop()       # 2
s.get_min()   # 5`,
    hint: `<p>Keep a second stack that records, for each level of the main stack, the minimum so far.</p>`,
    code: `class MinStack:
    def __init__(self):
        self.items = []
        self.mins = []

    def push(self, x):
        self.items.append(x)
        smallest = x if not self.mins else min(x, self.mins[-1])
        self.mins.append(smallest)

    def pop(self):
        self.mins.pop()
        return self.items.pop()

    def top(self):
        return self.items[-1]

    def get_min(self):
        return self.mins[-1]`,
    answer: `<p>A single "current minimum" variable breaks when you pop the minimum, because you no longer know the one before it. The second stack remembers the minimum at every depth, so popping just restores the previous answer. It trades O(n) extra memory for O(1) time.</p>`,
  },
  {
    slug: 'level-order-traversal',
    title: 'Level order traversal',
    difficulty: 'Medium',
    prompt: `<p>Write <code>level_order(root)</code> that returns the values of a binary tree level by level, from left to right.</p>`,
    example: `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#     3
#    / \\
#   9   20
#      /  \\
#     15   7
# level_order(root) -> [[3], [9, 20], [15, 7]]`,
    hint: `<p>Use a queue (<code>collections.deque</code>). At the start of each level, the queue holds exactly the nodes on that level.</p>`,
    code: `from collections import deque

def level_order(root):
    if root is None:
        return []
    levels = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        levels.append(level)
    return levels`,
    answer: `<p>This is breadth-first search. Reading <code>len(queue)</code> before the inner loop tells you how many nodes belong to the current level, even though children are being added at the same time. Every node is visited once: O(n). A list with <code>pop(0)</code> would work but is O(n) per pop; <code>deque.popleft</code> is O(1).</p>`,
  },
  {
    slug: 'longest-substring-without-repeats',
    title: 'Longest substring without repeats',
    difficulty: 'Medium',
    prompt: `<p>Write <code>longest_unique(s)</code> that returns the length of the longest run of consecutive characters in <code>s</code> with no character repeated.</p>`,
    example: `longest_unique("abcabcbb")   # 3  ("abc")
longest_unique("bbbbb")      # 1
longest_unique("pwwkew")     # 3  ("wke")
longest_unique("")           # 0`,
    hint: `<p>Keep a window <code>[start, i]</code> with no repeats. Remember the last index where each character appeared, so you can jump <code>start</code> forward when a repeat enters.</p>`,
    code: `def longest_unique(s):
    last_seen = {}
    start = best = 0
    for i, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= start:
            start = last_seen[ch] + 1
        last_seen[ch] = i
        best = max(best, i - start + 1)
    return best`,
    answer: `<p>The check <code>last_seen[ch] &gt;= start</code> matters: a character seen before the current window is not a repeat inside it. Both ends of the window only move forward, so this is O(n), compared with O(n<sup>2</sup>) or worse for checking every substring.</p>`,
  },
  {
    slug: 'count-the-islands',
    title: 'Count the islands',
    difficulty: 'Medium',
    prompt: `<p>A grid of "1" (land) and "0" (water) is given as a list of strings. An island is a group of land cells connected up, down, left or right. Write <code>count_islands(grid)</code>.</p>`,
    example: `grid = [
    "11000",
    "11000",
    "00100",
    "00011",
]
count_islands(grid)   # 3`,
    hint: `<p>Scan every cell. When you find land you have not visited, that is a new island: count it, then visit all the land connected to it so you do not count it again.</p>`,
    code: `def count_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    seen = set()
    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1" or (r, c) in seen:
                continue
            islands += 1
            stack = [(r, c)]
            seen.add((r, c))
            while stack:
                y, x = stack.pop()
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < rows and 0 <= nx < cols:
                        if grid[ny][nx] == "1" and (ny, nx) not in seen:
                            seen.add((ny, nx))
                            stack.append((ny, nx))
    return islands`,
    answer: `<p>The grid is really a graph: each land cell is a node joined to its land neighbours, and islands are connected components. The explicit stack does a depth-first search without recursion, so a huge island cannot hit Python's recursion limit. Each cell is handled a constant number of times: O(rows &times; cols).</p>`,
  },
  {
    slug: 'build-a-trie',
    title: 'Build a trie',
    difficulty: 'Medium',
    prompt: `<p>Implement a <code>Trie</code> (prefix tree) class with <code>insert(word)</code>, <code>search(word)</code>, which checks for a whole word, and <code>starts_with(prefix)</code>.</p>`,
    example: `t = Trie()
t.insert("car")
t.insert("cart")
t.search("car")        # True
t.search("ca")         # False
t.starts_with("ca")    # True
t.starts_with("dog")   # False`,
    hint: `<p>Each node can be a dictionary from a character to the next node. You also need a way to mark "a word ends here".</p>`,
    code: `class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["end"] = True

    def _find(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return None
            node = node[ch]
        return node

    def search(self, word):
        node = self._find(word)
        return node is not None and "end" in node

    def starts_with(self, prefix):
        return self._find(prefix) is not None`,
    answer: `<p>Each operation takes time proportional to the length of the word, however many words are stored. The <code>"end"</code> marker is safe because every real key is a single character. Tries power autocomplete and spell checkers, where "every word starting with ca" is the main question.</p>`,
  },
  {
    slug: 'validate-a-bst',
    title: 'Validate a binary search tree',
    difficulty: 'Hard',
    prompt: `<p>Write <code>is_bst(root)</code> that returns <code>True</code> if a binary tree is a valid binary search tree: for every node, all values in its left subtree are smaller and all values in its right subtree are larger.</p>`,
    example: `#     5
#    / \\
#   3   8
#    \\
#     6
# is_bst(root) -> False: 6 is in 5's left subtree`,
    hint: `<p>Checking each node against just its children is not enough, as the example shows. Pass down the range of values each subtree is allowed to contain.</p>`,
    code: `def is_bst(node, low=float("-inf"), high=float("inf")):
    if node is None:
        return True
    if not (low < node.val < high):
        return False
    return (is_bst(node.left, low, node.val)
            and is_bst(node.right, node.val, high))`,
    answer: `<p>Going left tightens the upper bound and going right tightens the lower bound, so every node is checked against <em>all</em> its ancestors, not just its parent. O(n) time. Another valid approach: an in-order traversal of a BST visits values in strictly increasing order.</p>`,
  },
  {
    slug: 'lru-cache',
    title: 'LRU cache',
    difficulty: 'Hard',
    prompt: `<p>Implement <code>LRUCache(capacity)</code> with <code>get(key)</code>, which returns the value or -1, and <code>put(key, value)</code>. When the cache is full, adding a new key evicts the least recently used one. Both operations should be O(1).</p>`,
    example: `c = LRUCache(2)
c.put(1, "a")
c.put(2, "b")
c.get(1)        # "a"  (1 is now most recent)
c.put(3, "c")   # evicts 2
c.get(2)        # -1`,
    hint: `<p>You need fast lookup by key and a fast way to move a key to the "most recent" end. <code>collections.OrderedDict</code> has <code>move_to_end</code> and <code>popitem(last=False)</code>.</p>`,
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.data = OrderedDict()

    def get(self, key):
        if key not in self.data:
            return -1
        self.data.move_to_end(key)
        return self.data[key]

    def put(self, key, value):
        if key in self.data:
            self.data.move_to_end(key)
        self.data[key] = value
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)`,
    answer: `<p>The OrderedDict keeps keys from least to most recently used. Reading or writing a key moves it to the end, and eviction removes from the front. Underneath, this is a hash map combined with a doubly linked list, which is exactly what interviewers often ask you to build by hand. Browser caches and CPU caches use the same policy.</p>`,
  },
  {
    slug: 'course-schedule',
    title: 'Course schedule',
    difficulty: 'Hard',
    prompt: `<p>There are <code>n</code> courses numbered 0 to n &minus; 1. Each pair <code>[course, before]</code> means you must take <code>before</code> first. Write <code>can_finish(n, prereqs)</code> that returns whether it is possible to take every course.</p>`,
    example: `can_finish(2, [[1, 0]])            # True
can_finish(2, [[1, 0], [0, 1]])    # False (a cycle)`,
    hint: `<p>This is a directed graph. Repeatedly take any course with no remaining prerequisites. If you get stuck before taking everything, there must be a cycle.</p>`,
    code: `from collections import deque

def can_finish(n, prereqs):
    needs = [0] * n
    unlocks = [[] for _ in range(n)]
    for course, before in prereqs:
        needs[course] += 1
        unlocks[before].append(course)
    ready = deque(c for c in range(n) if needs[c] == 0)
    done = 0
    while ready:
        c = ready.popleft()
        done += 1
        for nxt in unlocks[c]:
            needs[nxt] -= 1
            if needs[nxt] == 0:
                ready.append(nxt)
    return done == n`,
    answer: `<p>This is Kahn's algorithm for topological sorting. <code>needs</code> counts unmet prerequisites; finishing a course unlocks the ones that depended on it. Courses in a cycle never reach zero, so <code>done</code> falls short. O(n + number of prerequisites). Build tools and package managers solve the same problem to order their steps.</p>`,
  },
  {
    slug: 'shortest-path-in-a-grid',
    title: 'Shortest path in a grid',
    difficulty: 'Hard',
    prompt: `<p>A maze is given as a list of strings, where "." is open and "#" is a wall. Moving up, down, left or right, write <code>shortest_path(grid)</code> that returns the fewest steps from the top-left corner to the bottom-right corner, or -1 if there is no way through.</p>`,
    example: `grid = [
    "..#.",
    ".##.",
    "....",
]
shortest_path(grid)   # 5`,
    hint: `<p>Breadth-first search explores every cell 1 step away, then every cell 2 steps away, and so on. The first time it reaches the goal is the shortest route.</p>`,
    code: `from collections import deque

def shortest_path(grid):
    rows, cols = len(grid), len(grid[0])
    if grid[0][0] == "#" or grid[-1][-1] == "#":
        return -1
    dist = {(0, 0): 0}
    queue = deque([(0, 0)])
    while queue:
        r, c = queue.popleft()
        if (r, c) == (rows - 1, cols - 1):
            return dist[(r, c)]
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols:
                if grid[nr][nc] == "." and (nr, nc) not in dist:
                    dist[(nr, nc)] = dist[(r, c)] + 1
                    queue.append((nr, nc))
    return -1`,
    answer: `<p>BFS finds shortest paths whenever every step costs the same. The <code>dist</code> dictionary doubles as the "visited" set, so each cell is queued once: O(rows &times; cols). Depth-first search would find <em>a</em> path, but not necessarily the shortest. When steps have different costs, you need Dijkstra's algorithm instead.</p>`,
  },
  {
    slug: 'dijkstras-algorithm',
    title: 'Dijkstra\'s algorithm',
    difficulty: 'Hard',
    prompt: `<p>A weighted directed graph is stored as a dictionary of dictionaries: <code>graph[a][b]</code> is the cost of the edge from a to b. All costs are non-negative. Write <code>dijkstra(graph, start)</code> that returns the shortest distance from <code>start</code> to every reachable node.</p>`,
    example: `graph = {
    "A": {"B": 4, "C": 1},
    "B": {"D": 1},
    "C": {"B": 2, "D": 5},
    "D": {},
}
dijkstra(graph, "A")
# {"A": 0, "C": 1, "B": 3, "D": 4}`,
    hint: `<p>Always expand the unvisited node with the smallest known distance. A heap (<code>heapq</code>) gives you that node quickly.</p>`,
    code: `import heapq

def dijkstra(graph, start):
    dist = {start: 0}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]:
            continue  # an outdated entry
        for nxt, cost in graph[node].items():
            nd = d + cost
            if nd < dist.get(nxt, float("inf")):
                dist[nxt] = nd
                heapq.heappush(heap, (nd, nxt))
    return dist`,
    answer: `<p>The direct edge A to B costs 4, but A to C to B costs 3, so B's distance is improved after C is processed. Rather than updating entries inside the heap, this version pushes a new entry and skips stale ones when they are popped. Runtime is O((V + E) log V). It needs non-negative costs; with negative edges, use Bellman-Ford. Map apps and network routing are built on this idea.</p>`,
  },
];
