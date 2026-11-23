export type EnquiryResult =
  | { ok: true; wa?: string }
  | { ok: false; error?: string; errors?: Record<string, string> };

export async function sendEnquiry(form: HTMLFormElement, puppy?: string): Promise<EnquiryResult> {
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, puppy: puppy ?? data.puppy ?? "" }),
    });
    return (await res.json()) as EnquiryResult;
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again, or message us on WhatsApp." };
  }
}
