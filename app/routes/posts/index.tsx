import { Link, useLoaderData } from "remix";
import { getPosts, waveBreak } from "~/post";
import type { Post } from "~/post";

export const loader = async () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  console.log({ posts });

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => {
          console.log({ post });
          return (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
