import Image from 'next/image';
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center gap-16 overflow-y-scroll px-8 py-16">
      <h1 className="text-4xl font-bold">ChatGPT Free</h1>

      <div className="flex flex-col gap-8 md:flex-row md:gap-4">
        <div>
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>
          <div className="max-w-md space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-4 [&>p]:normal-case [&>p]:leading-5">
            <p>&quot;Explain quantum computing in simple terms&quot;</p>
            <p>
              &quot;Got any creative ideas for a 10 year old&apos;s
              birthday?&quot;
            </p>
            <p>&quot;How do I make an HTTP request in Javascript?&quot;</p>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className="max-w-md space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-4 [&>p]:normal-case [&>p]:leading-5">
            <p>Remembers what user said earlier in the conversation</p>
            <p>Allows user to provide follow-up corrections</p>
            <p>Trained to decline inappropriate requests</p>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>
          <div className="max-w-md space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-4 [&>p]:normal-case [&>p]:leading-5">
            <p>May occasionally generate incorrect information</p>
            <p>
              May occasionally produce harmful instructions or biased content
            </p>
            <p>Limited knowledge of world and events after 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}
