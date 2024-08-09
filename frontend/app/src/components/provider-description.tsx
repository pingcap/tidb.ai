import type { ProviderOption } from '@/api/providers';

export function ProviderDescription ({ provider }: { provider: ProviderOption }) {
  const { provider_url, provider_description } = provider;
  if (provider_description) {
    if (provider_url) {
      return (
        <>
          {provider_description}
          <br />
          See <a className="underline" href={provider_url} target="_blank">official website</a> for more details.
        </>
      );
    } else {
      return provider_description;
    }
  } else {
    return null;
  }
}