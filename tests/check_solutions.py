"""Runs every Python solution on the site against its examples.

Usage: npm test
       (or: node scripts/export-solutions.mjs | python tests/check_solutions.py)

Every problem with a `code` field must have a check below. Exits non-zero on
any failure.
"""

import contextlib
import io
import itertools
import json
import math
import sys
from collections import deque

CHECKS = {}


def check(slug):
    def register(fn):
        CHECKS[slug] = fn
        return fn
    return register


def run(code):
    """Execute code in a fresh namespace and return (namespace, stdout)."""
    ns = {}
    out = io.StringIO()
    with contextlib.redirect_stdout(out):
        exec(code, ns)
    return ns, out.getvalue()


def printed_claim(code):
    """The '# Prints:' block at the top of a solution, as text."""
    lines = []
    for line in code.splitlines()[1:]:
        if not line.startswith("# "):
            break
        lines.append(line[2:])
    return "\n".join(lines) + "\n"


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def linked(*vals):
    head = None
    for v in reversed(vals):
        head = ListNode(v, head)
    return head


def values(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


# ---------- Python track ----------

@check("reverse-the-words")
def _(ns, p):
    f = ns["reverse_words"]
    assert f("one cs problem") == "problem cs one"
    assert f("  hello   world ") == "world hello"


@check("fizzbuzz-as-a-list")
def _(ns, p):
    f = ns["fizzbuzz"]
    assert f(5) == ["1", "2", "Fizz", "4", "Buzz"]
    assert f(15)[-1] == "FizzBuzz"


@check("sum-of-digits")
def _(ns, p):
    f = ns["digit_sum"]
    assert f(4096) == 19 and f(-25) == 7 and f(0) == 0


@check("running-total")
def _(ns, p):
    f = ns["running_total"]
    assert f([1, 2, 3, 4]) == [1, 3, 6, 10]
    assert f([5, -2, 7]) == [5, 3, 10]
    assert f([]) == []


@check("capitalise-each-word")
def _(ns, p):
    f = ns["capitalise_words"]
    assert f("hello wide world") == "Hello Wide World"
    assert f("they're here") == "They're Here"
    assert "they're here".title() == "They'Re Here"  # the trap the hint mentions
    assert f("") == ""


@check("real-palindromes")
def _(ns, p):
    f = ns["is_palindrome"]
    assert f("A man, a plan, a canal: Panama")
    assert not f("race a car")


@check("is-it-an-anagram")
def _(ns, p):
    f = ns["is_anagram"]
    assert f("Listen", "Silent") and f("Dormitory", "dirty room") and not f("abc", "abd")


@check("most-common-character")
def _(ns, p):
    f = ns["most_common_char"]
    assert f("banana") == "a" and f("abba") == "a"


@check("count-the-words")
def _(ns, p):
    assert ns["word_counts"]("To be or not to be") == {"to": 2, "be": 2, "or": 1, "not": 1}


@check("remove-duplicates-keep-order")
def _(ns, p):
    assert ns["dedupe"]([3, 1, 3, 2, 1]) == [3, 1, 2]


@check("transpose-a-matrix")
def _(ns, p):
    assert ns["transpose"]([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]


@check("fast-fibonacci")
def _(ns, p):
    f = ns["fib"]
    assert f(0) == 0 and f(10) == 55 and f(50) == 12586269025


@check("rotate-a-list")
def _(ns, p):
    f = ns["rotate"]
    assert f([1, 2, 3, 4, 5], 2) == [4, 5, 1, 2, 3]
    assert f([1, 2, 3], 7) == [3, 1, 2]
    assert f([], 4) == [] and f([1, 2], 0) == [1, 2]


@check("chunk-a-list")
def _(ns, p):
    f = ns["chunks"]
    assert f([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]]
    assert f([1, 2, 3], 5) == [[1, 2, 3]] and f([], 3) == []


@check("flatten-a-nested-list")
def _(ns, p):
    assert ns["flatten"]([1, [2, [3, 4]], [], 5]) == [1, 2, 3, 4, 5]


@check("the-default-argument-trap")
def _(ns, p):
    _, out = run(p["example"])
    assert out == printed_claim(p["code"]), out
    assert ns["add"](1) == [1] and ns["add"](2) == [2]


@check("the-copied-grid")
def _(ns, p):
    _, out = run(p["example"])
    assert out == "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]\n", out
    assert ns["grid"] == [[1, 0, 0], [0, 0, 0], [0, 0, 0]]


@check("run-length-encoding")
def _(ns, p):
    f = ns["rle"]
    assert f("aaabcc") == "a3b1c2" and f("") == ""


@check("caesar-cipher")
def _(ns, p):
    f = ns["caesar"]
    assert f("Hello, World!", 3) == "Khoor, Zruog!"
    assert f("abc", -1) == "zab"
    assert f(f("Round trip", 11), -11) == "Round trip"


@check("invert-a-dictionary")
def _(ns, p):
    assert ns["invert"]({"ada": "CS", "linus": "CS", "grace": "Math"}) == {"CS": ["ada", "linus"], "Math": ["grace"]}


@check("removing-while-looping")
def _(ns, p):
    _, out = run(p["example"])
    assert out == printed_claim(p["code"]), out
    assert ns["nums"] == [1, 3]


@check("late-binding-lambdas")
def _(ns, p):
    _, out = run(p["example"])
    assert out == printed_claim(p["code"]), out
    assert [f() for f in ns["funcs"]] == [0, 1, 2]


@check("sieve-of-eratosthenes")
def _(ns, p):
    f = ns["primes_up_to"]
    assert f(30) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    assert f(1) == [] and f(2) == [2]
    brute = [n for n in range(2, 500) if all(n % d for d in range(2, int(n ** 0.5) + 1))]
    assert f(499) == brute


@check("roman-numerals")
def _(ns, p):
    f = ns["to_roman"]
    assert f(4) == "IV" and f(1994) == "MCMXCIV" and f(2026) == "MMXXVI" and f(3999) == "MMMCMXCIX"


@check("memoize-decorator")
def _(ns, p):
    fns, _ = run(p["code"] + "\n" + p["example"].replace("fib(80)   # 23416728348467685", "result = fib(80)"))
    assert fns["result"] == 23416728348467685


@check("flatten-a-dictionary")
def _(ns, p):
    assert ns["flatten_dict"]({"a": 1, "b": {"c": 2, "d": {"e": 3}}}) == {"a": 1, "b.c": 2, "b.d.e": 3}


@check("all-subsets")
def _(ns, p):
    assert ns["subsets"]([1, 2, 3]) == [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
    assert len(ns["subsets"](list(range(10)))) == 1024


@check("spiral-order")
def _(ns, p):
    f = ns["spiral"]
    m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert f(m) == [1, 2, 3, 6, 9, 8, 7, 4, 5]
    assert m == [[1, 2, 3], [4, 5, 6], [7, 8, 9]], "input was modified"
    assert f([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    assert f([]) == []


@check("permutations-by-hand")
def _(ns, p):
    f = ns["permutations"]
    assert f([1, 2, 3]) == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
    assert f([1, 2, 3, 4]) == [list(t) for t in itertools.permutations([1, 2, 3, 4])]


@check("round-robin")
def _(ns, p):
    f = ns["roundrobin"]
    assert f("ABC", "D", "EF") == ["A", "D", "E", "B", "F", "C"]
    assert f() == [] and f(range(2), iter("xy")) == [0, "x", 1, "y"]


# ---------- Data structures track ----------

@check("contains-duplicate")
def _(ns, p):
    f = ns["has_duplicate"]
    assert f([1, 2, 3, 1]) and not f([1, 2, 3]) and not f([])


@check("two-sum")
def _(ns, p):
    assert ns["two_sum"]([2, 7, 11, 15], 9) == [0, 1]
    assert ns["two_sum"]([3, 3], 6) == [0, 1]


@check("intersection-of-two-lists")
def _(ns, p):
    f = ns["common"]
    assert f([4, 9, 5, 4], [9, 4, 9, 8, 4]) == [4, 9] and f([1, 2], [3]) == []


@check("the-missing-number")
def _(ns, p):
    f = ns["missing"]
    assert f([3, 0, 1]) == 2 and f([0, 1]) == 2 and f([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8


@check("balanced-brackets")
def _(ns, p):
    f = ns["is_balanced"]
    assert f("([]{})") and not f("([)]") and not f("((") and not f(")")


@check("first-unique-character")
def _(ns, p):
    f = ns["first_unique"]
    assert f("leetcode") == 0 and f("loveleetcode") == 2 and f("aabb") == -1


@check("binary-search-by-hand")
def _(ns, p):
    f = ns["search"]
    assert f([1, 3, 5, 7, 9], 7) == 3 and f([1, 3, 5, 7, 9], 4) == -1
    assert f([], 1) == -1 and f([5], 5) == 0


@check("merge-two-sorted-lists")
def _(ns, p):
    assert ns["merge"]([1, 4, 9], [2, 3, 10, 12]) == [1, 2, 3, 4, 9, 10, 12]


@check("depth-of-a-binary-tree")
def _(ns, p):
    f = ns["max_depth"]
    t = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))
    assert f(t) == 3 and f(None) == 0


@check("middle-of-a-linked-list")
def _(ns, p):
    f = ns["middle"]
    assert f(linked(1, 2, 3, 4, 5)).val == 3
    assert f(linked(1, 2, 3, 4, 5, 6)).val == 4
    assert f(linked(1)).val == 1


@check("insertion-sort")
def _(ns, p):
    f = ns["insertion_sort"]
    xs = [5, 2, 4, 6, 1, 3]
    assert f(xs) == [1, 2, 3, 4, 5, 6] and xs == [1, 2, 3, 4, 5, 6]
    assert f([]) == [] and f([3, 3, 1]) == [1, 3, 3]


@check("best-window-sum")
def _(ns, p):
    f = ns["max_window_sum"]
    assert f([2, 1, 5, 1, 3, 2], 3) == 9
    assert f([4], 1) == 4 and f([-1, -2, -3], 2) == -3


@check("reverse-a-linked-list")
def _(ns, p):
    assert values(ns["reverse"](linked(1, 2, 3))) == [3, 2, 1]
    assert ns["reverse"](None) is None


@check("queue-from-two-stacks")
def _(ns, p):
    q = ns["Queue"]()
    q.push(1)
    q.push(2)
    assert q.pop() == 1
    q.push(3)
    assert q.pop() == 2 and q.pop() == 3


@check("does-the-list-loop")
def _(ns, p):
    f = ns["has_cycle"]
    a = linked(1, 2, 3)
    assert not f(a)
    a.next.next.next = a
    assert f(a) and not f(None)


@check("group-the-anagrams")
def _(ns, p):
    groups = ns["group_anagrams"](["eat", "tea", "tan", "ate", "nat"])
    assert sorted(map(sorted, groups)) == [["ate", "eat", "tea"], ["nat", "tan"]]


@check("top-k-frequent")
def _(ns, p):
    assert ns["top_k"]([1, 1, 1, 2, 2, 3], 2) == [1, 2]


@check("merge-intervals")
def _(ns, p):
    f = ns["merge_intervals"]
    assert f([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]]
    assert f([[1, 4], [4, 5]]) == [[1, 5]]
    assert f([[1, 10], [2, 3]]) == [[1, 10]] and f([]) == []


@check("maximum-subarray")
def _(ns, p):
    f = ns["max_subarray"]
    assert f([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6 and f([-3, -1, -2]) == -1


@check("product-except-self")
def _(ns, p):
    f = ns["product_except_self"]
    assert f([1, 2, 3, 4]) == [24, 12, 8, 6] and f([0, 1, 2]) == [2, 0, 0]


@check("min-stack")
def _(ns, p):
    s = ns["MinStack"]()
    s.push(5)
    s.push(2)
    s.push(7)
    assert s.get_min() == 2 and s.top() == 7
    assert s.pop() == 7 and s.pop() == 2 and s.get_min() == 5


@check("level-order-traversal")
def _(ns, p):
    f = ns["level_order"]
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    assert f(root) == [[3], [9, 20], [15, 7]] and f(None) == []


@check("longest-substring-without-repeats")
def _(ns, p):
    f = ns["longest_unique"]
    assert f("abcabcbb") == 3 and f("bbbbb") == 1 and f("pwwkew") == 3 and f("") == 0
    assert f("abba") == 2


@check("count-the-islands")
def _(ns, p):
    f = ns["count_islands"]
    assert f(["11000", "11000", "00100", "00011"]) == 3
    assert f([]) == 0 and f(["0"]) == 0 and f(["111", "101", "111"]) == 1


@check("build-a-trie")
def _(ns, p):
    t = ns["Trie"]()
    t.insert("car")
    t.insert("cart")
    assert t.search("car") and not t.search("ca")
    assert t.starts_with("ca") and not t.starts_with("dog") and t.search("cart")


@check("validate-a-bst")
def _(ns, p):
    f = ns["is_bst"]
    bad = TreeNode(5, TreeNode(3, None, TreeNode(6)), TreeNode(8))
    good = TreeNode(5, TreeNode(3, None, TreeNode(4)), TreeNode(8))
    assert not f(bad) and f(good) and f(None)
    assert not f(TreeNode(2, TreeNode(2)))


@check("lru-cache")
def _(ns, p):
    c = ns["LRUCache"](2)
    c.put(1, "a")
    c.put(2, "b")
    assert c.get(1) == "a"
    c.put(3, "c")
    assert c.get(2) == -1 and c.get(3) == "c" and c.get(1) == "a"


@check("course-schedule")
def _(ns, p):
    f = ns["can_finish"]
    assert f(2, [[1, 0]]) and not f(2, [[1, 0], [0, 1]])
    assert f(4, [[1, 0], [2, 1], [3, 2]]) and f(3, [])


@check("shortest-path-in-a-grid")
def _(ns, p):
    f = ns["shortest_path"]
    assert f(["..#.", ".##.", "...."]) == 5
    assert f([".#", "#."]) == -1 and f(["."]) == 0


@check("dijkstras-algorithm")
def _(ns, p):
    graph = {"A": {"B": 4, "C": 1}, "B": {"D": 1}, "C": {"B": 2, "D": 5}, "D": {}}
    assert ns["dijkstra"](graph, "A") == {"A": 0, "C": 1, "B": 3, "D": 4}


def main():
    problems = json.load(sys.stdin)
    failures = 0
    coded = [p for p in problems if p["code"]]
    missing = [p["slug"] for p in coded if p["slug"] not in CHECKS]
    unknown = sorted(set(CHECKS) - {p["slug"] for p in problems})
    if missing or unknown:
        print("Missing checks:", missing, "Checks for unknown problems:", unknown)
        failures += 1
    for p in coded:
        fn = CHECKS.get(p["slug"])
        if not fn:
            continue
        try:
            ns, _ = run(p["code"])
            fn(ns, p)
        except Exception as exc:  # noqa: BLE001
            failures += 1
            print(f"FAIL {p['slug']}: {type(exc).__name__}: {exc}")
    print(f"{len(problems)} problems, {len(coded)} Python solutions checked.")
    if failures:
        print(f"{failures} failure(s).")
        sys.exit(1)
    print("All solutions pass.")


if __name__ == "__main__":
    main()
