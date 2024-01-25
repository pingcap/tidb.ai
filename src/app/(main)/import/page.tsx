import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Page () {
  return (
    <>
      <section className="space-y-4">
        <h6 className="text-lg text-foreground/50">
          Choose your importing source
        </h6>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/import/url" prefetch={false}>
            <Card className="p-8 font-semibold">
              Import from URL List
            </Card>
          </Link>
        </div>
      </section>
    </>
  )
    ;
}
export const dynamic = 'force-dynamic';