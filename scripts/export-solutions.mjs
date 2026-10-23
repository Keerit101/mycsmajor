// Prints every problem's Python code as JSON, for tests/check_solutions.py.
import { problems } from '../src/data/problems.js';

const out = problems.map(({ slug, example, code }) => ({ slug, example: example ?? null, code: code ?? null }));
process.stdout.write(JSON.stringify(out));
