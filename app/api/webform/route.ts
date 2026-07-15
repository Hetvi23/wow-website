import { NextResponse } from "next/server";

const BASE_URL =
  process.env.ERPNEXT_BASE_URL?.replace(/\/$/, "") ||
  "https://care.autoavengers.com";

const ACCEPT_ENDPOINT =
  "/api/method/frappe.website.doctype.web_form.web_form.accept";

// Frappe returns validation errors in `_server_messages` (a JSON-encoded array
// of JSON-encoded objects) or, failing that, `message` / `exception`. Pull out
// a clean, human-readable string so the website can show the real reason
// (missing field, slot unavailable, ...) instead of a generic failure notice.
function extractFrappeMessage(raw: string): string | null {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    if (typeof parsed._server_messages === "string") {
      const msgs = JSON.parse(parsed._server_messages) as string[];
      const texts = msgs.map((m) => {
        try {
          const obj = JSON.parse(m) as { message?: string };
          return obj.message ?? m;
        } catch {
          return m;
        }
      });
      const clean = texts.join(" ").replace(/<[^>]*>/g, "").trim();
      if (clean) return clean;
    }

    if (typeof parsed.message === "string") return parsed.message;
    if (typeof parsed.exception === "string") {
      return parsed.exception.replace(/^.*?Error:\s*/, "").trim() || null;
    }
  } catch {
    // Response body was not JSON — nothing to extract.
  }
  return null;
}

// Proxy a styled website form to its Frappe Web Form. The `accept` endpoint is
// guest-callable, so no API key is needed; submissions are stored against the
// Web Form's doctype and managed in Frappe like any other Web Form entry.
export async function POST(request: Request) {
  try {
    const { web_form, data } = (await request.json()) as {
      web_form?: string;
      data?: Record<string, unknown>;
    };

    if (!web_form || !data) {
      return NextResponse.json(
        { error: "web_form and data are required" },
        { status: 400 }
      );
    }

    const body = new URLSearchParams({
      web_form,
      data: JSON.stringify(data),
    });

    const response = await fetch(`${BASE_URL}${ACCEPT_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Web Form accept error:", errorText);
      return NextResponse.json(
        { error: extractFrappeMessage(errorText) || "Failed to submit form" },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Web Form proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
