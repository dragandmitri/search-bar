export function useSearchUrl(user) {
  return `https://api.github.com/search/users?q=${user}`;
}
