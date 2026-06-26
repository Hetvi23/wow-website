import { NextResponse } from "next/server";

const BASE_URL =
  process.env.ERPNEXT_BASE_URL?.replace(/\/$/, "") ||
  "https://care.autoavengers.com";

const VOUCHER_ENDPOINT =
  "/api/method/wow_workshop.api.create_voucher_request";

// Proxy a ₹999 voucher request to the guest-callable ERPNext method. Forwarded
// as multipart/form-data so the optional payment screenshot (field
// `payment_proof`) rides along on the same request. The frontend always sends
// FormData, so we pass it straight through.
export async function POST(request: Request) {
  try {
    const incoming = await request.formData();

    if (!incoming.get("customer_name") || !incoming.get("mobile")) {
      return NextResponse.json(
        { error: "customer_name and mobile are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}${VOUCHER_ENDPOINT}`, {
      method: "POST",
      // Pass the FormData through unchanged; fetch sets the multipart boundary.
      body: incoming,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Voucher request error:", errorText);
      return NextResponse.json(
        { error: "Failed to submit voucher request" },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Voucher proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
