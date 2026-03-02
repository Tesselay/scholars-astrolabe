export function convertBlogPathToBlogId(path: string) {
  const segments = path.split("/");
  let blogId = segments.filter((segment) => segment !== "blog").join("/");
  blogId = blogId.endsWith("/") ? blogId.slice(0, -1) : blogId;
  blogId = blogId.startsWith("/") ? blogId.slice(1) : blogId;

  return blogId;
}
