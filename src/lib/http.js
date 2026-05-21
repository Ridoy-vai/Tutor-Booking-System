export async function readResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export function getResponseMessage(body, fallback = "Request failed.") {
  if (body && typeof body === "object" && "message" in body) {
    return body.message || fallback;
  }

  if (typeof body === "string") {
    return body.slice(0, 160) || fallback;
  }

  return fallback;
}
