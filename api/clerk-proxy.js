export const config = { runtime: "edge" };

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "";
  url.searchParams.delete("path");
  const query = url.searchParams.toString();
  const target = `https://frontend-api.clerk.dev/${path}${query ? "?" + query : ""}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("Clerk-Proxy-Url", "https://cine-flex-iota.vercel.app/__clerk");
  headers.set("Clerk-Secret-Key", globalThis.process?.env?.CLERK_SECRET_KEY || "");
  headers.set(
    "X-Forwarded-For",
    request.headers.get("x-forwarded-for") || ""
  );

  const hasBody = !["GET", "HEAD"].includes(request.method);
  return fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    duplex: "half",
    redirect: "manual",
  });
}
