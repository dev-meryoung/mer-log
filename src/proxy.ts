import { NextResponse, type NextRequest } from 'next/server';

const VALID_PAGE_PATTERN = /^[1-9]\d*$/;

const getSearchUrl = (request: NextRequest, keyword = '', page = 1): URL => {
  const url = new URL('/search', request.url);

  if (keyword) {
    url.searchParams.set('keyword', keyword);
  }

  if (page > 1) {
    url.searchParams.set('page', page.toString());
  }

  return url;
};

export function proxy(request: NextRequest) {
  const { nextUrl } = request;

  if (nextUrl.pathname !== '/search') {
    return NextResponse.next();
  }

  const rawKeyword = nextUrl.searchParams.get('keyword');
  const keyword = rawKeyword?.trim() || '';
  const rawPage = nextUrl.searchParams.get('page');

  if (!keyword) {
    if (rawKeyword !== null || rawPage !== null) {
      return NextResponse.redirect(getSearchUrl(request));
    }

    return NextResponse.next();
  }

  if (rawKeyword !== keyword) {
    return NextResponse.redirect(getSearchUrl(request, keyword));
  }

  if (rawPage === null) {
    return NextResponse.next();
  }

  if (!VALID_PAGE_PATTERN.test(rawPage) || rawPage === '1') {
    return NextResponse.redirect(getSearchUrl(request, keyword));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/search',
};
