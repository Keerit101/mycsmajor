// Daily problems. One is shown per day, rotating in this order.
// Append new problems at the end. Inserting in the middle reshuffles past days.
//
// Fields:
//   prompt, hint, answer: trusted HTML written by us
//   example, code:        plain code, escaped when rendered

export const problems = [
  {
    id: 1,
    title: 'Reverse the words',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>reverse_words(s)</code> that returns the words of <code>s</code> in reverse order, separated by single spaces. Extra spaces in the input should not matter.</p>`,
    example: `reverse_words("one cs problem")
# "problem cs one"

reverse_words("  hello   world ")
# "world hello"`,
    hint: `<p><code>str.split()</code> with no arguments splits on any run of whitespace and drops empty pieces.</p>`,
    code: `def reverse_words(s):
    return " ".join(s.split()[::-1])`,
    answer: `<p><code>s.split()</code> gives a clean list of words, <code>[::-1]</code> reverses it, and <code>" ".join</code> glues it back with single spaces. Runs in O(n) time.</p>`,
  },
  {
    id: 2,
    title: 'Two sum',
    topic: 'Data structures',
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
    id: 3,
    title: 'Three switches, one bulb',
    topic: 'Logic',
    difficulty: 'Easy',
    prompt: `<p>Outside a closed room are three light switches. Inside the room is one ordinary bulb, wired to exactly one of the switches. You can flip the switches as much as you like, but you may enter the room only once.</p><p>How do you find out which switch controls the bulb?</p>`,
    hint: `<p>A bulb gives you more than one piece of information. Light is one. What else does a bulb produce?</p>`,
    answer: `<p>Turn switch 1 on and wait ten minutes. Turn it off, turn switch 2 on, then enter the room.</p><ul><li>Bulb on: switch 2.</li><li>Bulb off but warm: switch 1.</li><li>Bulb off and cold: switch 3.</li></ul><p>The trick is using a second signal, heat, to get three outcomes from one observation.</p>`,
  },
  {
    id: 4,
    title: 'FizzBuzz, as a list',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>fizzbuzz(n)</code> that returns a list of strings for the numbers 1 to <code>n</code>. Multiples of 3 become <code>"Fizz"</code>, multiples of 5 become <code>"Buzz"</code>, multiples of both become <code>"FizzBuzz"</code>, and everything else is the number as a string.</p>`,
    example: `fizzbuzz(5)
# ["1", "2", "Fizz", "4", "Buzz"]`,
    hint: `<p>Build the word by adding "Fizz" and "Buzz" separately. If the word is still empty, use the number.</p>`,
    code: `def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        word = ""
        if i % 3 == 0:
            word += "Fizz"
        if i % 5 == 0:
            word += "Buzz"
        out.append(word or str(i))
    return out`,
    answer: `<p>Building the word up avoids a separate check for 15, and <code>word or str(i)</code> falls back to the number when the word is empty. This version is easy to extend: adding "Bazz" for 7 is one more <code>if</code>.</p>`,
  },
  {
    id: 5,
    title: 'Balanced brackets',
    topic: 'Data structures',
    difficulty: 'Easy',
    prompt: `<p>Write <code>is_balanced(s)</code> that returns <code>True</code> if every bracket in <code>s</code> is closed by the same type of bracket in the right order. The string contains only <code>()[]{}</code>.</p>`,
    example: `is_balanced("([]{})")  # True
is_balanced("([)]")  # False
is_balanced("((")  # False`,
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
    id: 6,
    title: '100 lockers',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>A hallway has 100 closed lockers, numbered 1 to 100. Student 1 opens every locker. Student 2 toggles every 2nd locker (closing it if open, opening it if closed). Student 3 toggles every 3rd locker, and so on, up to student 100.</p><p>Which lockers are open at the end, and how many are there?</p>`,
    hint: `<p>Locker <em>n</em> is toggled once for every divisor of <em>n</em>. Which numbers have an odd number of divisors?</p>`,
    answer: `<p>The perfect squares stay open: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. That is <strong>10 lockers</strong>.</p><p>Divisors come in pairs (for 12: 1 and 12, 2 and 6, 3 and 4), so most numbers have an even count and end up closed. A perfect square has one divisor paired with itself (6 &times; 6 = 36), giving an odd count, so it ends up open.</p>`,
  },
  {
    id: 7,
    title: 'Most common character',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>most_common_char(s)</code> that returns the character appearing most often in a non-empty string. If there is a tie, return the one that appears first in the string.</p>`,
    example: `most_common_char("banana")  # "a"
most_common_char("abba")  # "a"`,
    hint: `<p>Count first, then walk the original string from the left to settle ties.</p>`,
    code: `from collections import Counter

def most_common_char(s):
    counts = Counter(s)
    best = max(counts.values())
    for ch in s:
        if counts[ch] == best:
            return ch`,
    answer: `<p><code>Counter</code> builds the counts in one pass. Scanning <code>s</code> from the left then finds the first character with the top count, which handles ties correctly. O(n) time.</p>`,
  },
  {
    id: 8,
    title: 'Reverse a linked list',
    topic: 'Data structures',
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
    id: 9,
    title: 'Guess the number',
    topic: 'Logic',
    difficulty: 'Easy',
    prompt: `<p>I am thinking of a whole number from 1 to 1000. After each guess I tell you "higher", "lower" or "correct".</p><p>With the best strategy, what is the maximum number of guesses you could need?</p>`,
    hint: `<p>Each guess should cut the remaining range in half. How many times can you halve 1000 before only one number is left?</p>`,
    answer: `<p><strong>10 guesses.</strong></p><p>With <em>k</em> guesses, binary search can tell apart at most 2<sup><em>k</em></sup> &minus; 1 numbers. 2<sup>9</sup> &minus; 1 = 511 is too few, while 2<sup>10</sup> &minus; 1 = 1023 covers all 1000. This is why binary search is O(log n).</p>`,
  },
  {
    id: 10,
    title: 'Real palindromes',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>is_palindrome(s)</code> that ignores case, spaces and punctuation, and returns <code>True</code> if the letters and digits read the same forwards and backwards.</p>`,
    example: `is_palindrome("A man, a plan, a canal: Panama")
# True

is_palindrome("race a car")
# False`,
    hint: `<p>Clean the string first with <code>str.isalnum()</code> and <code>str.lower()</code>, then compare it with its reverse.</p>`,
    code: `def is_palindrome(s):
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]`,
    answer: `<p>Filtering down to lowercase letters and digits turns the messy input into a plain sequence, then a reversed comparison does the rest. O(n) time. A two-pointer version can do it in O(1) extra space if memory matters.</p>`,
  },
  {
    id: 11,
    title: 'Queue from two stacks',
    topic: 'Data structures',
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
    id: 12,
    title: 'Burning ropes',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>You have two ropes and a lighter. Each rope takes exactly 60 minutes to burn from one end to the other, but they burn unevenly, so half a rope does not take 30 minutes.</p><p>How do you measure exactly 45 minutes?</p>`,
    hint: `<p>Lighting a rope at both ends makes it burn out in exactly half the time, however uneven it is.</p>`,
    answer: `<ol><li>Light rope A at both ends and rope B at one end, at the same time.</li><li>Rope A burns out after exactly 30 minutes. Rope B now has 30 minutes left.</li><li>Light the other end of rope B. It burns out in 15 more minutes.</li></ol><p>30 + 15 = <strong>45 minutes</strong>.</p>`,
  },
  {
    id: 13,
    title: 'Flatten a nested list',
    topic: 'Python',
    difficulty: 'Medium',
    prompt: `<p>Write <code>flatten(items)</code> that takes a list which may contain other lists, nested to any depth, and returns one flat list of all the non-list values in order.</p>`,
    example: `flatten([1, [2, [3, 4]], [], 5])
# [1, 2, 3, 4, 5]`,
    hint: `<p>A list of lists is the same problem, just smaller. Use recursion, and check each item with <code>isinstance(x, list)</code>.</p>`,
    code: `def flatten(items):
    out = []
    for x in items:
        if isinstance(x, list):
            out.extend(flatten(x))
        else:
            out.append(x)
    return out`,
    answer: `<p>Each item is either a value (keep it) or a list (flatten it and add the results). Every value is visited once, so it runs in O(n) time for n total values. Very deep nesting can hit Python's recursion limit, around 1000 levels.</p>`,
  },
  {
    id: 14,
    title: 'The missing number',
    topic: 'Data structures',
    difficulty: 'Easy',
    prompt: `<p>A list contains <code>n</code> distinct numbers taken from the range 0 to <code>n</code>, so exactly one number in that range is missing. Find it in O(n) time and O(1) extra space.</p>`,
    example: `missing([3, 0, 1])  # 2
missing([0, 1])  # 2
missing([9,6,4,2,3,5,7,0,1])  # 8`,
    hint: `<p>You know what 0 + 1 + ... + n adds up to without looking at the list.</p>`,
    code: `def missing(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
    answer: `<p>The full range sums to n(n+1)/2. Subtract what is actually there and the difference is the missing number. Another way: XOR every index and value together, and the pairs cancel out, leaving the missing number.</p>`,
  },
  {
    id: 15,
    title: 'Two guards, two doors',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>Two doors: one leads out, one leads to a dead end. Each door has a guard. One guard always tells the truth and the other always lies, but you do not know which is which.</p><p>You may ask one guard one yes-or-no or "which door" question. What do you ask?</p>`,
    hint: `<p>Make your question pass through both guards, so the truth and the lie are both applied.</p>`,
    answer: `<p>Ask either guard: <em>"If I asked the other guard which door leads out, which door would they point to?"</em> Then take the <strong>other</strong> door.</p><p>If you asked the truth-teller, they honestly report the liar's wrong answer. If you asked the liar, they lie about the truth-teller's right answer. Either way you hear the wrong door.</p>`,
  },
  {
    id: 16,
    title: 'Remove duplicates, keep order',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>dedupe(items)</code> that removes duplicates from a list while keeping the first occurrence of each item in its original order.</p>`,
    example: `dedupe([3, 1, 3, 2, 1])
# [3, 1, 2]`,
    hint: `<p><code>set(items)</code> removes duplicates but loses the order. Since Python 3.7, dictionaries keep insertion order.</p>`,
    code: `def dedupe(items):
    return list(dict.fromkeys(items))`,
    answer: `<p><code>dict.fromkeys</code> keeps only the first time each key is inserted, and dicts remember insertion order. The long version is a loop with a <code>seen</code> set. Both run in O(n) time and need the items to be hashable.</p>`,
  },
  {
    id: 17,
    title: 'Does the list loop?',
    topic: 'Data structures',
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
    id: 18,
    title: 'Count the loop',
    topic: 'Logic',
    difficulty: 'Easy',
    prompt: `<p>After this code runs, what is the exact value of <code>count</code> in terms of <code>n</code>, and what is the Big-O running time?</p>`,
    example: `count = 0
for i in range(n):
    for j in range(i, n):
        count += 1`,
    hint: `<p>When <code>i = 0</code> the inner loop runs <code>n</code> times. When <code>i = n - 1</code> it runs once. Add those up.</p>`,
    answer: `<p><code>count</code> = n + (n &minus; 1) + ... + 1 = <strong>n(n + 1) / 2</strong>.</p><p>That is about n<sup>2</sup>/2, and Big-O drops constant factors, so the running time is <strong>O(n<sup>2</sup>)</strong>. Starting the inner loop at <code>i</code> halves the work but does not change the growth rate.</p>`,
  },
  {
    id: 19,
    title: 'The default argument trap',
    topic: 'Python',
    difficulty: 'Medium',
    prompt: `<p>What does this print, and why? How would you fix it?</p>`,
    example: `def add(item, bucket=[]):
    bucket.append(item)
    return bucket

print(add(1))
print(add(2))`,
    hint: `<p>Default values are evaluated once, when the <code>def</code> line runs, not on every call.</p>`,
    code: `# Prints:
# [1]
# [1, 2]

def add(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket`,
    answer: `<p>The same list object is shared by every call that uses the default, so it keeps growing. Use <code>None</code> as the default and create a fresh list inside the function.</p>`,
  },
  {
    id: 20,
    title: 'Group the anagrams',
    topic: 'Data structures',
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
    id: 21,
    title: 'Bit strings with three ones',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>How many 8-bit strings (like <code>01101000</code>) contain exactly three <code>1</code>s?</p>`,
    hint: `<p>You are choosing which 3 of the 8 positions hold a 1. Order of choosing does not matter.</p>`,
    answer: `<p><strong>56.</strong></p><p>That is "8 choose 3" = 8! / (3! &middot; 5!) = (8 &times; 7 &times; 6) / (3 &times; 2 &times; 1) = 56. In Python: <code>math.comb(8, 3)</code>.</p>`,
  },
  {
    id: 22,
    title: 'Transpose a matrix',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>transpose(m)</code> that turns the rows of a rectangular list-of-lists into columns.</p>`,
    example: `transpose([[1, 2, 3],
           [4, 5, 6]])
# [[1, 4], [2, 5], [3, 6]]`,
    hint: `<p><code>zip(*m)</code> passes each row as a separate argument to <code>zip</code>.</p>`,
    code: `def transpose(m):
    return [list(col) for col in zip(*m)]`,
    answer: `<p><code>zip</code> pairs up the first items of every row, then the second items, and so on, which is exactly a column. Each column comes back as a tuple, so <code>list(col)</code> converts it.</p>`,
  },
  {
    id: 23,
    title: 'Binary search, by hand',
    topic: 'Data structures',
    difficulty: 'Easy',
    prompt: `<p>Write <code>search(nums, target)</code> that returns the index of <code>target</code> in a sorted list, or <code>-1</code> if it is not there. It must run in O(log n). No <code>bisect</code>.</p>`,
    example: `search([1, 3, 5, 7, 9], 7)  # 3
search([1, 3, 5, 7, 9], 4)  # -1`,
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
    id: 24,
    title: 'Socks in the dark',
    topic: 'Logic',
    difficulty: 'Easy',
    prompt: `<p>A drawer holds 10 black socks and 10 white socks. The room is dark.</p><ol><li>How many socks must you take to be sure of a matching pair?</li><li>How many to be sure of a <em>black</em> pair?</li></ol>`,
    hint: `<p>Think about the worst possible luck. This is the pigeonhole principle.</p>`,
    answer: `<ol><li><strong>3.</strong> With only two colours, three socks cannot all be different.</li><li><strong>12.</strong> In the worst case the first 10 are all white, and you then need 2 black ones.</li></ol>`,
  },
  {
    id: 25,
    title: 'Run-length encoding',
    topic: 'Python',
    difficulty: 'Medium',
    prompt: `<p>Write <code>rle(s)</code> that compresses runs of repeated characters into the character followed by the run length.</p>`,
    example: `rle("aaabcc")  # "a3b1c2"
rle("")  # ""`,
    hint: `<p><code>itertools.groupby</code> groups consecutive equal items for you.</p>`,
    code: `from itertools import groupby

def rle(s):
    return "".join(
        f"{ch}{len(list(run))}"
        for ch, run in groupby(s)
    )`,
    answer: `<p><code>groupby</code> yields each character with an iterator over its run, so counting the run gives the length. O(n) time. Doing it with a manual loop and a counter is a good exercise too. Watch the last run, which is where most hand-written versions slip.</p>`,
  },
  {
    id: 26,
    title: 'Depth of a binary tree',
    topic: 'Data structures',
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
    id: 27,
    title: 'Monty Hall',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>A game show has three doors. Behind one is a car; behind the other two are goats. You pick a door. The host, who knows where the car is, opens one of the other two doors to show a goat, then offers you the chance to switch.</p><p>Should you switch? What are your chances each way?</p>`,
    hint: `<p>What was the chance that your first pick was wrong? The host never reveals the car.</p>`,
    answer: `<p><strong>Switch.</strong> Sticking wins 1/3 of the time; switching wins 2/3.</p><p>Your first pick is wrong 2/3 of the time. In those cases the host must open the only other goat door, so the remaining door is the car. Try it: simulating 10,000 games in Python is a nice ten-line exercise.</p>`,
  },
  {
    id: 28,
    title: 'Fast Fibonacci',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>The naive recursive Fibonacci makes an exponential number of calls. Write <code>fib(n)</code> that returns the nth Fibonacci number (with <code>fib(0) = 0</code> and <code>fib(1) = 1</code>) in O(n) time.</p>`,
    example: `fib(10)  # 55
fib(50)  # 12586269025`,
    hint: `<p>You only ever need the last two values.</p>`,
    code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    answer: `<p>Tuple assignment updates both values at once, so there is no temporary variable. O(n) time, O(1) space. Python integers never overflow, so <code>fib(1000)</code> works too.</p>`,
  },
  {
    id: 29,
    title: 'Merge two sorted lists',
    topic: 'Data structures',
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
    id: 30,
    title: 'Find the heavy ball',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>You have 9 identical-looking balls. One is slightly heavier than the rest. Using a balance scale, what is the fewest weighings that always finds the heavy ball? How?</p>`,
    hint: `<p>A balance has three outcomes, not two: left heavier, right heavier, or level.</p>`,
    answer: `<p><strong>2 weighings.</strong></p><ol><li>Weigh 3 balls against 3. If one side is heavier, the ball is in that group. If they balance, it is in the 3 you left out.</li><li>From that group of 3, weigh 1 against 1. The heavier side is the answer; if level, it is the third ball.</li></ol><p>Each weighing divides the options by 3, so k weighings handle up to 3<sup>k</sup> balls.</p>`,
  },
  {
    id: 31,
    title: 'The copied grid',
    topic: 'Python',
    difficulty: 'Medium',
    prompt: `<p>What does this print, and why? Fix it so only one cell changes.</p>`,
    example: `grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)`,
    hint: `<p><code>* 3</code> on a list copies references, not the objects they point to.</p>`,
    code: `# Prints:
# [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
# [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
    answer: `<p>The outer <code>* 3</code> makes three references to the <em>same</em> inner list, so changing it through any row changes "all" of them. The list comprehension creates a new inner list on each pass. <code>[0] * 3</code> itself is fine because integers are immutable.</p>`,
  },
  {
    id: 32,
    title: 'First unique character',
    topic: 'Data structures',
    difficulty: 'Easy',
    prompt: `<p>Write <code>first_unique(s)</code> that returns the index of the first character that appears exactly once in <code>s</code>, or <code>-1</code> if there is none.</p>`,
    example: `first_unique("leetcode")  # 0
first_unique("loveleetcode")  # 2
first_unique("aabb")  # -1`,
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
    id: 33,
    title: 'Tower of Hanoi',
    topic: 'Logic',
    difficulty: 'Medium',
    prompt: `<p>In the Tower of Hanoi you move a stack of disks from one peg to another, one disk at a time, never placing a larger disk on a smaller one. There are three pegs.</p><p>What is the minimum number of moves for 5 disks? What about n disks?</p>`,
    hint: `<p>To move the biggest disk, the other n &minus; 1 disks must first be out of the way on the spare peg, and afterwards they must be moved back on top.</p>`,
    answer: `<p><strong>31 moves</strong> for 5 disks, and <strong>2<sup>n</sup> &minus; 1</strong> in general.</p><p>Moves(n) = Moves(n &minus; 1) + 1 + Moves(n &minus; 1) = 2 &middot; Moves(n &minus; 1) + 1, with Moves(1) = 1. That gives 1, 3, 7, 15, 31. It is a classic example of exponential growth from a simple recursion.</p>`,
  },
  {
    id: 34,
    title: 'Top k frequent',
    topic: 'Data structures',
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
    id: 35,
    title: 'Rotate a list',
    topic: 'Python',
    difficulty: 'Easy',
    prompt: `<p>Write <code>rotate(xs, k)</code> that returns a new list rotated <code>k</code> steps to the right. <code>k</code> may be larger than the list, and the list may be empty.</p>`,
    example: `rotate([1, 2, 3, 4, 5], 2)  # [4, 5, 1, 2, 3]
rotate([1, 2, 3], 7)  # [3, 1, 2]
rotate([], 4)  # []`,
    hint: `<p>Rotating by the list length changes nothing, so reduce <code>k</code> with <code>%</code>. Watch out for dividing by zero.</p>`,
    code: `def rotate(xs, k):
    if not xs:
        return []
    k %= len(xs)
    return xs[-k:] + xs[:-k]`,
    answer: `<p>The last <code>k</code> items move to the front. The empty check avoids <code>k % 0</code>. When <code>k</code> is 0, <code>xs[-0:]</code> is the whole list and <code>xs[:-0]</code> is empty, so the result is still correct.</p>`,
  },
  {
    id: 36,
    title: '25 horses',
    topic: 'Logic',
    difficulty: 'Hard',
    prompt: `<p>You have 25 horses and a track that races 5 at a time. There is no stopwatch: each race only tells you the finishing order of those 5. Horses always run at the same speed.</p><p>What is the fewest races needed to find the 3 fastest horses, in order?</p>`,
    hint: `<p>Start with 5 heats and one race of the heat winners. After that, which horses can still be in the top 3?</p>`,
    answer: `<p><strong>7 races.</strong></p><ol><li>Races 1 to 5: race every group of 5.</li><li>Race 6: race the five group winners. The winner of this race is the fastest horse overall.</li><li>Label the race 6 finishers A, B, C (1st to 3rd). Only five horses can still be 2nd or 3rd overall: A's group 2nd and 3rd place, B and B's group 2nd place, and C.</li><li>Race 7: race those five. The top two are 2nd and 3rd overall.</li></ol>`,
  },
];

// Rotation starts on this date (local time). Day 0 shows problems[0].
const EPOCH = new Date(2026, 0, 1);
const DAY_MS = 24 * 60 * 60 * 1000;

export function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Whole calendar days since EPOCH, safe across daylight-saving changes.
export function dayIndex(date) {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const epoch = Date.UTC(EPOCH.getFullYear(), EPOCH.getMonth(), EPOCH.getDate());
  return Math.floor((utc - epoch) / DAY_MS);
}

export function problemFor(date) {
  const n = problems.length;
  return problems[((dayIndex(date) % n) + n) % n];
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
