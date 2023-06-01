import Image from 'next/image';
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-8">
      <h1 className="my-10 md:my-20 text-4xl font-bold">ChatGPT Free</h1>

      <div className="flex flex-col md:flex-row gap-8 ">
        <div>
          <div className="flex flex-col items-center justify-center mb-4">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:max-w-xs [&>p]:h-fit [&>p]:leading-4 [&>p]:flex [&>p]:p-4 [&>p]:normal-case">
            <p>&quot;Explain quantum computing in simple terms&quot;</p>
            <p>
              &quot;Got any creative ideas for a 10 year old&apos;s
              birthday?&quot;
            </p>
            <p>&quot;How do I make an HTTP request in Javascript?&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-4">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:max-w-xs [&>p]:h-fit [&>p]:leading-4 [&>p]:flex [&>p]:p-4 [&>p]:normal-case">
            <p>Remembers what user said earlier in the conversation</p>
            <p>Allows user to provide follow-up corrections</p>
            <p>Trained to decline inappropriate requests</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-4">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:max-w-xs [&>p]:h-fit [&>p]:leading-4 [&>p]:flex [&>p]:p-4 [&>p]:normal-case">
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
