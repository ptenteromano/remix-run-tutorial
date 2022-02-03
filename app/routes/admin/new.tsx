import { useActionData, useTransition, Form, redirect } from "remix";
import type { ActionFunction } from "remix";
import { Button, Input, InputLabel, TextareaAutosize } from "@mui/material";
import { createPost } from "~/post";
import invariant from "tiny-invariant";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();
  console.log(transition);

  return (
    <Form method="post">
      <InputLabel>
        Post Title: {errors?.title ? <em>Title is required </em> : null}
        <Input type="text" name="title" />
      </InputLabel>

      <InputLabel>
        Post Slug: {errors?.slug ? <em>Slug is required </em> : null}
        <Input type="text" name="slug" />
      </InputLabel>

      <InputLabel htmlFor="markdown">Markdown:</InputLabel>
      {errors?.markdown ? <em>Markdown is required </em> : null}
      <br />
      <TextareaAutosize
        id="markdown"
        minRows={10}
        name="markdown"
        placeholder="body"
        style={{ width: 500 }}
      />
      <Button type="submit" variant="contained">
        {transition.submission ? "Creating..." : "Create Post"}
      </Button>
    </Form>
  );
}
