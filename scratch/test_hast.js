import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

const md = `- [x] Task 1
- [ ] Task 2`;

const ast = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .parse(md);

const hast = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .runSync(ast);

console.log(JSON.stringify(hast, null, 2));
