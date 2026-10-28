// Every book on the site, its chapter list, and where its checkout lives.
//
// This is the ONLY file to edit when a payment link is ready: put the checkout
// URL in `checkoutUrl` and the site shows a real Buy button instead of a
// "coming soon" note. Nothing else needs to change.
//
// Fields:
//   slug        folder under /books/ (python-book keeps its own top-level URL)
//   title       book title, used in headings and the buy box
//   tagline     one line under the title
//   summary     what the book covers, for the hub page and meta description
//   course      the first-year course it lines up with, or null
//   price       suggested price in Canadian dollars, shown to visitors
//   chapters    every chapter, in order. `free: true` means the full chapter
//               is on the site; the rest come with the paid download.
//   checkoutUrl the book's Stripe Payment Link (https://buy.stripe.com/...),
//               '' until it exists. See TODO.md.
//   formats     what the buyer gets.
//   cover       emoji and colour (0-360 hue) for the drawn cover on the shelf.

export const CURRENCY = 'CAD';

// Suggested bundle price for all paid books together. Confirm before launch.
export const BUNDLE = {
  title: 'The whole shelf',
  price: 39,
  summary: 'Every book on the site, including anything added later this year.',
  checkoutUrl: '', // TODO(payments): bundle checkout URL
};

// Tip jar: a "pay what you want" link for people who want to support the site
// without buying a book: a Stripe Payment Link with "let customers choose
// what to pay" (a Ko-fi or Buy Me a Coffee page also works). Until `url` is set, the
// tip boxes say the tip jar is coming instead of showing a dead button.
export const SUPPORT = {
  url: '', // TODO(payments): tip jar URL (Ko-fi, Buy Me a Coffee or Stripe)
  label: 'Buy me a coffee',
};

