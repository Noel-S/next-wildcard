import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export function middleware(request: NextRequest) {
  // Clone the URL
  const url = request.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = request.headers.get('host');
  // console.log(host);
  
  const subdomain = getValidSubdomain(host);
  if (subdomain) {
    // Subdomain available, rewriting
    console.log(`- \x1b[35mevent\x1b[0m rewriting \x1b[33m${url.pathname}\x1b[0m to \x1b[33m/${subdomain}${url.pathname}\x1b[0m`);
    // url.pathname = `/${subdomain}${url.pathname}`;
    url.pathname = `/business`;
    return NextResponse.rewrite(url, {
      headers: {
        business: subdomain,
      },
    });
  }

  return NextResponse.next();
}

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate) {
      //!candidate.includes('localhost') && 
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};