export async function sendWhoisRequest(func: () => void) {
  // Wait for 1 second.
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Send the WHOIS request for the domain.
  func();
}
