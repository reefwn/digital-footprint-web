import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract the IP from the request headers or connection info
  const ip = req.headers.get('x-forwarded-for') ?? req.ip ?? null;

  // If there are multiple IPs in x-forwarded-for (proxy), use the first one
  const clientIp = ip?.split(',')[0].trim() ?? 'IP not available';

  // Return the IP address as JSON response
  return NextResponse.json({ ip: clientIp });
}
