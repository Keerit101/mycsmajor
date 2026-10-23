// Python problems, ordered from easiest to hardest.
// See src/data/problems.js for how problems are scheduled and what each field means.

export default [
  {
    slug: 'reverse-the-words',
    title: 'Reverse the words',
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
    slug: 'fizzbuzz-as-a-list',
    title: 'FizzBuzz, as a list',
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
    slug: 'sum-of-digits',
    title: 'Sum of the digits',
    difficulty: 'Easy',
    prompt: `<p>Write <code>digit_sum(n)</code> that returns the sum of the digits of the integer <code>n</code>. Negative numbers should work too.</p>`,
    example: `digit_sum(4096)   # 19
digit_sum(-25)    # 7
digit_sum(0)      # 0`,
    hint: `<p><code>n % 10</code> is the last digit of <code>n</code>, and <code>n // 10</code> drops it.</p>`,
    code: `def digit_sum(n):
    n = abs(n)
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`,
    answer: `<p>Each loop peels off the last digit with <code>% 10</code> and removes it with <code>// 10</code>. <code>abs</code> handles negatives. The one-line version is <code>sum(int(d) for d in str(abs(n)))</code>, which is fine too. Both are O(number of digits).</p>`,
  },
  {
    slug: 'running-total',
    title: 'Running total',
    difficulty: 'Easy',
    prompt: `<p>Write <code>running_total(nums)</code> that returns a new list where each item is the sum of all items up to and including that position.</p>`,
    example: `running_total([1, 2, 3, 4])   # [1, 3, 6, 10]
running_total([5, -2, 7])     # [5, 3, 10]
running_total([])             # []`,
    hint: `<p>Keep one variable holding the total so far, and append it after each step.</p>`,
    code: `def running_total(nums):
    out = []
    total = 0
    for n in nums:
        total += n
        out.append(total)
    return out`,
    answer: `<p>This is the accumulator pattern: one pass, O(n) time. The standard library has it built in as <code>list(itertools.accumulate(nums))</code>. Running totals (also called prefix sums) are a key trick for answering "sum of a range" questions quickly.</p>`,
  },
  {
    slug: 'capitalise-each-word',
    title: 'Capitalise each word',
    difficulty: 'Easy',
    prompt: `<p>Write <code>capitalise_words(s)</code> that makes the first letter of every word upper case and leaves the rest of each word as it is. Words are separated by spaces.</p>`,
    example: `capitalise_words("hello wide world")
# "Hello Wide World"

capitalise_words("they're here")
# "They're Here"`,
    hint: `<p>Try <code>"they're here".title()</code> first and look closely at the result. Then build each word yourself from <code>w[:1].upper()</code> and <code>w[1:]</code>.</p>`,
    code: `def capitalise_words(s):
    return " ".join(w[:1].upper() + w[1:] for w in s.split(" "))`,
    answer: `<p><code>str.title()</code> treats an apostrophe as the end of a word, so it gives <code>"They'Re Here"</code>. Building each word by hand avoids that. <code>w[:1]</code> is safe on empty strings (unlike <code>w[0]</code>), and splitting on <code>" "</code> rather than any whitespace keeps the original spacing.</p>`,
  },
  {
    slug: 'real-palindromes',
    title: 'Real palindromes',
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
    slug: 'is-it-an-anagram',
    title: 'Is it an anagram?',
    difficulty: 'Easy',
    prompt: `<p>Write <code>is_anagram(a, b)</code> that returns <code>True</code> if the two strings use exactly the same letters the same number of times, ignoring spaces and case.</p>`,
    example: `is_anagram("Listen", "Silent")          # True
is_anagram("Dormitory", "dirty room")   # True
is_anagram("abc", "abd")                # False`,
    hint: `<p>Two anagrams look identical once you clean them up and sort their letters.</p>`,
    code: `def is_anagram(a, b):
    def letters(s):
        return sorted(s.replace(" ", "").lower())
    return letters(a) == letters(b)`,
    answer: `<p>Sorting puts the letters in a standard order, so anagrams become equal lists. That is O(n log n). Comparing <code>collections.Counter</code> objects instead is O(n), because it only counts letters.</p>`,
  },
  {
    slug: 'most-common-character',
    title: 'Most common character',
    difficulty: 'Easy',
    prompt: `<p>Write <code>most_common_char(s)</code> that returns the character appearing most often in a non-empty string. If there is a tie, return the one that appears first in the string.</p>`,
    example: `most_common_char("banana")   # "a"
most_common_char("abba")     # "a"`,
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
    slug: 'count-the-words',
    title: 'Count the words',
    difficulty: 'Easy',
    prompt: `<p>Write <code>word_counts(text)</code> that returns a dictionary mapping each word to how many times it appears. Treat upper and lower case as the same word.</p>`,
    example: `word_counts("To be or not to be")
# {"to": 2, "be": 2, "or": 1, "not": 1}`,
    hint: `<p><code>d.get(key, 0)</code> returns 0 when the key is not in the dictionary yet.</p>`,
    code: `def word_counts(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`,
    answer: `<p>Lower-casing first makes "To" and "to" the same key. <code>get</code> with a default avoids a special case for new words. <code>collections.Counter(text.lower().split())</code> does the same in one line.</p>`,
  },
  {
    slug: 'remove-duplicates-keep-order',
    title: 'Remove duplicates, keep order',
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
    slug: 'transpose-a-matrix',
    title: 'Transpose a matrix',
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
    slug: 'fast-fibonacci',
    title: 'Fast Fibonacci',
    difficulty: 'Easy',
    prompt: `<p>The naive recursive Fibonacci makes an exponential number of calls. Write <code>fib(n)</code> that returns the nth Fibonacci number (with <code>fib(0) = 0</code> and <code>fib(1) = 1</code>) in O(n) time.</p>`,
    example: `fib(10)   # 55
fib(50)   # 12586269025`,
    hint: `<p>You only ever need the last two values.</p>`,
    code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    answer: `<p>Tuple assignment updates both values at once, so there is no temporary variable. O(n) time, O(1) space. Python integers never overflow, so <code>fib(1000)</code> works too.</p>`,
  },
  {
    slug: 'rotate-a-list',
    title: 'Rotate a list',
    difficulty: 'Easy',
    prompt: `<p>Write <code>rotate(xs, k)</code> that returns a new list rotated <code>k</code> steps to the right. <code>k</code> may be larger than the list, and the list may be empty.</p>`,
    example: `rotate([1, 2, 3, 4, 5], 2)   # [4, 5, 1, 2, 3]
rotate([1, 2, 3], 7)         # [3, 1, 2]
rotate([], 4)                # []`,
    hint: `<p>Rotating by the list length changes nothing, so reduce <code>k</code> with <code>%</code>. Watch out for dividing by zero.</p>`,
    code: `def rotate(xs, k):
    if not xs:
        return []
    k %= len(xs)
    return xs[-k:] + xs[:-k]`,
    answer: `<p>The last <code>k</code> items move to the front. The empty check avoids <code>k % 0</code>. When <code>k</code> is 0, <code>xs[-0:]</code> is the whole list and <code>xs[:-0]</code> is empty, so the result is still correct.</p>`,
  },
  {
    slug: 'chunk-a-list',
    title: 'Chunk a list',
    difficulty: 'Medium',
    prompt: `<p>Write <code>chunks(xs, n)</code> that splits a list into pieces of length <code>n</code>. The last piece may be shorter.</p>`,
    example: `chunks([1, 2, 3, 4, 5], 2)   # [[1, 2], [3, 4], [5]]
chunks([1, 2, 3], 5)         # [[1, 2, 3]]
chunks([], 3)                # []`,
    hint: `<p><code>range(0, len(xs), n)</code> gives you the start index of every chunk. Slicing past the end of a list is not an error.</p>`,
    code: `def chunks(xs, n):
    return [xs[i:i + n] for i in range(0, len(xs), n)]`,
    answer: `<p>Each start index jumps by <code>n</code>, and the slice <code>xs[i:i + n]</code> quietly stops at the end of the list, which handles the short last chunk. Python 3.12 added <code>itertools.batched(xs, n)</code>, which does the same but gives tuples.</p>`,
  },
  {
    slug: 'flatten-a-nested-list',
    title: 'Flatten a nested list',
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
    slug: 'the-default-argument-trap',
    title: 'The default argument trap',
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
    slug: 'the-copied-grid',
    title: 'The copied grid',
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
    slug: 'run-length-encoding',
    title: 'Run-length encoding',
    difficulty: 'Medium',
    prompt: `<p>Write <code>rle(s)</code> that compresses runs of repeated characters into the character followed by the run length.</p>`,
    example: `rle("aaabcc")   # "a3b1c2"
rle("")         # ""`,
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
    slug: 'caesar-cipher',
    title: 'Caesar cipher',
    difficulty: 'Medium',
    prompt: `<p>Write <code>caesar(s, k)</code> that shifts every English letter <code>k</code> places along the alphabet, wrapping from z back to a. Keep upper and lower case, and leave everything else unchanged. <code>k</code> may be negative.</p>`,
    example: `caesar("Hello, World!", 3)   # "Khoor, Zruog!"
caesar("abc", -1)            # "zab"`,
    hint: `<p><code>ord("a")</code> is 97 and <code>chr(97)</code> is "a". Convert each letter to a number from 0 to 25, add <code>k</code>, and use <code>% 26</code> to wrap.</p>`,
    code: `def caesar(s, k):
    out = []
    for ch in s:
        if ch.isascii() and ch.isalpha():
            base = ord("A") if ch.isupper() else ord("a")
            out.append(chr((ord(ch) - base + k) % 26 + base))
        else:
            out.append(ch)
    return "".join(out)`,
    answer: `<p>Subtracting <code>base</code> maps a letter to 0 to 25, and <code>% 26</code> wraps it, even for negative shifts, because Python's <code>%</code> always returns a non-negative result here. Decoding is just <code>caesar(s, -k)</code>.</p><p>Do not use this to protect anything: there are only 26 possible keys, so trying them all takes a computer no time.</p>`,
  },
  {
    slug: 'invert-a-dictionary',
    title: 'Invert a dictionary',
    difficulty: 'Medium',
    prompt: `<p>Write <code>invert(d)</code> that swaps keys and values. Several keys can share a value, so each new value should be a list of the original keys, in their original order.</p>`,
    example: `invert({"ada": "CS", "linus": "CS", "grace": "Math"})
# {"CS": ["ada", "linus"], "Math": ["grace"]}`,
    hint: `<p><code>d.setdefault(key, [])</code> returns the list stored under <code>key</code>, creating an empty one first if needed.</p>`,
    code: `def invert(d):
    out = {}
    for key, value in d.items():
        out.setdefault(value, []).append(key)
    return out`,
    answer: `<p>A plain swap like <code>{v: k for k, v in d.items()}</code> silently loses keys that share a value, because later ones overwrite earlier ones. Grouping into lists keeps them all. <code>collections.defaultdict(list)</code> is another clean way to write it. The values must be hashable to become keys.</p>`,
  },
  {
    slug: 'removing-while-looping',
    title: 'Removing while looping',
    difficulty: 'Medium',
    prompt: `<p>This code is meant to remove every 2 from the list. What does it actually print, and why? Fix it.</p>`,
    example: `nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)
print(nums)`,
    hint: `<p>A <code>for</code> loop over a list walks through index 0, 1, 2 and so on. What happens to the index of every later item when you remove one?</p>`,
    code: `# Prints:
# [1, 2, 3]

nums = [1, 2, 2, 3]
nums = [n for n in nums if n != 2]
print(nums)  # [1, 3]`,
    answer: `<p>At index 1 the loop finds a 2 and removes it. Everything shifts left, so the second 2 moves into index 1, which the loop has already visited. The loop moves on to index 2 (now the 3) and never sees it.</p><p>Do not change a list's length while looping over it. Build a new list instead, or loop over a copy with <code>for n in nums[:]</code>.</p>`,
  },
  {
    slug: 'late-binding-lambdas',
    title: 'Late-binding lambdas',
    difficulty: 'Medium',
    prompt: `<p>What does this print? Most people expect <code>[0, 1, 2]</code>. Explain the real output and fix it.</p>`,
    example: `funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])`,
    hint: `<p>A lambda does not copy <code>i</code> when it is created. It looks <code>i</code> up when it is called.</p>`,
    code: `# Prints:
# [2, 2, 2]

funcs = [lambda i=i: i for i in range(3)]
print([f() for f in funcs])  # [0, 1, 2]`,
    answer: `<p>All three lambdas refer to the same variable <code>i</code>. By the time any of them runs, the loop has finished and <code>i</code> is 2. This is called late binding, and it applies to functions defined with <code>def</code> inside loops too.</p><p>A default argument is evaluated when the lambda is created, so <code>i=i</code> captures the current value.</p>`,
  },
  {
    slug: 'sieve-of-eratosthenes',
    title: 'Sieve of Eratosthenes',
    difficulty: 'Medium',
    prompt: `<p>Write <code>primes_up_to(n)</code> that returns every prime number up to and including <code>n</code>. Do not test each number for divisors one at a time: use the sieve of Eratosthenes.</p>`,
    example: `primes_up_to(30)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

primes_up_to(1)   # []`,
    hint: `<p>Start with a list of <code>True</code> values. For each prime <code>p</code>, cross out (set to <code>False</code>) every multiple of <code>p</code>. You can start crossing out at <code>p * p</code>.</p>`,
    code: `def primes_up_to(n):
    if n < 2:
        return []
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for m in range(p * p, n + 1, p):
                is_prime[m] = False
        p += 1
    return [i for i, ok in enumerate(is_prime) if ok]`,
    answer: `<p>Any smaller multiple of <code>p</code>, such as <code>3p</code>, was already crossed out by a smaller prime, so crossing out starts at <code>p * p</code>, and the outer loop can stop once <code>p * p &gt; n</code>. The sieve runs in O(n log log n) time, which is close to linear.</p>`,
  },
  {
    slug: 'roman-numerals',
    title: 'Roman numerals',
    difficulty: 'Medium',
    prompt: `<p>Write <code>to_roman(n)</code> that converts a whole number from 1 to 3999 into Roman numerals.</p>`,
    example: `to_roman(4)      # "IV"
to_roman(1994)   # "MCMXCIV"
to_roman(2026)   # "MMXXVI"`,
    hint: `<p>Include the subtractive pairs (CM, CD, XC, XL, IX, IV) in your table of values. Then always take the largest value that still fits.</p>`,
    code: `def to_roman(n):
    table = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ]
    out = ""
    for value, letters in table:
        while n >= value:
            out += letters
            n -= value
    return out`,
    answer: `<p>This is a greedy algorithm: at each step take the biggest symbol that fits. Greedy only works because the table includes the special pairs like 900 and 4. Without them, 4 would come out as "IIII". Making change with coins works the same way.</p>`,
  },
  {
    slug: 'memoize-decorator',
    title: 'Write a memoize decorator',
    difficulty: 'Hard',
    prompt: `<p>The recursive <code>fib</code> below is far too slow for <code>n = 80</code>. Write a decorator <code>memoize</code> that caches results, so the same code returns instantly.</p>`,
    example: `@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(80)   # 23416728348467685`,
    hint: `<p>A decorator is a function that takes a function and returns a new one. Give the new function a dictionary that maps arguments to results.</p>`,
    code: `def memoize(fn):
    cache = {}

    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]

    return wrapper`,
    answer: `<p><code>@memoize</code> means <code>fib = memoize(fib)</code>, so the name <code>fib</code> now refers to <code>wrapper</code>. That matters: the recursive calls inside <code>fib</code> also go through the cache. Each value is computed once, turning exponential time into O(n).</p><p>The arguments are tuple keys, so they must be hashable. In real code use <code>functools.cache</code>, and add <code>functools.wraps(fn)</code> to keep the original function's name and docstring.</p>`,
  },
  {
    slug: 'flatten-a-dictionary',
    title: 'Flatten a dictionary',
    difficulty: 'Hard',
    prompt: `<p>Write <code>flatten_dict(d)</code> that turns nested dictionaries into a single level, joining the keys on the path with dots.</p>`,
    example: `flatten_dict({"a": 1, "b": {"c": 2, "d": {"e": 3}}})
# {"a": 1, "b.c": 2, "b.d.e": 3}`,
    hint: `<p>Recurse into any value that is itself a dictionary, passing along the key path built so far.</p>`,
    code: `def flatten_dict(d, prefix=""):
    out = {}
    for key, value in d.items():
        name = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            out.update(flatten_dict(value, name))
        else:
            out[name] = value
    return out`,
    answer: `<p>Each call handles one level and hands nested dictionaries to a recursive call with a longer prefix. Every value is visited once. Two edge cases are worth knowing: an empty nested dictionary disappears completely, and keys that already contain dots become ambiguous. This shape comes up constantly when turning JSON into table columns.</p>`,
  },
  {
    slug: 'all-subsets',
    title: 'All subsets',
    difficulty: 'Hard',
    prompt: `<p>Write <code>subsets(xs)</code> that returns every subset of a list of distinct items (its power set), without using <code>itertools</code>.</p>`,
    example: `subsets([1, 2, 3])
# [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]`,
    hint: `<p>Start with just the empty subset. For each new item, every subset you already have can either leave it out or take it.</p>`,
    code: `def subsets(xs):
    result = [[]]
    for x in xs:
        result += [s + [x] for s in result]
    return result`,
    answer: `<p>Each item doubles the number of subsets, so a list of n items has 2<sup>n</sup> subsets, and any algorithm that lists them all takes at least that long. This is why brute-force "try every combination" solutions stop working beyond about 25 items.</p><p>Another way to see it: count from 0 to 2<sup>n</sup> &minus; 1 in binary, and each bit says whether to include one item.</p>`,
  },
  {
    slug: 'spiral-order',
    title: 'Spiral order',
    difficulty: 'Hard',
    prompt: `<p>Write <code>spiral(m)</code> that returns the items of a rectangular matrix in clockwise spiral order, starting at the top left. Do not change the matrix you were given.</p>`,
    example: `spiral([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])
# [1, 2, 3, 6, 9, 8, 7, 4, 5]`,
    hint: `<p>Take the top row. Then rotate what is left a quarter turn anticlockwise, so the next edge you need becomes the new top row. <code>zip(*m)</code> helps.</p>`,
    code: `def spiral(m):
    m = [row[:] for row in m]  # work on a copy
    out = []
    while m:
        out += m.pop(0)
        m = [list(row) for row in zip(*m)][::-1]
    return out`,
    answer: `<p><code>zip(*m)</code> turns columns into rows, and reversing the result completes an anticlockwise rotation, so the right-hand column is now on top. The copy matters: <code>pop(0)</code> would otherwise empty the caller's matrix.</p><p>This version is short but rebuilds the matrix every turn. The faster approach keeps four boundaries (top, bottom, left, right) and walks them inwards, visiting each item once.</p>`,
  },
  {
    slug: 'permutations-by-hand',
    title: 'Permutations by hand',
    difficulty: 'Hard',
    prompt: `<p>Write <code>permutations(items)</code> that returns every ordering of a list of distinct items, without using <code>itertools</code>.</p>`,
    example: `permutations([1, 2, 3])
# [[1, 2, 3], [1, 3, 2], [2, 1, 3],
#  [2, 3, 1], [3, 1, 2], [3, 2, 1]]`,
    hint: `<p>Choose which item goes first. The rest of the answer is every permutation of the remaining items.</p>`,
    code: `def permutations(items):
    if len(items) <= 1:
        return [list(items)]
    out = []
    for i, first in enumerate(items):
        rest = items[:i] + items[i + 1:]
        for perm in permutations(rest):
            out.append([first] + perm)
    return out`,
    answer: `<p>The base case is a list of zero or one items, which has exactly one ordering. Each level of recursion fixes one position. There are n! permutations (6 for 3 items, over 3.6 million for 10), so this grows even faster than the 2<sup>n</sup> subsets problem.</p>`,
  },
  {
    slug: 'round-robin',
    title: 'Round robin',
    difficulty: 'Hard',
    prompt: `<p>Write <code>roundrobin(*iterables)</code> that takes one item from each input in turn, skipping inputs that have run out, until all of them are used up. It should work for any iterables, not just lists.</p>`,
    example: `roundrobin("ABC", "D", "EF")
# ["A", "D", "E", "B", "F", "C"]`,
    hint: `<p>Turn each input into an iterator with <code>iter()</code>, then call <code>next()</code> on each in turn. <code>next</code> raises <code>StopIteration</code> when an iterator is finished.</p>`,
    code: `def roundrobin(*iterables):
    iterators = [iter(it) for it in iterables]
    out = []
    while iterators:
        still_going = []
        for it in iterators:
            try:
                out.append(next(it))
            except StopIteration:
                continue
            still_going.append(it)
        iterators = still_going
    return out`,
    answer: `<p>Each round asks every live iterator for one item and keeps only those that produced something. Using iterators instead of indexes means it works for files, generators and anything else you can loop over. This is how a simple scheduler shares time between tasks.</p>`,
  },
];