export const books = [
  {
    slug: 'python-book',
    cover: { emoji: '🐍', hue: 150 },
    path: '/python-book/',
    title: 'Python for your first year',
    tagline: 'From your first program to classes and testing.',
    summary:
      'Twelve chapters that take you from installing Python to writing classes, handling errors and testing your code. Every chapter ends with exercises and worked answers.',
    course: 'CPS 109',
    price: 12,
    checkoutUrl: '', // TODO(payments): checkout URL for the Python book
    formats: 'Personal PDF, 12 chapters, 48 exercises with answers',
    note: 'All twelve chapters are free to read on the site. The paid download is the same book as an offline PDF, with the exercises collected at the back.',
    chapters: [
      { title: 'Getting started', desc: 'Install Python, run your first program and use the interactive shell.', href: '/python-book/getting-started/', free: true },
      { title: 'Variables and types', desc: 'Numbers, strings and booleans, converting between them, and f-strings.', href: '/python-book/variables-and-types/', free: true },
      { title: 'Making decisions', desc: 'Comparisons, if, elif and else, and combining conditions.', href: '/python-book/making-decisions/', free: true },
      { title: 'Loops', desc: 'for, while and range, plus break and continue.', href: '/python-book/loops/', free: true },
      { title: 'Functions', desc: 'Parameters, return values and defaults.', href: '/python-book/functions/', free: true },
      { title: 'Lists and dictionaries', desc: 'Store collections, slice them, loop over them and look things up.', href: '/python-book/lists-and-dictionaries/', free: true },
      { title: 'More functions', desc: '*args and **kwargs, lambdas, sorting with a key, recursion and type hints.', href: '/python-book/more-functions/', free: true },
      { title: 'Dictionaries and sets', desc: 'Comprehensions, Counter, defaultdict, set operations and nested data.', href: '/python-book/dictionaries-and-sets/', free: true },
      { title: 'Working with files', desc: 'Read and write text files, use pathlib, and handle CSV and JSON.', href: '/python-book/files/', free: true },
      { title: 'Classes and objects', desc: 'Methods, special methods, inheritance and dataclasses.', href: '/python-book/classes/', free: true },
      { title: 'Errors and exceptions', desc: 'Read tracebacks, handle failures with try, and raise your own.', href: '/python-book/errors-and-exceptions/', free: true },
      { title: 'Testing your code', desc: 'assert, pytest, and picking good test cases.', href: '/python-book/testing/', free: true },
    ],
  },
  {
    slug: 'java',
    cover: { emoji: '☕', hue: 20 },
    title: 'Java after Python',
    tagline: 'The language your second programming course is taught in.',
    summary:
      'Written for students who already know a little Python. Each chapter shows the Python you know, then the Java that does the same thing, and explains why Java asks for more.',
    course: 'CPS 209',
    price: 12,
    checkoutUrl: '', // TODO(payments): checkout URL for the Java book
    formats: 'Personal PDF, 12 chapters, exercises with answers',
    chapters: [
      { title: 'Your first Java program', desc: 'Install a JDK, compile and run, and understand why Java needs a class to print one line.', slug: 'your-first-java-program', free: true },
      { title: 'Types, and why Java insists', desc: 'Primitives, objects, casting and the errors the compiler catches for you.', slug: 'types', free: true },
      { title: 'Control flow and loops', desc: 'if, switch, for, while, and the enhanced for loop.' },
      { title: 'Methods and overloading', desc: 'Parameters, return types, static methods and two methods with one name.' },
      { title: 'Arrays and ArrayList', desc: 'Fixed arrays, growable lists, and when each one is the right choice.' },
      { title: 'Classes and objects', desc: 'Fields, constructors, getters, toString and equals.' },
      { title: 'Inheritance and interfaces', desc: 'extends, implements, abstract classes and polymorphism.' },
      { title: 'Generics and collections', desc: 'List, Map, Set, and what the angle brackets are for.' },
      { title: 'Exceptions', desc: 'Checked and unchecked exceptions, try-with-resources, and when to throw.' },
      { title: 'Files and input', desc: 'Scanner, Files, and reading data without crashing on bad input.' },
      { title: 'Testing with JUnit', desc: 'Write tests the way your marker will, and read a failing assertion.' },
      { title: 'Your first real program', desc: 'Build a small project end to end, with classes, files and tests.' },
    ],
  },
  {
    slug: 'c-and-memory',
    cover: { emoji: '🧠', hue: 200 },
    title: 'C and how memory really works',
    tagline: 'Pointers, the stack, the heap, and what your computer is actually doing.',
    summary:
      'C is small, unforgiving and the fastest way to understand what a program does to memory. This book teaches it with diagrams of the stack and the heap at every step.',
    course: 'CPS 188 and CPS 305',
    price: 12,
    checkoutUrl: '', // TODO(payments): checkout URL for the C book
    formats: 'Personal PDF, 11 chapters, exercises with answers',
    chapters: [
      { title: 'From Python to C', desc: 'Compile and run your first program, and meet the compiler as a strict reviewer.', slug: 'from-python-to-c', free: true },
      { title: 'Pointers without fear', desc: 'Addresses, dereferencing and the diagrams that make pointers obvious.', slug: 'pointers-without-fear', free: true },
      { title: 'Arrays and strings', desc: 'Why an array is almost a pointer, and why C strings end in a zero byte.' },
      { title: 'The stack', desc: 'Function calls, local variables, and the bug where you return a pointer to nothing.' },
      { title: 'The heap', desc: 'malloc, free, and every mistake you can make with them.' },
      { title: 'Structs', desc: 'Group data, pass it around, and understand padding.' },
      { title: 'Files and input', desc: 'fopen, fgets, and reading input without a buffer overflow.' },
      { title: 'Linked lists by hand', desc: 'Build the data structure that only makes sense once you have pointers.' },
      { title: 'Header files and the build', desc: 'What the preprocessor does, and how a project becomes one binary.' },
      { title: 'Debugging with gdb and valgrind', desc: 'Find a segfault and a memory leak instead of guessing.' },
      { title: 'Undefined behaviour', desc: 'The rules C expects you to keep, and what happens when you do not.' },
    ],
  },
  {
    slug: 'data-structures',
    cover: { emoji: '🌳', hue: 110 },
    title: 'Data structures and algorithms, by hand',
    tagline: 'Build each one yourself before you ever import it.',
    summary:
      'Every structure is built from scratch in Python, drawn step by step, and then compared on cost. The book you want before a technical interview or a data structures midterm.',
    course: 'CPS 305',
    price: 14,
    checkoutUrl: '', // TODO(payments): checkout URL for the data structures book
    formats: 'Personal PDF, 13 chapters, 60 practice problems with solutions',
    chapters: [
      { title: 'Big O without a maths degree', desc: 'Count the work, drop the noise, and compare two solutions honestly.', slug: 'big-o', free: true },
      { title: 'Arrays, lists and when each wins', desc: 'What an index really costs, and why inserting at the front is expensive.', slug: 'arrays-and-lists', free: true },
      { title: 'Stacks and queues', desc: 'Two structures, four operations, and the problems they solve instantly.' },
      { title: 'Linked lists', desc: 'Singly, doubly and circular, with the pointer surgery drawn out.' },
      { title: 'Hash tables', desc: 'Hashing, collisions, load factor, and why lookup is usually constant time.' },
      { title: 'Recursion and how to trust it', desc: 'Base cases, the call stack, and turning recursion into iteration.' },
      { title: 'Sorting', desc: 'Insertion, merge and quicksort, written out and timed against each other.' },
      { title: 'Binary search and invariants', desc: 'The algorithm everyone writes wrong, and how to prove yours right.' },
      { title: 'Trees', desc: 'Traversals, binary search trees, and what balance buys you.' },
      { title: 'Heaps and priority queues', desc: 'Keep the smallest item ready without sorting everything.' },
      { title: 'Graphs', desc: 'Represent them, then search them with breadth-first and depth-first search.' },
      { title: 'Shortest paths', desc: "Dijkstra's algorithm, explained with a map and a priority queue." },
      { title: 'Dynamic programming', desc: 'Spot overlapping subproblems and write the table out by hand.' },
    ],
  },
  {
    slug: 'discrete-math',
    cover: { emoji: '🤔', hue: 280 },
    title: 'Discrete math and logic',
    tagline: 'The proofs and the logic your first-year maths course assumes you can do.',
    summary:
      'Logic, sets, proofs, counting and relations, each explained from zero and followed by exam-style practice with full solutions. Written alongside a first-year discrete maths course.',
    course: 'MTH 110',
    price: 14,
    checkoutUrl: '', // TODO(payments): checkout URL for the discrete math book
    formats: 'Personal PDF, 12 chapters, 90 practice questions with full solutions',
    chapters: [
      { title: 'Logic and truth tables', desc: 'Statements, connectives, truth tables, and the laws you are expected to know.', slug: 'logic-and-truth-tables', free: true },
      { title: 'Sets, properly', desc: 'Notation, subsets, operations, and the difference between an element and a subset.', slug: 'sets', free: true },
      { title: 'Implication and quantifiers', desc: 'If-then, converse, contrapositive, for all, there exists, and negating them.' },
      { title: 'Proof by direct argument', desc: 'What a proof has to do, and how to write one a marker accepts.' },
      { title: 'Contradiction and contraposition', desc: 'Two proof styles that rescue statements direct proof cannot reach.' },
      { title: 'Induction', desc: 'Base case, inductive step, and the problems where induction is the only way in.' },
      { title: 'Functions and relations', desc: 'Injective, surjective, bijective, equivalence relations and partitions.' },
      { title: 'Counting', desc: 'Product and sum rules, permutations, combinations, and knowing which to use.' },
      { title: 'The pigeonhole principle', desc: 'A one-sentence idea that solves surprisingly hard questions.' },
      { title: 'Probability basics', desc: 'Sample spaces, conditional probability, and the birthday problem.' },
      { title: 'Number theory for CS', desc: 'Divisibility, modular arithmetic, GCD, and why cryptography cares.' },
      { title: 'Graphs and trees in maths', desc: 'Degrees, paths, connectivity, and counting edges in a tree.' },
    ],
  },
  {
    slug: 'security-basics',
    cover: { emoji: '🔐', hue: 330 },
    title: 'Security basics for programmers',
    tagline: 'Write code that does not become next month’s Cyber Brief.',
    summary:
      'The vulnerability classes that keep appearing in real breaches, each one demonstrated in small Python and web examples, then fixed. No tools to buy and nothing illegal.',
    course: null,
    price: 14,
    checkoutUrl: '', // TODO(payments): checkout URL for the security book
    formats: 'Personal PDF, 12 chapters, lab exercises you can run locally',
    chapters: [
      { title: 'How attacks actually start', desc: 'Trust boundaries, attack surface, and thinking like the person testing your code.', slug: 'how-attacks-start', free: true },
      { title: 'Passwords done properly', desc: 'Hashing, salting, why fast hashes lose, and the five lines that get it right.', slug: 'passwords', free: true },
      { title: 'Injection', desc: 'SQL, command and template injection, shown broken and then fixed.' },
      { title: 'Authentication and sessions', desc: 'Logging in, staying logged in, and the ways both go wrong.' },
      { title: 'Access control', desc: 'Why the server must check permissions on every single request.' },
      { title: 'Secrets and configuration', desc: 'Keep keys out of Git, out of logs, and out of the client.' },
      { title: 'Web basics: XSS and CSRF', desc: 'What the browser will do for an attacker if you let it.' },
      { title: 'Dependencies and supply chain', desc: 'Lockfiles, audits, and what the xz backdoor taught everyone.' },
      { title: 'Cryptography you should use', desc: 'Hashing, encryption and TLS, and why you never write your own.' },
      { title: 'Logging and detection', desc: 'What to record, what never to record, and reading logs after an incident.' },
      { title: 'Reading a CVE', desc: 'CVSS, CWE, KEV, and turning an advisory into an action.' },
      { title: 'Practising legally', desc: 'Labs, CTFs and bug bounty scope, so your learning stays on the right side.' },
    ],
  },
  {
    slug: 'toolkit',
    cover: { emoji: '💻', hue: 230 },
    title: 'Git, Linux and the terminal',
    tagline: 'The tools nobody teaches you but every course expects.',
    summary:
      'The command line, Git and the Unix habits that make every other course easier. Short chapters, each one a skill you can use the same afternoon.',
    course: null,
    price: 10,
    checkoutUrl: '', // TODO(payments): checkout URL for the toolkit book
    formats: 'Personal PDF, 11 chapters, plus a printable command sheet',
    chapters: [
      { title: 'The twelve commands you need', desc: 'Move around, find things and read files without touching the mouse.', slug: 'twelve-commands', free: true },
      { title: 'Git without panic', desc: 'Commits, branches, and what to do when Git says something frightening.', slug: 'git-without-panic', free: true },
      { title: 'Files, permissions and paths', desc: 'What rwx means, and why a script will not run.' },
      { title: 'Pipes and text tools', desc: 'grep, sort, cut and wc, joined up to answer real questions.' },
      { title: 'Editing in the terminal', desc: 'Enough nano and vim to never be stuck on a server.' },
      { title: 'Shell scripting', desc: 'Variables, loops and conditionals, for the jobs you do twice a week.' },
      { title: 'SSH and remote machines', desc: 'Keys instead of passwords, and working on your university server.' },
      { title: 'Git with other people', desc: 'Remotes, pull requests, merge conflicts and code review.' },
      { title: 'Rewriting history safely', desc: 'rebase, amend, reset and reflog, with the rules for each.' },
      { title: 'Environments and packages', desc: 'Virtual environments, package managers and reproducible setups.' },
      { title: 'Automating your own work', desc: 'Makefiles, aliases and scheduled jobs that remove daily chores.' },
    ],
  },
];

export const bookBySlug = (slug) => books.find((b) => b.slug === slug);

export const bookPath = (book) => book.path ?? `/books/${book.slug}/`;

export const chapterPath = (book, chapter) =>
  chapter.href ?? (chapter.slug ? `${bookPath(book)}${chapter.slug}/` : null);

export const freeChapters = (book) => book.chapters.filter((c) => c.free);
