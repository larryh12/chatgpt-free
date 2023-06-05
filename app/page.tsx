import MenuBtn from '@/components/MenuBtn';
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto p-4 md:items-center md:justify-center">
      <MenuBtn />
      <h1 className="mx-auto mb-4 text-center text-4xl font-bold md:mb-8">
        ChatGPT <span className="text-accent">Free</span>
      </h1>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-4">
        <div className="mx-auto w-full max-w-md flex-1">
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-2 [&>p]:normal-case [&>p]:leading-5">
            <p>&quot;Explain quantum computing in simple terms&quot;</p>
            <p>
              &quot;Got any creative ideas for a 10 year old&apos;s
              birthday?&quot;
            </p>
            <p>&quot;How do I make an HTTP request in Javascript?&quot;</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md flex-1">
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-4 [&>p]:normal-case [&>p]:leading-5">
            <p>Remembers what user said earlier in the conversation</p>
            <p>Allows user to provide follow-up corrections</p>
            <p>Trained to decline inappropriate requests</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md flex-1">
          <div className="mb-4 flex items-center justify-center gap-2 md:flex-col">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-4 [&>p]:btn [&>p]:flex [&>p]:h-fit [&>p]:p-4 [&>p]:normal-case [&>p]:leading-5">
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
